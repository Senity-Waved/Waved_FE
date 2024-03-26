import { getCookie } from 'cookies-next';
import { useSetRecoilState } from 'recoil';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import BottomFixedBtn, { IBtn } from '@/components/common/BottomFixedBtn';
import ISelectedChallenge from '@/types/selectedChallenge';
import ASelectedChallenge from '@/atoms/selectedChallenge';
import IChallengeGroup from '@/types/challengeGroup';
import calculateDDay from '@/utils/calculateDDay';
import { postRequestRefundApi } from '@/lib/axios/challenge/api';
import ISnackBarState from '@/types/snackbar';
import useModal from '@/hooks/useModal';

interface IParticipantButton {
  challengeData: ISelectedChallenge;
  isApplied: IChallengeGroup['isApplied'];
  myChallengeId: IChallengeGroup['myChallengeId'];
  startDate: IChallengeGroup['startDate'];
  setSnackBarState: (state: ISnackBarState) => void;
}

export default function ParticipantButton({
  challengeData,
  isApplied,
  myChallengeId,
  startDate,
  setSnackBarState,
}: IParticipantButton) {
  const { query } = useRouter();
  const router = useRouter();
  const groupId = router.query.groupId as string;
  const selectedChallenge =
    useSetRecoilState<ISelectedChallenge>(ASelectedChallenge);
  const dDayToStart = calculateDDay(startDate);
  const [btnConfig, setBtnConfig] = useState<IBtn>({
    text: '대기',
    styleType: 'disabled',
    size: 'large',
  });

  const goToOnboarding = () => {
    router
      .push({
        pathname: '/onboarding',
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
      const refundResponse = await postRequestRefundApi(myChallengeId);
      if (refundResponse) {
        console.log('🧡 챌린지 환불 요청 성공', myChallengeId);
      }
    } catch (deleteError) {
      console.error('🧡 챌린지 환불 요청 실패', myChallengeId, deleteError);
    }
  };
  const { openModal, closeModal } = useModal();

  useEffect(() => {
    const isLogined = getCookie('accessToken');
    const handleClick = () => {
      if (!isLogined && dDayToStart <= 14 && dDayToStart >= 1) {
        goToOnboarding();
      } else if (
        isLogined &&
        !isApplied &&
        dDayToStart <= 14 &&
        dDayToStart >= 1
      ) {
        goToParticipant();
      } else if (isApplied && dDayToStart <= 14 && dDayToStart >= 1) {
        openModal({
          mainText: '챌린지 신청을 취소하시겠어요?',
          subText:
            '추가하신 예치금은 100% 환불이 가능하며, 카드사 사정에 따라 영업일 기준 평균 2~5일 이내 처리됩니다',
          btnText: '네, 취소할게요',
          onClick: () => {
            cancelParticipant().catch((error) => console.log(error));
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
      !isApplied &&
      dDayToStart <= 14 &&
      dDayToStart >= 1
    ) {
      setBtnConfig({
        text: '신청하기',
        styleType: 'primary',
        size: 'large',
        onClick: handleClick,
      });
    } else if (isApplied && dDayToStart <= 14 && dDayToStart >= 1) {
      setBtnConfig({
        text: '신청 취소',
        styleType: 'primary',
        size: 'large',
        onClick: handleClick,
      });
    } else if (dDayToStart < 1) {
      setBtnConfig({
        text: '마감',
        styleType: 'disabled',
        size: 'large',
        onClick: handleClick,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const handleRouting = (): void => {
      setSnackBarState({
        open: true,
        text: '챌린지 신청이 취소되었습니다.',
      });
      router
        .replace(`/challenge/${groupId}`, undefined, { shallow: true })
        .catch((error: Error) =>
          console.error('쿼리스트링 제거 후 URL 변경 실패', error),
        );
      setTimeout(() => {
        setSnackBarState({
          open: false,
          text: '',
        });
      }, 3500);
    };
    if (query.cancelParticipantSuccess) {
      handleRouting();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, router]);
  return <BottomFixedBtn btns={[btnConfig]} />;
}
