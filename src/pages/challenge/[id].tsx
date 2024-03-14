import { useRouter } from 'next/router';
import Image from 'next/image';
import styled from '@emotion/styled';
import { v4 as uuidv4 } from 'uuid';
import Link from 'next/link';
import { useSetRecoilState } from 'recoil';
import { useState } from 'react';
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
import DragXLayout from '@/components/common/DragXLayout';

interface IChallengeReview {
  reviewId: number;
  author: string;
  jobTitle?: string;
  createdDate: string;
  context: string;
}

interface IChallenge {
  type: 'write' | 'photo' | 'link' | 'github';
  title: string;
  thumbnail: string;
  description: string;
  participantCount: number;
  startDate: string;
  endDate: string;
  isFree: boolean;
  reviewCount: number;
  reviews: IChallengeReview[];
  verificationMethod: string;
  verificationExample: string[];
}

const challengeData: IChallenge = {
  type: 'photo',
  title: '프론트엔드 아티클 공유 챌린지 3기',
  thumbnail: 'https://via.placeholder.com/800x700.jpg',
  description:
    '자기 개발은 목표를 설정하고 달성하기 위한 여정입니다. 이 블로그 포스트에서는 일상 생활에 쉽게 통합할 수 있는 5가지 핵심 습관을 소개합니다. 첫 번째는 목표 설정과 시간 관리입니다. 이는 개인적 성취와 전문적 성장을 위한 기초를 마련합니다.\n두 번째 습관은 긍정적 사고를 통한 자기 격려입니다. 이는 도전을 극복하고 성공으로 나아가는 데 중요합니다. 세 번째는 건강 유지를 위한 일상적인 운동과 균형 잡힌 식단입니다. 건강한 몸은 능률적인 마음의 기초입니다. 네 번째는 지속적인 학습과 자기 계발입니다. ',
  participantCount: 23,
  startDate: '03월 04일 (월)',
  endDate: '03월 15일 (금)',
  isFree: false,
  reviewCount: 4,
  reviews: [
    {
      reviewId: 325544,
      author: '서퍼dfk34s',
      createdDate: '2024년 12월 31일',
      context:
        '피그마 플러그인 개발에 관심이 생겨서 찾아보게 되었는데,많은 도움이 되네요.',
    },
    {
      reviewId: 5462,
      author: '서퍼dfk34s',
      createdDate: '2024년 12월 31일',
      context:
        '피그마 플러그인 개발에 관심이 생겨서 찾아보게 되었는데,많은 도움이 되네요.',
    },
    {
      reviewId: 865877,
      author: '서퍼dfk34s',
      createdDate: '2024년 12월 31일',
      context:
        '피그마 플러그인 개발에 관심이 생겨서 찾아보게 되었는데,많은 도움이 되네요.',
    },
    {
      reviewId: 3464364,
      author: '서퍼dfk34s',
      createdDate: '2024년 12월 31일',
      context:
        '피그마 플러그인 개발에 관심이 생겨서 찾아보게 되었는데,많은 도움이 되네요.',
    },
    {
      reviewId: 8535435,
      author: '닉네임은최대열글자로',
      jobTitle: '프론트엔드',
      createdDate: '2023년 01월 01일',
      context:
        '피그마 플러그인 개발에 관심이 생겨서 찾아보게 되었는데,많은 도움이 되네요. 피그마 플러그인 개발에 관심이 생겨서 찾아보게 되었는데,많은 도움이 되네요. 피그마 플러그인 개발에 관심이 생겨서 찾아보게 되었는데,많은 도움이 되네요. 피그마 플러그인 개발에 관심이 생겨서 찾아보게 되었는데,많은 도움이 되네요.',
    },
  ],
  verificationMethod:
    '자기 개발은 목표를 설정하고 달성하기 위한 여정입니다. 이 블로그 포스트에서는 일상 생활에 쉽게 통합할 수 있는 5가지 핵심 습관을 소개합니다. 첫 번째는 목표 설정과 시간 관리입니다. 이는 개인적 성취와 전문적 성장을 위한 기초를 마련합니다.\n두 번째 습관은 긍정적 사고를 통한 자기 격려입니다. 이는 도전을 극복하고 성공으로 나아가는 데 중요합니다. 세 번째는 건강 유지를 위한 일상적인 운동과 균형 잡힌 식단입니다. 건강한 몸은 능률적인 마음의 기초입니다. 네 번째는 지속적인 학습과 자기 계발입니다. ',
  verificationExample: [
    'https://via.placeholder.com/150x218.jpg',
    'https://via.placeholder.com/150x218.jpg',
    'https://via.placeholder.com/150x218.jpg',
  ],
};

