import { useRouter } from 'next/router';
import Image from 'next/image';
import styled from '@emotion/styled';
import { v4 as uuidv4 } from 'uuid';
import Link from 'next/link';
import { useSetRecoilState } from 'recoil';
import { useState } from 'react';
import { GetServerSidePropsContext } from 'next';
import { getCookie } from 'cookies-next';
import axios, { AxiosError } from 'axios';
import { SLayoutWrapper } from '@/components/common/Layout';
import TabMenu from '@/components/common/TabMenu';
import BottomFixedBtn from '@/components/common/BottomFixedBtn';
import ChallengeSummary from '@/components/challenge/ChallengeSummary';
import ChallengeReviewItem from '@/components/challenge/ChallengeReviewItem';
import ChallengeHeader from '@/components/challenge/ChallengeHeader';
import EmptyView from '@/components/common/EmptyView';
import screenSize from '@/constants/screenSize';
import ISelectedChallenge from '@/types/selectedChallenge';
import ASelectedChallenge from '@/atoms/selectedChallenge';
import ISnackBarState from '@/types/snackbar';
import SnackBar from '@/components/common/SnackBar';
import getChallengeThumbnailPath from '@/utils/getChallengeThumbnailPath';
import VeirificationExample from '@/components/challenge/VerificationExample';
import VERIFICATION_TYPE from '@/constants/verificationType';
import IChallengeGroup from '@/types/challengeGroup';
import { TChallengeReview } from '@/types/review';

const condition = 'recruiting'; // 날짜 이용한 가공 이전 static 사용

interface IReviewList {
  content: TChallengeReview[];
  totalPages: number;
  totalElements: number;
}

export default function Challenge({
  challengeInfo,
  reviews,
}: {
  challengeInfo: IChallengeGroup;
  reviews: TChallengeReview[];
}) {
  const router = useRouter();
  const groupId = router.query.groupId as string;
  const [summaryHeight, setSummaryHeight] = useState(84);
  const [snackBarState, setSnackBarState] = useState<ISnackBarState>({
    open: false,
    text: '',
  });
  const selectedChallenge =
    useSetRecoilState<ISelectedChallenge>(ASelectedChallenge);
  const goToParticipant = () => {
    selectedChallenge({
      challengeGroupId: groupId,
      groupTitle: challengeInfo.groupTitle,
      startDate: challengeInfo.startDate,
      endDate: challengeInfo.endDate,
      condition,
      participantCount: challengeInfo.participantCount,
      isFree: challengeInfo.isFree,
    });
    router.push('/challenge/participant').catch((error) => {
      console.error('페이지 이동에 실패하였습니다.', error);
    });
  };

  return (
    <SLayoutWrapper withBottomFixedBtn>
      <ChallengeHeader setSnackBarState={setSnackBarState} />
      <main>
        <SThumbnail id="information">
          <Image
            alt={`${groupId}의 대표 이미지`}
            src={getChallengeThumbnailPath(challengeInfo.groupTitle)}
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
          startDate={challengeInfo.startDate}
          endDate={challengeInfo.endDate}
          condition={condition}
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
          <SSectionTitle>챌린지 커리큘럼 or 소개</SSectionTitle>
          <SSectionContext>
            {challengeInfo.description.split('\n').map((line) => (
              <p key={uuidv4()}>{line}</p>
            ))}
          </SSectionContext>
        </SSection>
        <SSection id="review">
          <SSectionTitle>챌린지 참여자 후기</SSectionTitle>
          {reviews.length === 0 ? (
            <SEmptyViewWrapper>
              <EmptyView pageType="챌린지후기" />
            </SEmptyViewWrapper>
          ) : (
            <>
              <ul>
                {reviews.map((review) => {
                  return <ChallengeReviewItem key={uuidv4()} {...review} />;
                })}
              </ul>
              <SMoreBtn type="button">더보기</SMoreBtn>
            </>
          )}
        </SSection>
        <SSection id="verification">
          <SSectionTitle>인증 방식</SSectionTitle>
          <SSectionContext>
            {challengeInfo.description.split('\n').map((line) => (
              <p key={uuidv4()}>{line}</p>
            ))}
          </SSectionContext>
          <SSectionTitle>예시</SSectionTitle>
          <VeirificationExample title={challengeInfo.groupTitle} />
        </SSection>
        <SLinkItem href="/">
          <h3>주의사항</h3>
          <Image
            src="/icons/icon-left-arrow.svg"
            alt="마이 챌린지로 가기"
            width={24}
            height={24}
          />
        </SLinkItem>
        <SLinkItem href="/">
          <h3>예치금 환불 안내</h3>
          <Image
            src="/icons/icon-left-arrow.svg"
            alt="마이 챌린지로 가기"
            width={24}
            height={24}
          />
        </SLinkItem>
        <BottomFixedBtn
          btns={[
            {
              text: '신청하기',
              styleType: 'primary',
              size: 'large',
              onClick: goToParticipant,
            },
          ]}
        />
        {snackBarState.open && (
          <SnackBar
            text={snackBarState.text}
            type={snackBarState.type}
            withBottomFixedBtn
          />
        )}
      </main>
    </SLayoutWrapper>
  );
}

