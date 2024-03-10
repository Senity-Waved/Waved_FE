import { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/common/Layout';

export default function PostReview() {
  const router = useRouter();
  const { challengeId } = router.query;
  const [reviewContent] = useState('');

  return (
    <Layout headerText="후기 작성" title="후기 작성" noFooter>
      {challengeId}
      <textarea value={reviewContent} maxLength={300} />
    </Layout>
  );
}
