import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import {
  fetchMyChallenges,
  refundRequestApi,
} from '@/lib/axios/mychallenge/api';
import { postMyCommitVerifiactionApi } from '@/lib/axios/verification/post/api';
import { TMyChallengeInfo, TMyChallengeStatus } from '@/types/myChallenge';
import useModal from '@/hooks/useModal';
import calculateDDay from '@/utils/calculateDDay';

interface IBtn extends Omit<TMyChallengeInfo, 'successCount' | 'deposit'> {
  status: TMyChallengeStatus;
  setData?: React.Dispatch<React.SetStateAction<TMyChallengeInfo[]>>;
}

export default function ChallengeBtn({
  myChallengeId,
  challengeGroupId,
  isReviewed,
  isVerified,
  isSuccessed,
  isRefundRequested,
  isGithubConnected,
  verificationType,
  startDate,
  status,
  setData,
}: IBtn) {
  const router = useRouter();
  const { openModal, closeModal } = useModal();
  const isAble = (() => {
    return status === 'PROGRESS'
      ? !isVerified
      : status === 'COMPLETED' && !isReviewed;
  })();

  const preventLink = (e: React.MouseEvent<HTMLElement>) => {
    if (!isAble) {
      e.preventDefault(); // 버튼이 비활성화 상태일 때 링크 이동 중지
    }
  };

  const postMyVerification = async () => {
    try {
      const response = await postMyCommitVerifiactionApi(challengeGroupId);
      if (response) {
        router
          .push({
            pathname: `/verification/collection/${challengeGroupId}`,
            query: {
              type: verificationType,
              myChallengeId,
              successSubmission: true,
            },
          })
          .catch((error) => {
            console.error('페이지 이동에 실패하였습니다.', error);
          });
      }
    } catch (error) {
      console.error('커밋인증 실패', error);
    }
  };

  const getRefund = () => {
    refundRequestApi(myChallengeId)
      .then(() => {
        fetchMyChallenges(status)
          .then((res) => {
            if (setData !== undefined) setData(res);
            openModal({
              image: '/icons/icon-done.svg',
              mainText: '환급 신청이 완료되었습니다.',
              subText:
                '참여한 챌린지가 어떠했는지 여러분의 소중한 후기를 남겨주세요.',
              btnText: '후기 작성',
              cancelBtnText: '나중에 하기',
              onClick: () => {
                router
                  .push({
                    pathname: `/mychallenge/review/${myChallengeId}`,
                  })
                  .catch((error) => {
                    console.error('페이지 이동에 실패하였습니다.', error);
                  });
                closeModal();
              },
            });
          })
          .catch((error) => console.error(error));
      })
      .catch((error) => console.error(error));
  };

  const handleCommitBtn = () => {
    if (isAble) {
      openModal({
        image: '/icons/icon-exclamation-mark.svg',
        mainText: isGithubConnected
          ? '인증을 제출 하시겠습니까?'
          : '깃허브 아이디를 연동하시겠습니까?',
        subText: isGithubConnected
          ? '인증하기 제출 후 수정, 삭제할 수 없으니 확인 후 올려주시기 바랍니다.'
          : '1일 1커밋 챌린지의 경우 깃허브 아이디를 연동해야 인증이 가능합니다. ',
        btnText: isGithubConnected ? '제출하기' : '네,연동할게요',
        onClick: () => {
          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
          isGithubConnected
            ? postMyVerification().catch((error) => console.error(error))
            : router
                .push(`/profile/mygithub`)
                .catch((error) => console.error(error));
          closeModal();
        },
      });
    }
  };

  switch (status) {
    case 'PROGRESS':
      return (
        <SBtnWrapper>
          <SLink
            href={{
              pathname: `/verification/collection/${challengeGroupId}`,
              query: { type: verificationType, myChallengeId },
            }}
          >
            <SBtn styleType="light">인증 내역</SBtn>
          </SLink>
          {verificationType === 'GITHUB' ? (
            <SBtn
              as="button"
              styleType={isAble ? 'middle' : 'gray'}
              onClick={handleCommitBtn}
            >
              {isAble ? '인증 하기' : '인증 완료'}
            </SBtn>
          ) : (
            <SLink
              href={{
                pathname: `/verification/post/${challengeGroupId}`,
                query: { type: verificationType, myChallengeId },
              }}
            >
              <SBtn
                styleType={isAble ? 'middle' : 'gray'}
                onClick={preventLink}
              >
                {isAble ? '인증 하기' : '인증 완료'}
              </SBtn>
            </SLink>
          )}
        </SBtnWrapper>
      );
    case 'WAITING':
      return (
        <SBtnWrapper>
          <SBtn styleType="gray" suppressHydrationWarning>
            챌린지 시작하기까지 D-{Math.abs(calculateDDay(startDate))}
          </SBtn>
        </SBtnWrapper>
      );
    case 'COMPLETED':
      return (
        <SBtnWrapper>
          <SLink
            href={{
              pathname: `/verification/collection/${challengeGroupId}`,
              query: { type: verificationType, myChallengeId },
            }}
          >
            <SBtn styleType="light">인증 내역</SBtn>
          </SLink>
          {isSuccessed && !isRefundRequested ? (
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            <SBtn as="button" styleType="middle" onClick={getRefund}>
              환급 신청
            </SBtn>
          ) : (
            <SLink
              href={{
                pathname: `/mychallenge/review/${myChallengeId}`,
              }}
            >
              <SBtn
                styleType={isAble ? 'border' : 'bordergray'}
                onClick={preventLink}
              >
                {isAble ? '후기 작성' : '작성 완료'}
              </SBtn>
            </SLink>
          )}
        </SBtnWrapper>
      );
    default:
      return null;
  }
}

