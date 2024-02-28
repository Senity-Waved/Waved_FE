import styled from '@emotion/styled';

type Props = {
  message: string;
};

type StyledProps = {
  color: string;
};

export default function TestBtn({ message }: Props) {
  return <StyledBtn color="primary">{message}</StyledBtn>;
}

const StyledBtn = styled.button<StyledProps>`
  background-color: ${({ theme }) => theme.color.primary};
  color: ${({ color }) => (color === 'primary' ? 'white' : 'gray')};
  font-size: 16px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #4285f4;
  }
`;
