import styled from '@emotion/styled';
import { useState } from 'react';

interface ILinkInput {}
export default function LinkInput() {
  const [isLinkValid, setIsLinkaValid] = useState<boolean | undefined>(true);
  return (
    <>
      <SSubTitle>1. 인증 링크</SSubTitle>
      <SInput type="text" placeholder="http://" isLinkValid={isLinkValid} />
      <SSubTitle>2. 인증 내용</SSubTitle>
    </>
  );
}

const SInput = styled.input<{ isLinkValid: boolean | undefined }>`
  color: ${({ theme }) => theme.color.gray_3c};
  font-size: ${({ theme }) => theme.fontSize.body4};
  font-weight: ${({ theme }) => theme.fontWeight.body4};
  height: 25px;
  width: 100%;
  margin-right: 1.25rem;
  outline: none;
  border: none;
  border-bottom: 1px solid
    ${({ theme, isLinkValid }) =>
      isLinkValid ? theme.color.gray_ec : theme.color.error};
  background-color: ${({ theme }) => theme.color.gray_f9};
  padding: 0 0.125rem 0.125rem 0.125rem;
  margin-bottom: 1.875rem;

  &::placeholder {
    color: ${({ theme }) => theme.color.gray_de};
  }

  &:focus {
    border-bottom: 1px solid ${({ theme }) => theme.color.gray_3c};
  }
`;

const SSubTitle = styled.h3`
  color: ${({ theme }) => theme.color.gray_52};
  font-size: ${({ theme }) => theme.fontSize.body4};
  font-weight: ${({ theme }) => theme.fontWeight.body4};
  margin-bottom: 0.5rem;

  &:nth-of-type(2) {
    margin-bottom: 1rem;
  }
`;
