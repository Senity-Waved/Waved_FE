import styled from '@emotion/styled';
import Link from 'next/link';

interface IBtn {
  challengeStatus: '진행중' | '대기중' | '진행완료';
  dday?: number;
  isAbled?: boolean;
  isAuto?: boolean;
  // challengeID: string;
  // verificationType: string;
}

export default function ChallengeBtn({
  challengeStatus,
  dday,
  isAbled,
  isAuto,
}: IBtn) {
  const preventLink = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!isAbled) {
      e.preventDefault(); // 버튼이 비활성화 상태일 때 링크 이동 중지
    }
  };

  switch (challengeStatus) {
    case '진행중':
      return (
        <SBtnWrapper>
          <SLink href="#">
            <SBtn styleType="light">인증내역</SBtn>
          </SLink>
          {isAuto ? (
            <SBtn styleType="gray">자동인증</SBtn>
          ) : (
            <SLink
              href={{
                pathname: '/verification',
                query: { type: '글인증' },
              }}
              as={`/verification`}
            >
              <SBtn
                styleType={isAbled ? 'middle' : 'gray'}
                onClick={preventLink}
              >
                인증하기
              </SBtn>
            </SLink>
          )}
        </SBtnWrapper>
      );
    case '대기중':
      return (
        <SBtnWrapper>
          <SBtn as="div" styleType="gray">
            챌린지 시작하기까지 D-{dday}
          </SBtn>
        </SBtnWrapper>
      );
    case '진행완료':
      return (
        <SBtnWrapper>
          <SLink href="#">
            <SBtn styleType="light">인증내역</SBtn>
          </SLink>
          <SLink href="#">
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
      middle: theme.color.middle,
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
