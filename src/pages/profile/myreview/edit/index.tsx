import { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/common/Layout';
import WriteLayout from '@/components/common/WriteLayout';
import TextArea from '@/components/common/TextArea';
import writeLayoutText from '@/constants/writeLayoutText';

export default function EditReview() {
  const router = useRouter();
  const { reviewId, context } = router.query;
  const { placeholder } = writeLayoutText['후기수정'];
  const [text, setText] = useState<string>(
    typeof context === 'string' ? context : '',
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(`수정완료! ${text}`);
    router
      .push({
        pathname: '/profile/myreview',
        query: {
          editReviewSuccess: true,
        },
      })
      .catch((error) => {
        console.error('페이지 이동 실패', error);
      });
  };

  return (
    <Layout
      headerText="후기 수정"
      title="후기 수정"
      description="내가 작성한 챌린지 후기를 수정하는 페이지입니다."
      noFooter
    >
      <WriteLayout pageType="후기수정" handleSubmit={handleSubmit} text={text}>
        <TextArea placeholder={placeholder} text={text} setText={setText} />
      </WriteLayout>
      {reviewId}
    </Layout>
  );
}
