import styled from '@emotion/styled';
import Btn from './Btn';

interface IWriteLayout {
  children: React.ReactNode;
  pageType: '후기작성' | '챌린지요청' | '링크인증' | '글인증' | '사진인증';
}

const writeLayoutText = {
  후기작성: {
    btnText: '작성완료',
    mainText: '챌린지 후기를 작성해주세요',
  },
  챌린지요청: {
    btnText: '요청하기',
    mainText: '요청 내용을 작성해주세요.',
  },
  링크인증: {
    btnText: '제출하기',
    mainText: '챌린지 인증 링크를 입력해주세요.',
  },
  글인증: {
    btnText: '제출하기',
    mainText: '챌린지 인증 내용을 작성해주세요.',
  },
  사진인증: {
    btnText: '요청하기',
    mainText: '챌린지 인증 사진을 첨부해주세요.',
  },
};

export default function WriteLayout({ children, pageType }: IWriteLayout) {
  const { mainText } = writeLayoutText[pageType];
  const { btnText } = writeLayoutText[pageType];

  return (
    <SWrapper>
      <SMainText>{mainText}</SMainText>
      {children}
      <Btn
        btns={[
          {
            text: btnText,
            styleType: 'primary',
            size: 'large',
          },
        ]}
      />
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

const SSubText = styled.p`
  font-size: 0.875rem;
  line-height: 1.4;
  font-weight: ${({ theme }) => theme.fontWeight.body4};
  color: ${({ theme }) => theme.color.gray_52};
  margin-bottom: 0.25rem;
`;
