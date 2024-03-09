import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import Btn from './Btn';
import writeLayoutText from '@/constants/writeLayoutText';
import regex from '@/constants/regex';

interface IWriteLayout {
  pageType:
    | '후기작성'
    | '후기수정'
    | '챌린지요청'
    | '글인증'
    | '링크인증'
    | '사진인증';
  text?: string;
  file?: File | null;
  children: React.ReactNode;
  handleSubmit?: () => void;
  onClick?: () => void;
}

export default function WriteLayout({
  pageType,
  children,
  text,
  file,
  handleSubmit,
}: IWriteLayout) {
  const { mainText } = writeLayoutText[pageType];
  const { btnText } = writeLayoutText[pageType];
  const [isBtnActive, setIsBtnActive] = useState(false);

  const checkValidation = () => {
    switch (pageType) {
      case '사진인증':
        console.log(file);
        return file ? true : false;
      case '링크인증':
        return text ? (regex.url.test(text) ? true : false) : false;
      default:
        return text ? (text.length >= 10 ? true : false) : false;
    }
  };

  useEffect(() => {
    const isActive = checkValidation();
    setIsBtnActive(isActive);
  }, [text, file, checkValidation]);

  return (
    <SWrapper>
      <SMainText>{mainText}</SMainText>
      <form onSubmit={handleSubmit}>
        {children}
        <Btn
          btns={[
            {
              type: 'submit',
              text: btnText,
              styleType: isBtnActive ? 'primary' : 'disabled',
              size: 'large',
            },
          ]}
        />
      </form>
    </SWrapper>
  );
}

const SWrapper = styled.div`
  background-color: ${({ theme }) => theme.color.gray_f9};
  padding: 1.5rem 1.25rem;
  height: 100%;
`;

const SMainText = styled.h2`
  font-size: 1.125rem;
  font-weight: ${({ theme }) => theme.fontWeight.subtitle1};
  color: ${({ theme }) => theme.color.gray_3c};
  margin-bottom: 1rem;
`;