const SBtnWrapper = styled.div`
  display: flex;
  gap: 9px;
`;

const SLink = styled(Link)`
  width: 100%;
`;

const SBtn = styled.div<{
  styleType: 'light' | 'gray' | 'middle' | 'border' | 'bordergray';
}>`
  width: 100%;
  height: 40px;
  line-height: 40px;
  text-align: center;
  border-radius: 8px;
  border: ${({ styleType, theme }) =>
    ({
      light: 'none',
      middle: 'none',
      gray: 'none',
      border: `1px solid ${theme.color.normal}`,
      bordergray: `1px solid ${theme.color.gray_99}`,
    })[styleType]};
  font-size: ${({ theme }) => theme.fontSize.body3};
  font-weight: ${({ theme }) => theme.fontWeight.body3};
  transition: 0.2s ease-in;
  color: ${({ styleType, theme }) =>
    ({
      light: theme.color.normal,
      middle: theme.color.white,
      gray: theme.color.gray_83,
      border: theme.color.normal,
      bordergray: theme.color.gray_99,
    })[styleType]};
  background-color: ${({ styleType, theme }) =>
    ({
      light: theme.color.light,
      middle: theme.color.normal,
      gray: theme.color.gray_ec,
      border: theme.color.white,
      bordergray: theme.color.white,
    })[styleType]};
  cursor: ${({ styleType }) =>
    styleType === 'gray' || styleType === 'bordergray'
      ? 'not-allowed'
      : 'pointer'};

  &:hover,
  &:focus {
    background-color: ${({ styleType, theme }) =>
      ({
        light: '#BBD3FF',
        middle: theme.color.dark,
        gray: theme.color.gray_ec,
        border: theme.color.light,
        bordergray: theme.color.white,
      })[styleType]};

    color: ${({ styleType, theme }) =>
      ({
        light: theme.color.dark,
        middle: theme.color.white,
        gray: theme.color.gray_83,
        border: theme.color.dark,
        bordergray: theme.color.gray_99,
      })[styleType]};
    border: ${({ styleType, theme }) =>
      ({
        light: 'none',
        middle: 'none',
        gray: 'none',
        border: `1px solid ${theme.color.dark}`,
        bordergray: `1px solid ${theme.color.gray_99}`,
      })[styleType]};
  }
`;
