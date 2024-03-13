import styled from '@emotion/styled';
import Link from 'next/link';

interface IBtn {
  challengeStatus: '진행 중' | '대기 중' | '진행 완료';
  dday?: number;
  isAbled?: boolean;
  isAuto?: boolean;
  challengeId: string;
  // verificationType: string;
}

export default function ChallengeBtn({
  challengeStatus,
  dday,
  isAbled,
  isAuto,
  challengeId,
}: IBtn) {
  const preventLink = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!isAbled) {
      e.preventDefault(); // 버튼이 비활성화 상태일 때 링크 이동 중지
    }
  };

  switch (challengeStatus) {
    case '진행 중':
      return (
        <SBtnWrapper>
          <SLink href="/verification/collection/1">
            <SBtn styleType="light">인증 내역</SBtn>
          </SLink>
          <SLink
            href={{
              pathname: '/verification/post/1',
              query: { type: 'text' },
            }}
          >
            <SBtn styleType={isAbled ? 'middle' : 'gray'} onClick={preventLink}>
              인증 하기
            </SBtn>
          </SLink>
        </SBtnWrapper>
      );
    case '대기 중':
      return (
        <SBtnWrapper>
          <SBtn as="div" styleType="gray">
            챌린지 시작하기까지 D-{dday}
          </SBtn>
        </SBtnWrapper>
      );
    case '진행 완료':
      return (
        <SBtnWrapper>
          <SLink href="#">
            <SBtn styleType="light">인증 내역</SBtn>
          </SLink>
          <SLink
            href={{
              pathname: `/mychallenge/review`,
              query: { challengeId },
            }}
            as="mychallenge/review"
          >
            <SBtn styleType={isAbled ? 'middle' : 'gray'} onClick={preventLink}>
              후기작성
            </SBtn>
          </SLink>
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

const SBtn = styled.button<{ styleType: 'light' | 'gray' | 'middle' }>`
  width: 100%;
  height: 40px;
  line-height: 40px;
  text-align: center;
  border-radius: 8px;
  border: none;
  font-size: 0.875rem;
  font-weight: ${({ theme }) => theme.fontWeight.body3};
  transition: 0.2s ease-in;
  color: ${({ styleType, theme }) =>
    ({
      light: theme.color.normal,
      middle: theme.color.white,
      gray: theme.color.gray_83,
    })[styleType]};
  background-color: ${({ styleType, theme }) =>
    ({
      light: theme.color.light,
      middle: theme.color.normal,
      gray: theme.color.gray_ec,
    })[styleType]};
  cursor: ${({ styleType }) =>
    styleType === 'gray' ? 'not-allowed' : 'pointer'};

  &:hover,
  &:focus {
    background-color: ${({ styleType, theme }) =>
      ({
        light: '#BBD3FF',
        middle: theme.color.dark,
        gray: theme.color.gray_ec,
      })[styleType]};

    color: ${({ styleType, theme }) =>
      ({
        light: theme.color.dark,
        middle: theme.color.white,
        gray: theme.color.gray_83,
      })[styleType]};
  }
`;
