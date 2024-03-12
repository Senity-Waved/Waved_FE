import { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/common/Layout';
import WriteLayout from '@/components/common/WriteLayout';
import writeLayoutText from '@/constants/writeLayoutText';
import TextArea from '@/components/common/TextArea';

export default function PostReview() {
  const router = useRouter();
  const challengeId = router.query.challengeId as string;
  const { placeholder } = writeLayoutText['후기작성'];
  const [text, setText] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(`${challengeId}의 리뷰 작성 완료! : ${text}`);
    router
      .push({
        pathname: '/mychallenge',
        query: {
          postReviewSuccess: true,
        },
      })
      .catch((error) => {
        console.error('페이지 이동 실패', error);
      });
  };

  return (
    <Layout
      headerText="후기 작성"
      title="후기 작성"
      description="챌린지 후기를 작성하는 페이지입니다."
      noFooter
    >
      <WriteLayout pageType="후기작성" handleSubmit={handleSubmit} text={text}>
        <TextArea placeholder={placeholder} text={text} setText={setText} />
      </WriteLayout>
    </Layout>
  );
}
