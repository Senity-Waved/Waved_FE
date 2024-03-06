import Layout from '@/components/common/Layout';
import TextArea from '@/components/common/TextArea';
import WriteLayout from '@/components/common/WriteLayout';
import styled from '@emotion/styled';

export default function Verification() {
  return (
    <Layout
      headerText="인증하기"
      rightText="인증패스"
      title="인증하기"
      description="챌린지 인증방식에 맞게 인증을 진행하는 페이지입니다."
    >
      <WriteLayout pageType="글인증">
        <SQuestion>
          Q. 출제된 문제 내용 출제된 문제 내용 출제된 문제 내용 출제된 문제 내용
          출제된 문제 내용
        </SQuestion>
        <TextArea placeholder="내용을 작성해주세요 :)" />
      </WriteLayout>
    </Layout>
  );
}

const SQuestion = styled.p`
  font-size: 0.875rem;
  line-height: 1.4;
  font-weight: ${({ theme }) => theme.fontWeight.body4};
  color: ${({ theme }) => theme.color.gray_52};
  margin-bottom: 0.25rem;
`;

const SPassDay = styled.div`
  width: 100%;
  height: 220px;
  background-color: ${({ theme }) => theme.color.white};
  border-radius: 8px;
  margin-bottom: 1.5rem;
`;
