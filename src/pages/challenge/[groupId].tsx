import { useState } from 'react';
import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import styled from '@emotion/styled';
import { v4 as uuidv4 } from 'uuid';
import { SLayoutWrapper } from '@/components/common/Layout';
import TabMenu from '@/components/common/TabMenu';
import SnackBar from '@/components/common/SnackBar';
import Modal from '@/components/modal/Modal';
import ChallengeHeader from '@/components/challenge/ChallengeHeader';
import ChallengeSummary from '@/components/challenge/ChallengeSummary';
import ChallengeReview from '@/components/challenge/ChallengeReview';
import VeirificationExample from '@/components/challenge/VerificationExample';
import ParticipantButton from '@/components/challenge/ParticipantButton';
import parseDate from '@/utils/parseDate';
import calculateDDay from '@/utils/calculateDDay';
import getChallengeImagePath from '@/utils/getChallengeImagePath';
import screenSize from '@/constants/screenSize';
import WEEKDAYS from '@/constants/weekdays';
import VERIFICATION_TYPE from '@/constants/verificationType';
import IChallengeGroup from '@/types/challengeGroup';
import { IChallengeReviewList } from '@/types/review';
import ISelectedChallenge, { TCondition } from '@/types/selectedChallenge';
import useSnackBar from '@/hooks/useSnackBar';
import createServerInstance from '@/lib/axios/serverInstance';
import { getChallengeGroupApi, getReviewsApi } from '@/lib/axios/challenge/api';

const previousStartDate = (date: string) => {
  const [year, month, day] = parseDate(date);
  const dateObj = new Date(
    parseInt(year, 10),
    parseInt(month, 10) - 1,
    parseInt(day, 10),
  );
  dateObj.setDate(dateObj.getDate() - 1);
  const newMonth = dateObj.getMonth() + 1;
  const newDay = dateObj.getDate();
  return `${newMonth}월 ${newDay}일 (${WEEKDAYS[dateObj.getDay()]})`;
};

const formattedDate = (date: string) => {
  const [year, month, day] = parseDate(date);
  const dateObj = new Date(
    parseInt(year, 10),
    parseInt(month, 10) - 1,
    parseInt(day, 10),
  );
  return `${month}월 ${day}일 (${WEEKDAYS[dateObj.getDay()]})`;
};

const calculateCondition = (startDate: string, endDate: string): TCondition => {
  const dDayToStart = calculateDDay(startDate);
  const dDayToEnd = calculateDDay(endDate);
  let condition: TCondition;
  if (dDayToStart <= 14 && dDayToStart >= 1) {
    condition = 'recruiting';
  } else if (dDayToStart < 1 && dDayToEnd >= 0) {
    condition = 'processing';
  } else if (dDayToEnd < 0) {
    condition = 'closed';
  } else {
    condition = 'waiting';
  }
  return condition;
};