export async function getServerSideProps(
  context: GetServerSidePropsContext,
): Promise<{
  props: {
    challengeInfo: IChallengeGroup;
    reviews: TChallengeReview[];
  };
}> {
  const cookieToken = getCookie('accessToken', context);
  console.log('🍪🍪🍪🍪🍪🍪🍪', cookieToken);
  const { groupId } = context.params as { groupId: string };
  async function fetchChallengeInfo() {
    try {
      const response = await axios.get<IChallengeGroup>(
        `http://localhost:9000/api/v1/challengeGroups/info/${groupId}`,
        {
          headers: {
            Authorization: `Bearer ${cookieToken}`,
          },
        },
      );
      console.log('challengeGroup API GET 성공');
      return response.data;
    } catch (error) {
      console.error('challengeGroup API GET 실패', error);
      return {
        groupTitle: '챌린지 정보를 불러오는 데 실패했습니다.',
        participantCount: 0,
        startDate: '2099-99-99',
        endDate: '2099-99-99',
        verficationType: 'TEXT',
        description: '챌린지 정보를 불러오는 데 실패했습니다.',
        verificationDescription: '',
        isFree: false,
        isApplied: false,
        challengeId: -1,
        mychallengeId: -1,
      };
    }
  }
  const challengeInfo = (await fetchChallengeInfo()) as IChallengeGroup;
  const { challengeId } = challengeInfo;
  async function fetchReviews() {
    await axios
      .get<IReviewList>(
        `http://localhost:9000/api/v1/challenges/${challengeId}/reviews?page=0&limit=5`,
      )
      .then((res) => {
        console.log('review API GET 성공', res.data.content);
        return res.data.content;
      })
      .catch((error: AxiosError) => {
        if (error.response) {
          console.error('review API GET 실패', error.response.data);
        }
      });
    return [];
  }
  const reviews = (await fetchReviews()) || [];
  return {
    props: {
      challengeInfo,
      reviews,
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

const SSection = styled.section`
  position: relative;
  padding: 1.5rem 0;
  color: ${({ theme }) => theme.color.gray_3c};
  scroll-margin-top: 182px;
  &:last-of-type {
    padding-bottom: 0;
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

const SSectionTitle = styled.h3`
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

const SEmptyViewWrapper = styled.div`
  position: relative;
  height: 340px;
`;

const SMoreBtn = styled.button`
  position: relative;
  display: block;
  margin: 0 auto;
  padding: 0 1.75rem 0 0.5rem;
  border-radius: 12px;
  line-height: 24px;
  background-color: ${({ theme }) => theme.color.light};
  color: ${({ theme }) => theme.color.gray_3c};
  font-size: ${({ theme }) => theme.fontSize.caption1};
  font-weight: ${({ theme }) => theme.fontWeight.caption1};
  &::after {
    content: '';
    position: absolute;
    top: 6px;
    right: 14px;
    width: 6px;
    height: 6px;
    border-bottom: 1px solid ${({ theme }) => theme.color.gray_3c};
    border-right: 1px solid ${({ theme }) => theme.color.gray_3c};
    transform: rotate(45deg);
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
