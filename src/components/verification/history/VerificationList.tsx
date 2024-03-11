import styled from '@emotion/styled';

export default function VerificationList() {
  return (
    <SWrapper>
      <SList></SList>
    </SWrapper>
  );
}

const SWrapper = styled.div`
  background-color: ${({ theme }) => theme.color.white};
  padding: 1.5rem 1.25rem;
  border-radius: 24px 24px 0 0;
  height: 300px;
  width: 100%;
  left: 0;
  position: absolute;
  box-shadow: 0 -5px 20px rgba(0, 0, 0, 0.05);

  &::before {
    content: '';
    display: block;
    position: absolute;
    width: 32px;
    height: 4px;
    top: 8px;
    left: 50%;
    transform: translateX(-50%);
    background-color: ${({ theme }) => theme.color.gray_bf};
    border-radius: 100px;
  }
`;

const SList = styled.ul``;
