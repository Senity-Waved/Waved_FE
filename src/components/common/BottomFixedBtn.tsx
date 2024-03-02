import styled from '@emotion/styled';
import { v4 as uuidv4 } from 'uuid';
import { SBtn, SBtnWrapper } from '@/components/common/Btn';

interface IBtn {
  type?: 'button' | 'submit';
  text: string;
  isDisabled?: boolean;
  styleType: 'primary' | 'gray' | 'white' | 'white_line';
  size: 'large' | 'small';
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
          disabled={btn.isDisabled || undefined}
          styleType={btn.styleType}
          size={btn.size}
        >
          {btn.text}
        </SBtn>
      ))}
    </SBottomFixedBtn>
  );
}

const SBottomFixedBtn = styled(SBtnWrapper)`
  z-index: 10;
  position: absolute;
  bottom: 0;
  width: 100%;
  margin: 14px 0 20px;
  padding: ${({ theme }) => `0 ${theme.spacing.md}`};
`;
