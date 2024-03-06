import styled from '@emotion/styled';

interface IBtn {
  challengeStatus: '진행중' | '대기중' | '진행완료';
  dday?: number;
  isAbled?: boolean;
  isAuto?: boolean;
  link?: string[]; // 버튼 클릭시 이동경로 - 인증내역,인증하기,후기작성
}

export default function ChallengeBtn({
  challengeStatus,
  dday,
  isAbled,
  isAuto,
  link,
}: IBtn) {
  const preventLink = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (!isAbled) {
      event.preventDefault(); // 버튼이 비활성화 상태일 때 링크 이동 중지
    }
  };

  switch (challengeStatus) {
    case '진행중':
      return (
        <SBtnWrapper>
          <SBtn styleType="light" href="#">
            인증내역
          </SBtn>
          {isAuto ? (
            <SBtn styleType="gray">자동인증</SBtn>
          ) : (
            <SBtn styleType={isAbled ? 'middle' : 'gray'}>인증하기</SBtn>
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
          <SBtn styleType="light">인증내역</SBtn>
          <SBtn styleType={isAbled ? 'middle' : 'gray'}>후기작성</SBtn>
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

const SBtn = styled.a<{ styleType: 'light' | 'gray' | 'middle' }>`
  width: 100%;
  height: 40px;
  text-align: center;
  line-height: 40px;
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
