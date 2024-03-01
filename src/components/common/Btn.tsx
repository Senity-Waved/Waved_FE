import styled from '@emotion/styled';
import { v4 as uuidv4 } from 'uuid';

interface IBtn {
  type: 'button' | 'submit';
  text: string;
  isAble: boolean;
  backgroundColor: string;
  fontColor: string;
  size: 'large' | 'small';
}

interface IBtnWrapper {
  btns: IBtn[];
}

interface ISBtn {
  isAble: boolean;
  backgroundColor: string;
  fontColor: string;
  size: 'large' | 'small';
}

export default function Btn({ btns }: IBtnWrapper) {
  return (
    <SBtnWrapper>
      {btns.map((btn) => (
        <SBtn
          key={uuidv4()}
          type={btn.type}
          isAble={btn.isAble}
          backgroundColor={btn.backgroundColor}
          fontColor={btn.fontColor}
          size={btn.size}
        >
          {btn.text}
        </SBtn>
      ))}
    </SBtnWrapper>
  );
}

export const SBtnWrapper = styled.div`
  display: flex;
  width: 100%;
  gap: ${({ theme }) => theme.spacing.xs};
`;

export const SBtn = styled.button<ISBtn>`
  width: 100%;
  height: ${({ size }) => (size === 'large' ? '48px' : '36px')};
  background-color: ${({ backgroundColor }) => backgroundColor};
  border-radius: ${({ size }) => (size === 'large' ? '4px' : '8px')};
  color: ${({ fontColor }) => fontColor};
  font-size: 1rem;
  line-height: ${({ size }) => (size === 'large' ? '48px' : '36px')};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  cursor: ${({ isAble }) => isAble || 'not-allowed'};
`;
