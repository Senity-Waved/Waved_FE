import styled from '@emotion/styled';
import { useState } from 'react';

interface ITextArea {
  placeholder: string;
  text?: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
}

export default function TextArea({
  placeholder,
  text = '',
  setText,
}: ITextArea) {
  const [value, setValue] = useState<string>(text);
  const [textLength, setTextLength] = useState<number>(text.length);

  const countTextLength = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
    setText(e.target.value);
    setTextLength(e.target.value.length);
  };

  return (
    <SWrapper>
      <STextArea
        placeholder={placeholder}
        maxLength={300}
        onChange={countTextLength}
        value={value}
      />
      <STextLength>&#40;{textLength}/300&#41;</STextLength>
    </SWrapper>
  );
}

const SWrapper = styled.div`
  position: relative;
`;

const STextArea = styled.textarea`
  width: 100%;
  height: 220px;
  font-size: 0.875rem;
  line-height: 1.4;
  font-weight: ${({ theme }) => theme.fontWeight.body4};
  color: ${({ theme }) => theme.color.gray_52};
  background-color: ${({ theme }) => theme.color.white};
  border: none;
  border-radius: 8px;
  padding: 0.5rem;
  box-shadow: 0 3px 8px 2px rgba(35, 62, 112, 0.05);
  resize: none;
  margin-bottom: 1.5rem;
  overflow-y: auto;

  &::placeholder {
    color: ${({ theme }) => theme.color.gray_bf};
  }

  &:focus {
    outline: none;
  }

  -webkit-overflow-scrolling: touch;
  /* 스크롤바 미노출 */
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Chrome , Safari , Opera */
  }
`;

const STextLength = styled.span`
  font-size: 0.75rem;
  line-height: 1.4;
  font-weight: ${({ theme }) => theme.fontWeight.caption2};
  color: ${({ theme }) => theme.color.gray_83};
  position: absolute;
  bottom: 3px;
  right: 0;
  margin: 2rem 0.5rem;
`;
