import { getCookie } from 'cookies-next';
import { useSetRecoilState } from 'recoil';
import { useRouter } from 'next/router';
import BottomFixedBtn, { IBtn } from '@/components/common/BottomFixedBtn';
import ISelectedChallenge from '@/types/selectedChallenge';
import ASelectedChallenge from '@/atoms/selectedChallenge';
import IChallengeGroup from '@/types/challengeGroup';
import calculateDDay from '@/utils/calculateDDay';

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
  const isLogined = getCookie('accessToken');
  const selectedChallenge =
    useSetRecoilState<ISelectedChallenge>(ASelectedChallenge);
  const dDayToStart = calculateDDay(startDate);
  const goToOnboarding = () => {
    router.push('/onboarding').catch((error) => {
      console.error('페이지 이동에 실패하였습니다.', error);
    });
  };
  const goToParticipant = () => {
    selectedChallenge(challengeData);
    router.push('/challenge/participant').catch((error) => {
      console.error('페이지 이동에 실패하였습니다.', error);
    });
  };
  const cancelApplication = () => {
    try {
      console.log(myChallengeId);
      console.log('신청 취소 요청 성공');
    } catch (error) {
      console.error('신청 취소 요청 실패', error);
    }
  };
  let btnConfig: IBtn = {
    text: '마감',
    styleType: 'disabled',
    size: 'large',
  };
  if (!isLogined && dDayToStart <= 14 && dDayToStart >= 1) {
    btnConfig = {
      ...btnConfig,
      text: '신청하기',
      styleType: 'primary',
      onClick: goToOnboarding,
    };
  } else if (isLogined && !isApplied && dDayToStart <= 14 && dDayToStart >= 1) {
    btnConfig = {
      ...btnConfig,
      text: '신청하기',
      styleType: 'primary',
      onClick: goToParticipant,
    };
  } else if (isApplied && dDayToStart <= 14 && dDayToStart >= 1) {
    btnConfig = {
      ...btnConfig,
      text: '신청 취소',
      styleType: 'primary',
      onClick: cancelApplication,
    };
  } else if (dDayToStart < 1) {
    btnConfig = {
      ...btnConfig,
      text: '마감',
    };
  }

  return <BottomFixedBtn btns={[btnConfig]} />;
}
