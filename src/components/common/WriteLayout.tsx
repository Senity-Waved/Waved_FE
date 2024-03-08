import styled from '@emotion/styled';
import Btn from './Btn';
import { useState } from 'react';
import writeLayoutText from '@/constants/writeLayoutText';

interface IWriteLayout {
  pageType:
    | '후기작성'
    | '후기수정'
    | '챌린지요청'
    | '글인증'
    | '링크인증'
    | '사진인증';
  text: string;
  children: React.ReactNode;
  onSubmit: () => void;
}

export default function WriteLayout({
  pageType,
  children,
  text,
  onSubmit,
}: IWriteLayout) {
  const { mainText } = writeLayoutText[pageType];
  const { btnText } = writeLayoutText[pageType];

  return (
    <SWrapper>
      <SMainText>{mainText}</SMainText>
      <form onSubmit={onSubmit}>
        {children}
        <Btn
          btns={[
            {
              type: 'submit',
              text: btnText,
              styleType: text.length >= 10 ? 'primary' : 'disabled',
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