const condition = 'recruiting'; // 날짜 이용한 가공 이전 static 사용

export default function Challenge() {
  const router = useRouter();
  const id = typeof router.query.id === 'string' ? router.query.id : '';
  const [summaryHeight, setSummaryHeight] = useState(84);
  const [snackBarState, setSnackBarState] = useState<ISnackBarState>({
    open: false,
    text: '',
  });
  const selectedChallenge =
    useSetRecoilState<ISelectedChallenge>(ASelectedChallenge);

  const goToParticipant = () => {
    selectedChallenge({
      challengeGroupId: id,
      groupTitle: challengeData.title,
      startDate: challengeData.startDate,
      endDate: challengeData.endDate,
      condition,
      participantCount: challengeData.participantCount,
      isFree: challengeData.isFree,
    });
    router.push('/challenge/participant').catch((error) => {
      console.error('페이지 이동에 실패하였습니다.', error);
    });
  };

  return (
    <SLayoutWrapper>
      <ChallengeHeader setSnackBarState={setSnackBarState} />
      <main>
        <SThumbnail id="information">
          <Image
            alt={`${id} 대표 이미지`}
            src={challengeData.thumbnail}
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
            <dd>사진인증</dd>
            {challengeData.isFree && (
              <>
                <dt className="a11yHidden">챌린지 예치금 유무</dt>
                <dd>무료</dd>
              </>
            )}
          </SChips>
        </SThumbnail>
        <ChallengeSummary
          className="description"
          groupTitle={challengeData.title}
          participantCount={challengeData.participantCount}
          startDate={challengeData.startDate}
          endDate={challengeData.endDate}
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
            {challengeData.description.split('\n').map((line) => (
              <p key={uuidv4()}>{line}</p>
            ))}
          </SSectionContext>
        </SSection>
        <SSection id="review">
          <SSectionTitle>챌린지 참여자 후기</SSectionTitle>
          {challengeData.reviewCount === 0 ? (
            <SEmptyViewWrapper>
              <EmptyView pageType="챌린지후기" />
            </SEmptyViewWrapper>
          ) : (
            <>
              <ul>
                {challengeData.reviews.map((review) => {
                  const { reviewId, ...rest } = review;
                  return <ChallengeReviewItem key={reviewId} {...rest} />;
                })}
              </ul>
              <SMoreBtn type="button">더보기</SMoreBtn>
            </>
          )}
        </SSection>
        <SSection id="verification">
          <SSectionTitle>인증 방식</SSectionTitle>
          <SSectionContext>
            {challengeData.description.split('\n').map((line) => (
              <p key={uuidv4()}>{line}</p>
            ))}
          </SSectionContext>
          <SSectionTitle>예시</SSectionTitle>
          <DragXLayout>
            <SSectionScrollX>
              {challengeData.verificationExample.map((url) => (
                <Image
                  key={uuidv4()}
                  src={url}
                  width={150}
                  height={218}
                  priority
                  alt="인증 예시"
                />
              ))}
            </SSectionScrollX>
          </DragXLayout>
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
            isBottomFixedBtn
          />
        )}
      </main>
    </SLayoutWrapper>
  );
}

const SThumbnail = styled.div`
  position: relative;
  width: 100%;
  height: 246px;
  line-height: 0;
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0.3) 70%
    );
  }
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
    background-color: rgba(0, 0, 0, 0.4);
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
  scroll-margin-top: 134px;
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

const SSectionScrollX = styled.div`
  height: 254px;
  padding: 1rem 1.25rem;
  img {
    display: inline-block;
    &:not(:last-child) {
      margin-right: 0.625rem;
    }
    &:last-child {
      margin-right: 1.25rem;
    }
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
