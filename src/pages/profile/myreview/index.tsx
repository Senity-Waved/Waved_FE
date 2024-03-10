import axios from 'axios';
import { useState } from 'react';
import Layout from '@/components/common/Layout';
import IMyReview from '@/types/myReview';
import MyReviewItem from '@/components/profile/myreview/MyReviewItem';
import SnackBar from '@/components/common/SnackBar';

export default function MyReview({
  getMyReviews,
}: {
  getMyReviews: IMyReview[];
}) {
  const [reviews, setReviews] = useState(getMyReviews);
  const [isSnackBarVisible, setIsSnackBarVisible] = useState(false);
  const deleteReview = (id: string) => {
    setReviews(reviews.filter((review) => review.id !== id));
    setIsSnackBarVisible(true);
    setTimeout(() => setIsSnackBarVisible(false), 3500);
  };
  return (
    <Layout headerText="나의 후기" title="나의 후기" noFooter>
      <ul>
        {reviews.map((review) => (
          <MyReviewItem
            key={review.id}
            {...review}
            onDelete={() => deleteReview(review.id)}
          />
        ))}
      </ul>
      {isSnackBarVisible && <SnackBar text="후기가 삭제되었습니다." noFooter />}
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
