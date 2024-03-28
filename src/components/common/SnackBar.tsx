import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

interface ISnackBar {
  text: string;
  type?: 'correct' | 'warning';
  noFooter?: boolean;
  withBottomFixedBtn?: boolean;
}

export default function SnackBar({
  type,
  text,
  noFooter,
  withBottomFixedBtn,
}: ISnackBar) {
  return (
    <SSnackBar
      type={type}
      noFooter={noFooter}
      withBottomFixedBtn={withBottomFixedBtn}
    >
      {text}
    </SSnackBar>
  );
}

const fadeIn = keyframes`
  0% {
    opacity: 0;
    transform: translateY(10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeOut = keyframes`
  0% {
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateY(10px);
  }
`;

const SSnackBar = styled.p<Partial<ISnackBar>>`
  position: fixed;
  bottom: ${({ noFooter, withBottomFixedBtn }) => {
    if (noFooter) return '30px';
    if (withBottomFixedBtn) return '114px';
    return '107px';
  }};
  width: calc(100% - 2.5rem);
  max-width: calc(430px - 2.5rem);
  margin: 0 1.25rem;
  padding: 0.6875rem 0.875rem;
  background-color: ${({ theme }) => theme.color.gray_3c};
  border-radius: 8px;
  line-height: 24px;
  color: ${({ theme }) => theme.color.gray_f9};
  font-size: ${({ theme }) => theme.fontSize.body4};
  font-weight: ${({ theme }) => theme.fontWeight.body4};
  z-index: 20;
  animation:
    ${fadeIn} 0.5s linear,
    ${fadeOut} 0.5s linear 3s forwards;
  &::before {
    content: '';
    display: inline-block;
    background-image: ${({ type }) =>
      type === 'warning'
        ? "url('/icons/icon-warning.svg')"
        : "url('/icons/icon-correct.svg')"};
    background-repeat: no-repeat;
    background-position: center;
    width: 24px;
    height: 24px;
    margin-right: 10px;
    vertical-align: bottom;
  }
`;
