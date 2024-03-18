import styled from '@emotion/styled';
import regex from '@/constants/regex';

interface ILinkInput {
  isLinkValid: boolean | undefined;
  setIsLinkValid: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  setLink: React.Dispatch<React.SetStateAction<string>>;
}

export default function LinkInput({
  isLinkValid,
  setIsLinkValid,
  setLink,
}: ILinkInput) {
  const checkLinkValidation = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLink(e.target.value);
    setIsLinkValid(regex.url.test(e.target.value));
  };
  return (
    <>
      <SSubTitle>1. 인증 링크</SSubTitle>
      <SInputWrapper>
        <SInput
          type="text"
          placeholder="http://"
          isLinkValid={isLinkValid}
          onChange={checkLinkValidation}
        />
        {isLinkValid === false && (
          <SErrorMsg>링크 입력 형식에 맞지 않습니다</SErrorMsg>
        )}
      </SInputWrapper>
      <SSubTitle>2. 인증 내용</SSubTitle>
    </>
  );
}

const SInputWrapper = styled.div`
  margin-bottom: 1.875rem;
  position: relative;
`;

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
      // eslint-disable-next-line no-nested-ternary
      isLinkValid === undefined
        ? theme.color.gray_ec
        : isLinkValid
          ? theme.color.gray_de
          : theme.color.error};
  background-color: ${({ theme }) => theme.color.gray_f9};
  padding: 0 0.125rem 0.125rem 0.125rem;

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

const SErrorMsg = styled.span`
  color: ${({ theme }) => theme.color.error};
  font-size: ${({ theme }) => theme.fontSize.caption2};
  font-weight: ${({ theme }) => theme.fontWeight.caption2};
  position: absolute;
  left: 0.125rem;
  bottom: -0.125rem;
  transform: translateY(100%);
`;
