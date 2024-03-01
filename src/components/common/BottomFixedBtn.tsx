import styled from '@emotion/styled';
import { v4 as uuidv4 } from 'uuid';
import { SBtn, SBtnWrapper } from '@/components/common/Btn';

interface IBtn {
  type?: 'button' | 'submit';
  text: string;
  isDisabled?: boolean;
  styleType: 'primary' | 'gray' | 'white';
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
          disabled={btn.isDisabled === true ? true : undefined}
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
  position: absolute;
  bottom: 56px;
  width: 100%;
  margin-top: 14px;
  z-index: 10;
`;
