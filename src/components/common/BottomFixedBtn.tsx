import styled from '@emotion/styled';
import { SBtn, SBtnWrapper } from '@/components/common/Btn';

interface IBtn {
  type: 'button' | 'submit';
  text: string;
  isAble: boolean;
  backgroundColor: string;
  fontColor: string;
  size: 'large' | 'small';
}

interface IBottomFixedBtn {
  btns: IBtn[];
}

export default function BottomFixedBtn({ btns }: IBottomFixedBtn) {
  return (
    <SBottomFixedBtn>
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