export default function Challenge({
  challengeInfo,
  challengeThumbnail,
  reviewList,
}: {
  challengeInfo: IChallengeGroup;
  challengeThumbnail: string;
  reviewList: IChallengeReviewList;
}) {
  const router = useRouter();
  const groupId = router.query.groupId as string;
  const [summaryHeight, setSummaryHeight] = useState(84);
  const { snackBarData } = useSnackBar();

  const challengeData: ISelectedChallenge = {
    challengeGroupId: groupId,
    groupTitle: challengeInfo.groupTitle,
    startDate: formattedDate(challengeInfo.startDate),
    endDate: formattedDate(challengeInfo.endDate),
    condition: calculateCondition(
      challengeInfo.startDate,
      challengeInfo.endDate,
    ),
    participantCount: challengeInfo.participantCount,
    isFree: challengeInfo.isFree,
  };

  return (
    <SLayoutWrapper withBottomFixedBtn>
      <ChallengeHeader
        groupTitle={challengeInfo.groupTitle}
        thumbnail={challengeThumbnail}
      />
      <main>
        <SThumbnail id="information">
          <Image
            alt={`${groupId}의 대표 이미지`}
            src={challengeThumbnail}
            fill
            sizes={`${screenSize.max}px`}
            style={{ objectFit: 'cover' }}
            priority
          />
          <SChips>
            <dt className="a11yHidden">챌린지 인증 빈도</dt>
            <dd>매일</dd>
            <dt className="a11yHidden">챌린지 진행 기한</dt>
            <dd>2주</dd>
            <dt className="a11yHidden">챌린지 인증 방식</dt>
            <dd>{VERIFICATION_TYPE[challengeInfo.verificationType]}</dd>
            {challengeInfo.isFree && (
              <>
                <dt className="a11yHidden">챌린지 예치금 유무</dt>
                <dd>무료</dd>
              </>
            )}
          </SChips>
        </SThumbnail>
        <ChallengeSummary
          className="description"
          groupTitle={challengeInfo.groupTitle}
          participantCount={challengeInfo.participantCount}
          startDate={formattedDate(challengeInfo.startDate)}
          endDate={formattedDate(challengeInfo.endDate)}
          condition={calculateCondition(
            challengeInfo.startDate,
            challengeInfo.endDate,
          )}
          setSummaryHeight={setSummaryHeight}
        />
        <TabMenu
          positionTop={summaryHeight}
          tabs={[
            { href: '#information', text: '정보' },
            { href: '#review', text: '후기' },
            { href: '#verification', text: '인증' },
          ]}
        />
        <SSection>
          <SSectionTitle>챌린지 정보</SSectionTitle>
          <SSectionContext>
            {challengeInfo?.description
              .split('\n')
              .map((line) => <p key={uuidv4()}>{line}</p>)}
          </SSectionContext>
        </SSection>
        <ChallengeReview
          challengeId={challengeInfo?.challengeId}
          reviewList={reviewList}
        />
        <SSection id="verification">
          <SSectionTitle>인증 방식</SSectionTitle>
          <SSectionContext>
            {challengeInfo?.groupTitle.includes('스크린타임') && (
              <SNoticeVerification>
                스크린타임 챌린지는 <b>하루 전 날</b>의 핸드폰 사용 시간 인증
                제출을 규칙으로 합니다. 참가자는 실질적으로 전날인{' '}
                <b>{previousStartDate(challengeInfo.startDate)}</b> 부터
                챌린지에 참여해야 합니다.
              </SNoticeVerification>
            )}
            {challengeInfo?.verificationDescription
              .split('\n')
              .map((line) => <p key={uuidv4()}>{line}</p>)}
          </SSectionContext>
          <VeirificationExample title={challengeInfo.groupTitle} />
        </SSection>
        <SLinkItem
          href="https://waved-challenge.notion.site/bd9580432ee8470da26234db32ec15d7"
          target="_blank"
          rel="noreferrer noopener"
        >
          <h3>주의사항</h3>
          <Image
            src="/icons/icon-left-arrow.svg"
            alt="마이 챌린지로 가기"
            width={24}
            height={24}
          />
        </SLinkItem>
        <SLinkItem
          href="https://waved-challenge.notion.site/cbc09e0792fe470da7da980034534919"
          target="_blank"
          rel="noreferrer noopener"
        >
          <h3>예치금 환불 안내</h3>
          <Image
            src="/icons/icon-left-arrow.svg"
            alt="마이 챌린지로 가기"
            width={24}
            height={24}
          />
        </SLinkItem>
        {challengeInfo && (
          <ParticipantButton
            challengeData={challengeData}
            isApplied={challengeInfo.isApplied}
            myChallengeId={challengeInfo.myChallengeId}
            startDate={challengeInfo.startDate}
          />
        )}
        {snackBarData.open && (
          <SnackBar
            text={snackBarData.text}
            type={snackBarData.type}
            withBottomFixedBtn
          />
        )}
        <Modal />
      </main>
    </SLayoutWrapper>
  );
}

export async function getServerSideProps(
  context: GetServerSidePropsContext,
): Promise<
  | {
      props: {
        challengeInfo: IChallengeGroup;
        challengeThumbnail: string;
        reviewList: IChallengeReviewList;
      };
    }
  | { notFound: true }
