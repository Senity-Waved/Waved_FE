import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/common/Layout';
import IMyReview from '@/types/myReview';
import MyReviewItem from '@/components/profile/myreview/MyReviewItem';
import SnackBar from '@/components/common/SnackBar';
import EmptyView from '@/components/common/EmptyView';
import ISnackBarState from '@/types/snackbar';
import REVIEW_SNACKBAR_TEXT from '@/constants/reviewSnackBarText';
import Modal from '@/components/modal/Modal';

export default function MyReview({
  getMyReviews,
}: {
  getMyReviews: IMyReview[];
}) {
  const router = useRouter();
  const { query } = router;
  const [reviews, setReviews] = useState(getMyReviews);
  const [snackBarState, setSnackBarState] = useState<ISnackBarState>({
    open: false,
    text: '',
  });

  const deleteReview = (id: string) => {
    console.log(`삭제완료! ${id}`);
    setReviews(reviews.filter((review) => review.id !== id));
    setSnackBarState({
      open: true,
      text: REVIEW_SNACKBAR_TEXT.DELETE,
    });
    setTimeout(() => {
      setSnackBarState({
        open: false,
        text: '',
      });
    }, 3500);
  };

  useEffect(() => {
    const handleRouting = (
      snackBarText: string,
      snackBarType: 'correct' | 'warning' = 'correct',
    ): void => {
      setSnackBarState({
        open: true,
        text: snackBarText,
        type: snackBarType,
      });
      router
        .replace('/profile/myreview', undefined, { shallow: true })
        .catch((error: Error) =>
          console.error('쿼리스트링 제거 후 페이지 이동 실패', error),
        );
      setTimeout(() => {
        setSnackBarState({
          open: false,
          text: '',
        });
      }, 3500);
    };
    if (query.editReviewSuccess) {
      handleRouting(REVIEW_SNACKBAR_TEXT.EDIT);
    }
  }, [query, router]);

  return (
    <Layout headerText="나의 후기" title="나의 후기" noFooter>
      {reviews.length === 0 ? (
        <EmptyView pageType="내후기" />
      ) : (
        <ul>
          {reviews.map((review) => (
            <MyReviewItem
              key={review.id}
              {...review}
              onDelete={() => deleteReview(review.id)}
            />
          ))}
        </ul>
      )}
      {snackBarState.open && (
        <SnackBar
          text={snackBarState.text}
          type={snackBarState.type}
          noFooter
        />
      )}
      <Modal />
    </Layout>
  );
}

export async function getStaticProps(): Promise<{
  props: { getMyReviews: IMyReview[] };
}> {
  try {
    const response = await axios.get<IMyReview[]>('/api/myReviews');
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
