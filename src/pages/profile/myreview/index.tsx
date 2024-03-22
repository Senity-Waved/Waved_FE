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

const getMyReviews: IMyReview[] = [
  {
    id: '2634637',
    challengeTitle: '프론트엔드 기술 면접 1기',
    createdDate: '2024년 03월 10일',
    context:
      '피그마 플러그인 개발에 관심이 생겨서 찾아보게 되었는데,많은 도움이 되네요.',
  },
  {
    id: '43436',
    challengeTitle: '1일 1커밋',
    createdDate: '2024년 02월 22일',
    context:
      '피그마 플러그인 개발에 관심이 생겨서 찾아보게 되었는데,많은 도움이 되네요.피그마 플러그인 개발에 관심이 생겨서 찾아보게 되었는데,많은 도움이 되네요.피그마 플러그인 개발에 관심이 생겨서 찾아보게 되었는데,많은 도움이 되네요.피그마 플러그인 개발에 관심이 생겨서 찾아보게 되었는데,많은 도움이 되네요.',
  },
  {
    id: '163636',
    challengeTitle: '1일 1커밋',
    createdDate: '2024년 02월 22일',
    context:
      '피그마 플러그인 개발에 관심이 생겨서 찾아보게 되었는데,많은 도움이 되네요.피그마 플러그인 개발에 관심이 생겨서 찾아보게 되었는데,많은 도움이 되네요.피그마 플러그인 개발에 관심이 생겨서 찾아보게 되었는데,많은 도움이 되네요.피그마 플러그인 개발에 관심이 생겨서 찾아보게 되었는데,많은 도움이 되네요.',
  },
  {
    id: '264532',
    challengeTitle: '1일 1커밋',
    createdDate: '2024년 02월 22일',
    context:
      '피그마 플러그인 개발에 관심이 생겨서 찾아보게 되었는데,많은 도움이 되네요.피그마 플러그인 개발에 관심이 생겨서 찾아보게 되었는데,많은 도움이 되네요.피그마 플러그인 개발에 관심이 생겨서 찾아보게 되었는데,많은 도움이 되네요.피그마 플러그인 개발에 관심이 생겨서 찾아보게 되었는데,많은 도움이 되네요.',
  },
];

export default function MyReview() {
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
