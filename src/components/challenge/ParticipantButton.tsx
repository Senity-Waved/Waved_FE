import { getCookie } from 'cookies-next';
import { useSetRecoilState } from 'recoil';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import BottomFixedBtn, { IBtn } from '@/components/common/BottomFixedBtn';
import ISelectedChallenge from '@/types/selectedChallenge';
import ASelectedChallenge from '@/atoms/selectedChallenge';
import IChallengeGroup from '@/types/challengeGroup';
import calculateDDay from '@/utils/calculateDDay';
import { postCancelParticipantApi } from '@/lib/axios/challenge/api';
import useModal from '@/hooks/useModal';
import useSnackBar from '@/hooks/useSnackBar';

interface IParticipantButton {
  challengeData: ISelectedChallenge;
  isApplied: IChallengeGroup['isApplied'];
  myChallengeId: IChallengeGroup['myChallengeId'];
  startDate: IChallengeGroup['startDate'];
}

export default function ParticipantButton({
  challengeData,
  isApplied,
  myChallengeId,
  startDate,
}: IParticipantButton) {
  const router = useRouter();
  const { openModal, closeModal } = useModal();
  const { openSnackBar } = useSnackBar();
  const selectedChallenge =
    useSetRecoilState<ISelectedChallenge>(ASelectedChallenge);
  const dDayToStart = calculateDDay(startDate);
  const [canCancelParticpant, setCanCancelParticpant] =
    useState<boolean>(isApplied);

  const [btnConfig, setBtnConfig] = useState<IBtn>({
    text: '대기',
    styleType: 'disabled',
    size: 'large',
  });

  const goToOnboarding = () => {
    router
      .push({
        pathname: '/',
        query: { needLoginToParticipant: true },
      })
      .catch((error) => {
        console.error('페이지 이동에 실패하였습니다.', error);
      });
  };

  const goToParticipant = () => {
    selectedChallenge(challengeData);
    router.push('/challenge/participant').catch((error) => {
      console.error('페이지 이동에 실패하였습니다.', error);
    });
  };

  const cancelParticipant = async () => {
    try {
      const response = await postCancelParticipantApi(myChallengeId);
      if (response) {
        setCanCancelParticpant(false);
        openSnackBar('챌린지 신청이 취소되었습니다', 'correct');
      }
    } catch (deleteError) {
      openSnackBar('잠시 후 다시 시도해주세요', 'warning');
    }
  };

  useEffect(() => {
    const isLogined = getCookie('accessToken');
    const handleClick = () => {
      if (!isLogined) {
        goToOnboarding();
      } else if (isLogined && !canCancelParticpant && dDayToStart <= 14) {
        goToParticipant();
      } else if (canCancelParticpant && dDayToStart <= 14 && dDayToStart >= 1) {
        openModal({
          mainText: '챌린지 신청을 취소하시겠어요?',
          subText:
            '추가하신 예치금은 100% 환불이 가능하며, 카드사 사정에 따라 영업일 기준 평균 2~5일 이내 처리됩니다',
          btnText: '네, 취소할게요',
          onClick: () => {
            cancelParticipant().catch((error) => console.error(error));
            closeModal();
          },
        });
      }
    };

    if (!isLogined && dDayToStart <= 14 && dDayToStart >= 1) {
      setBtnConfig({
        text: '신청하기',
        styleType: 'primary',
        size: 'large',
        onClick: handleClick,
      });
    } else if (
      isLogined &&
      !canCancelParticpant &&
      dDayToStart <= 14 &&
      dDayToStart >= 1
    ) {
      setBtnConfig({
        text: '신청하기',
        styleType: 'primary',
        size: 'large',
        onClick: handleClick,
      });
    } else if (canCancelParticpant && dDayToStart <= 14 && dDayToStart >= 1) {
      setBtnConfig({
        text: '신청 취소',
        styleType: 'primary',
        size: 'large',
        onClick: handleClick,
      });
    } else if (dDayToStart < 1) {
      setBtnConfig({
        text: '마감이지만 테스트를 위해 신청 허용',
        styleType: 'primary',
        size: 'large',
        onClick: handleClick,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canCancelParticpant]);

  return <BottomFixedBtn btns={[btnConfig]} />;
}
