import styled from '@emotion/styled';
import { v4 as uuidv4 } from 'uuid';
import { SBtn, SBtnWrapper } from '@/components/common/Btn';
import screenSize from '@/constants/screenSize';

export interface IBtn {
  type?: 'button' | 'submit';
  text: string;
  styleType: 'primary' | 'gray' | 'white' | 'white_line' | 'disabled';
  size: 'large' | 'small';
  onClick?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}

interface IBottomFixedBtn {
  btns: IBtn[];
}

export default function BottomFixedBtn({ btns }: IBottomFixedBtn) {
  return (
    <SBottomFixedBtn>
      {btns.map((btn) => (
        <SBtn
          key={uuidv4()}
          type={btn.type || 'button'}
          disabled={btn.styleType === 'disabled' ? true : undefined}
          styleType={btn.styleType}
          size={btn.size}
          onClick={btn.onClick}
        >
          {btn.text}
        </SBtn>
      ))}
    </SBottomFixedBtn>
  );
}

export const SBottomFixedBtn = styled(SBtnWrapper)`
  z-index: 10;
  position: fixed;
  bottom: 0;
  width: 100%;
  max-width: ${screenSize.max}px;
  height: 114px;
  padding: 1rem 1.25rem 3.125rem;
  background-color: ${({ theme }) => theme.color.white};
`;
