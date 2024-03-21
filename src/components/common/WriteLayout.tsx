import styled from '@emotion/styled';
import { useCallback, useEffect, useState } from 'react';
import Btn from './Btn';
import writeLayoutText from '@/constants/writeLayoutText';
import useModal from '@/hooks/useModal';

export type TPageType =
  | '후기작성'
  | '후기수정'
  | '챌린지요청'
  | '링크인증'
  | '글인증'
  | '사진인증';
interface IWriteLayout {
  pageType: TPageType;
  text?: string;
  file?: File | null;
  isLinkValid?: boolean | undefined;
  children: React.ReactNode;
  handleSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
}

export default function WriteLayout({
  pageType,
  children,
  text,
  file,
  isLinkValid,
  handleSubmit,
  onClick,
}: IWriteLayout) {
  const { mainText } = writeLayoutText[pageType];
  const { btnText } = writeLayoutText[pageType];
  const [isBtnActive, setIsBtnActive] = useState(false);
  const isVerificationPage = pageType.includes('인증');
  const { openModal } = useModal();

  const checkValidation = useCallback(() => {
    switch (pageType) {
      case '사진인증':
        return file !== null;
      case '링크인증':
        return (
          text !== undefined &&
          text.length >= 10 &&
          isLinkValid !== undefined &&
          isLinkValid
        );
      default:
        return text !== undefined && text.length >= 10;
    }
  }, [text, file, isLinkValid, pageType]);

  useEffect(() => {
    const isActive = checkValidation();
    setIsBtnActive(isActive);
  }, [checkValidation]);

  return (
    <SWrapper>
      <SMainText>{mainText}</SMainText>
      <form onSubmit={handleSubmit}>
        {children}
        <Btn
          btns={[
            {
              type: isVerificationPage ? 'button' : 'submit',
              text: btnText,
              styleType: isBtnActive ? 'primary' : 'disabled',
              size: 'large',
              onClick:
                isVerificationPage && onClick !== undefined
                  ? () =>
                      openModal({
                        image: '/icons/icon-exclamation-mark.svg',
                        mainText: '인증을 제출 하시겠습니까?',
                        subText:
                          '인증하기 제출 후 수정, 삭제할 수 없으니 확인 후 올려주시기 바랍니다.',
                        btnText: '제출하기',
                        onClick,
                      })
                  : undefined,
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
  height: calc(100vh - 56px);
`;

const SMainText = styled.h2`
  font-size: 1.125rem;
  font-weight: ${({ theme }) => theme.fontWeight.subtitle1};
  color: ${({ theme }) => theme.color.gray_3c};
  margin-bottom: 1rem;
`;
