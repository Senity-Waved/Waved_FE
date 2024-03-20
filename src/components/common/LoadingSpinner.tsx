import styled from '@emotion/styled';
import { FadeLoader } from 'react-spinners';
import { SLayoutWrapper } from './Layout';

export default function LoadingSpinner() {
  return (
    <SLoadingSpinner>
      <FadeLoader color="#2470ff" />
    </SLoadingSpinner>
  );
}

const SLoadingSpinner = styled(SLayoutWrapper)`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.color.white};
`;
