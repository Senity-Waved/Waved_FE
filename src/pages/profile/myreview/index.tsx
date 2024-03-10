import axios from 'axios';
import Layout from '@/components/common/Layout';
import IMyReview from '@/types/myReview';
import MyReviewItem from '@/components/profile/myreview/MyReviewItem';

export default function MyReview({
  getMyReviewData,
}: {
  getMyReviewData: IMyReview[];
}) {
  return (
    <Layout headerText="나의 후기" title="나의 후기" noFooter>
      <ul>
        {getMyReviewData.map((review) => (
          <MyReviewItem key={review.id} {...review} />
        ))}
      </ul>
    </Layout>
  );
}

export async function getStaticProps(): Promise<{
  props: { getMyReviewData: IMyReview[] };
}> {
  try {
    const response = await axios.get<IMyReview[]>(
      'http://localhost:3000/api/myReviewData',
    );
    const { data } = response;
    return {
      props: {
        getMyReviewData: data,
      },
    };
  } catch (error) {
    console.error('myReviewData GET 실패', error);
    return {
      props: {
        getMyReviewData: [],
      },
    };
  }
}
