import { useRouter } from 'next/router';
import Image from 'next/image';
import styled from '@emotion/styled';
import { v4 as uuidv4 } from 'uuid';
import Link from 'next/link';
import { useSetRecoilState } from 'recoil';
import { useState } from 'react';
import { GetServerSidePropsContext } from 'next';
import { getCookie } from 'cookies-next';
import axios from 'axios';
import { SLayoutWrapper } from '@/components/common/Layout';
import TabMenu from '@/components/common/TabMenu';
import BottomFixedBtn from '@/components/common/BottomFixedBtn';
import ChallengeSummary from '@/components/challenge/ChallengeSummary';
// import ChallengeReviewItem from '@/components/challenge/ChallengeReviewItem';
import ChallengeHeader from '@/components/challenge/ChallengeHeader';
// import EmptyView from '@/components/common/EmptyView';
import screenSize from '@/constants/screenSize';
import ISelectedChallenge from '@/types/selectedChallenge';
import ASelectedChallenge from '@/atoms/selectedChallenge';
import ISnackBarState from '@/types/snackbar';
import SnackBar from '@/components/common/SnackBar';
import ScrollXBox from '@/components/common/ScrollXBox';

// interface IChallengeReview {
//   reviewId: number;
//   author: string;
//   jobTitle?: string;
//   createdDate: string;
//   context: string;
// }

interface IChallengeGroup {
  groupTitle: string;
  participantCount: number;
  startDate: string;
  endDate: string;
  verficationType: 'TEXT' | 'LINK' | 'PICTURE' | 'PHOTO';
  // thumbnail: string;
  description: string;
  verificationDescription: string;
  // verificationExample: string[];
  // isFree: boolean;
}

const condition = 'recruiting'; // 날짜 이용한 가공 이전 static 사용
const isFree = true; // api 필드 추가 이전 static 사용

export default function Challenge({
  getChallengeGroup,
}: {
  getChallengeGroup: IChallengeGroup;
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
      groupTitle: getChallengeGroup.groupTitle,
      startDate: getChallengeGroup.startDate,
      endDate: getChallengeGroup.endDate,
      condition,
      participantCount: getChallengeGroup.participantCount,
      isFree,
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
            // src={getChallengeGroup.thumbnail}
            src="https://via.placeholder.com/700x800.jpg"
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
            {isFree && (
              <>
                <dt className="a11yHidden">챌린지 예치금 유무</dt>
                <dd>무료</dd>
              </>
            )}
          </SChips>
        </SThumbnail>
        <ChallengeSummary
          className="description"
          groupTitle={getChallengeGroup.groupTitle}
          participantCount={getChallengeGroup.participantCount}
          startDate={getChallengeGroup.startDate}
          endDate={getChallengeGroup.endDate}
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
            {getChallengeGroup.description.split('\n').map((line) => (
              <p key={uuidv4()}>{line}</p>
            ))}
          </SSectionContext>
        </SSection>
        <SSection id="review">
          <SSectionTitle>챌린지 참여자 후기</SSectionTitle>
          {/* {getChallengeGroup.reviewCount === 0 ? (
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
          )} */}
        </SSection>
        <SSection id="verification">
          <SSectionTitle>인증 방식</SSectionTitle>
          <SSectionContext>
            {getChallengeGroup.description.split('\n').map((line) => (
              <p key={uuidv4()}>{line}</p>
            ))}
          </SSectionContext>
          <SSectionTitle>예시</SSectionTitle>
          <ScrollXBox>
            <SVerificationExample>
              현재 예시 이미지 샘플 부재
              {/* {getChallengeGroup.verificationExample.map((url) => (
                <Image
                  key={uuidv4()}
                  src={url}
                  width={150}
                  height={218}
                  priority
                  alt="인증 예시"
                />
              ))} */}
            </SVerificationExample>
          </ScrollXBox>
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
    getChallengeGroup: IChallengeGroup;
  };
}> {
  const cookieToken = getCookie('accessToken', context);
  const { challengeGroupId } = context.params as { challengeGroupId: string };
  try {
    const response = await axios.get<IChallengeGroup>(
      `http://localhost:9000/api/v1/challengeGroups/info/${challengeGroupId}`,
      {
        headers: {
          Authorization: `Bearer ${cookieToken}`,
        },
      },
    );
    console.log('myProcessingChallenge API GET 성공', response.data);
    return {
      props: {
        getChallengeGroup: response.data,
      },
    };
  } catch (error) {
    console.error('myProcessingChallenge API GET 실패', error);
    return {
      props: {
        getChallengeGroup: {
          groupTitle: '챌린지 정보를 불러오는 데 실패했습니다.',
          participantCount: 0,
          startDate: '2099-99-99',
          endDate: '2099-99-99',
          verficationType: 'TEXT',
          description: '챌린지 정보를 불러오는 데 실패했습니다.',
          verificationDescription: '',
        },
      },
    };
  }
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

// const SEmptyViewWrapper = styled.div`
//   position: relative;
//   height: 340px;
// `;

// const SMoreBtn = styled.button`
//   position: relative;
//   display: block;
//   margin: 0 auto;
//   padding: 0 1.75rem 0 0.5rem;
//   border-radius: 12px;
//   line-height: 24px;
//   background-color: ${({ theme }) => theme.color.light};
//   color: ${({ theme }) => theme.color.gray_3c};
//   font-size: ${({ theme }) => theme.fontSize.caption1};
//   font-weight: ${({ theme }) => theme.fontWeight.caption1};
//   &::after {
//     content: '';
//     position: absolute;
//     top: 6px;
//     right: 14px;
//     width: 6px;
//     height: 6px;
//     border-bottom: 1px solid ${({ theme }) => theme.color.gray_3c};
//     border-right: 1px solid ${({ theme }) => theme.color.gray_3c};
//     transform: rotate(45deg);
//   }
// `;

const SVerificationExample = styled.div`
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