> {
  const { groupId } = context.params as { groupId: string };
  const serverInstance = createServerInstance(context);

  async function fetchChallengeInfo() {
    try {
      const response = await getChallengeGroupApi(groupId, serverInstance);
      return response.data;
    } catch (error) {
      return null;
    }
  }
  const challengeInfo = await fetchChallengeInfo();
  if (!challengeInfo) {
    return { notFound: true };
  }

  const challengeThumbnail = getChallengeImagePath({
    title: challengeInfo.groupTitle,
  }) as string;

  const { challengeId } = challengeInfo;
  async function fetchReviews() {
    try {
      const response = await getReviewsApi(challengeId, serverInstance);
      return response.data;
    } catch (error) {
      console.error('review API GET 실패', error);
      return {
        content: [],
        totalPages: 0,
        totalElements: 0,
      };
    }
  }
  const reviewList = await fetchReviews();
  return {
    props: {
      challengeInfo,
      challengeThumbnail,
      reviewList: {
        content: reviewList.content,
        totalPages: reviewList.totalPages,
        totalElements: reviewList.totalElements,
      },
    },
  };
}

const SThumbnail = styled.div`
  position: relative;
  width: 100%;
  height: 246px;
  line-height: 0;
  scroll-margin-top: 56px;
`;

const SChips = styled.dl`
  position: absolute;
  left: 20px;
  bottom: 24px;
  display: flex;
  gap: 8px;
  z-index: 1;
  dd {
    display: inline-block;
    height: 24px;
    padding: 0 0.75rem;
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 12px;
    line-height: 24px;
    color: ${({ theme }) => theme.color.gray_ec};
    font-size: ${({ theme }) => theme.fontSize.body4};
    font-weight: ${({ theme }) => theme.fontWeight.body4};
  }
`;

export const SSection = styled.section`
  position: relative;
  padding: 1.5rem 0;
  color: ${({ theme }) => theme.color.gray_3c};
  scroll-margin-top: 182px;
  &:last-of-type {
    padding-bottom: 1.5rem;
  }
  &:not(:last-of-type)::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 6px;
    background-color: ${({ theme }) => theme.color.gray_ec};
  }
`;

export const SSectionTitle = styled.h3`
  padding: 0 1.25rem;
  font-size: ${({ theme }) => theme.fontSize.headline2};
  font-weight: ${({ theme }) => theme.fontWeight.headline2};
  div + & {
    position: relative;
    padding-top: 3rem;
    &::before {
      content: '';
      position: absolute;
      top: 1.25rem;
      left: 0;
      right: 0;
      height: 1px;
      background-color: ${({ theme }) => theme.color.gray_ec};
    }
  }
`;

const SSectionContext = styled.div`
  padding: 1rem 1.25rem 0;
  font-size: ${({ theme }) => theme.fontSize.body2};
  font-weight: ${({ theme }) => theme.fontWeight.body2};
  line-height: 1.8;
`;

const SNoticeVerification = styled.p`
  padding: 1rem;
  margin-bottom: 1rem;
  background-color: ${({ theme }) => theme.color.light};
  border-radius: 12px;
  text-align: center;
  font-size: ${({ theme }) => theme.fontSize.body4};
  font-weight: ${({ theme }) => theme.fontWeight.body4};
  line-height: 1.8;
  b {
    color: ${({ theme }) => theme.color.normal};
  }
`;

const SLinkItem = styled(Link)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 56px;
  padding: 0 1.25rem;
  h2 {
    line-height: 56px;
    color: ${({ theme }) => theme.color.gray_3c};
    font-size: ${({ theme }) => theme.fontSize.body1};
    font-weight: ${({ theme }) => theme.fontWeight.body1};
  }
  img {
    transform: rotate(180deg);
    display: inline-block;
    width: 24px;
    height: 24px;
  }
  &:not(:last-of-type) {
    border-bottom: 1px solid ${({ theme }) => theme.color.gray_ec};
  }
`;
