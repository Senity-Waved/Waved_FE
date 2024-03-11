import Layout from '@/components/common/Layout';
import Stamp from '@/components/verification/history/Stamp';
import VerificationList from '@/components/verification/history/VerificationList';
import styled from '@emotion/styled';

interface IVerificationDetail {
  id: number;
  author: number;
  content: string;
  likeCount: number;
  // time: Date;
}

interface IVerificationCollection {
  challengeTitle: string;
  results: (boolean | null)[];
  question?: string;
  verifications: IVerificationDetail[];
}

const data: IVerificationCollection = {
  challengeTitle: '기술 면접 챌린지 1기',
  results: [
    true,
    true,
    true,
    false,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ],
  question: '기술 면접 문제 내용입니다.',
  verifications: [
    {
      id: 1,
      author: 1,
      content: '답변입니다1',
      likeCount: 0,
    },
    {
      id: 2,
      author: 2,
      content: '답변입니다2',
      likeCount: 10,
    },
    {
      id: 3,
      author: 3,
      content: '답변입니다3',
      likeCount: 5,
    },
    {
      id: 4,
      author: 4,
      content: '답변입니다4',
      likeCount: 2,
    },
    {
      id: 5,
      author: 5,
      content: '답변입니다5',
      likeCount: 7,
    },
  ],
};

export default function VeirificationCollection() {
  return (
    <Layout
      headerText={data.challengeTitle}
      title="인증내역"
      description="챌린지의 인증내역을 확인하는 페이지입니다."
      noFooter
    >
      <SWrapper>
        <STitle>📌 내 인증 현황 </STitle>
        <Stamp results={data.results} />
        <VerificationList />
      </SWrapper>
    </Layout>
  );
}

const SWrapper = styled.div`
  background-color: ${({ theme }) => theme.color.gray_f9};
  padding: 1.5rem;
  height: 100%;
`;

const STitle = styled.h2`
  font-size: 1.125rem;
  line-height: 1.4;
  font-weight: ${({ theme }) => theme.fontWeight.subtitle1};
  color: ${({ theme }) => theme.color.gray_3c};
`;
