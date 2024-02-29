import styled from '@emotion/styled';

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
      {btns.map((btn, index) => (
        <SBtn
          // eslint-disable-next-line react/no-array-index-key
          key={index}
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

const SBtnWrapper = styled.div`
  display: flex;
  gap: 8px;
`;

const SBtn = styled.button<ISBtn>`
  width: 100%;
  height: ${({ size }) => (size === 'large' ? '48px' : '36px')};
  background-color: ${({ backgroundColor }) => backgroundColor};
  border-radius: ${({ size }) => (size === 'large' ? '4px' : '8px')};
  color: ${({ fontColor }) => fontColor};
  font-size: 16px;
  line-height: ${({ size }) => (size === 'large' ? '48px' : '36px')};
  font-weight: bold;
  cursor: ${({ isAble }) => isAble || 'not-allowed'};
`;
