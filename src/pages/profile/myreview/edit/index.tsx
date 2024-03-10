import { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/common/Layout';

export default function EditReview() {
  const router = useRouter();
  const { reviewId, context } = router.query;
  const [reviewContent] = useState(context);

  return (
    <Layout headerText="후기 수정" title="후기 수정" noFooter>
      {reviewId}
      <textarea value={reviewContent} maxLength={300} />
    </Layout>
  );
}
