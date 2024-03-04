import styled from '@emotion/styled';

export default function ChallengeBtn() {
  return (
    <SBtnWrapper>
      <SBtn>인증하기</SBtn>
    </SBtnWrapper>
  );
}

const SBtnWrapper = styled.div`
  display: flex;
  gap: 9px;
`;

const SBtn = styled.button`
  width: 100%;
  height: 40px;
  line-height: 40px;
  border-radius: 8px;
  border: none;
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
`;
