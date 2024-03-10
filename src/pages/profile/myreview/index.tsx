import axios from 'axios';
import Layout from '@/components/common/Layout';
import IMyReview from '@/types/myReview';
import MyReviewItem from '@/components/profile/myreview/MyReviewItem';

export default function MyReview({
  getMyReviews,
}: {
  getMyReviews: IMyReview[];
}) {
  return (
    <Layout headerText="나의 후기" title="나의 후기" noFooter>
      <ul>
        {getMyReviews.map((review) => (
          <MyReviewItem key={review.id} {...review} />
        ))}
      </ul>
    </Layout>
  );
}

export async function getStaticProps(): Promise<{
  props: { getMyReviews: IMyReview[] };
}> {
  try {
    const response = await axios.get<IMyReview[]>(
      'http://localhost:3000/api/myReviews',
    );
    const { data } = response;
    return {
      props: {
        getMyReviews: data,
      },
    };
  } catch (error) {
    console.error('myReviewData GET 실패', error);
    return {
      props: {
        getMyReviews: [],
      },
    };
  }
}
