import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Layout from '@/components/common/Layout';
import TabMenu from '@/components/common/TabMenu';
import ChallengeSection from '@/components/mychallenge/ChallengeSection';
import ChallengeEmptyView from '@/components/mychallenge/ChallengeEmptyView';
import ISnackBarState from '@/types/snackbar';
import REVIEW_SNACKBAR_TEXT from '@/constants/reviewSnackBarText';
import SnackBar from '@/components/common/SnackBar';

export default function MyChallenge() {
  const router = useRouter();
  const { query } = router;
  const [snackBarState, setSnackBarState] = useState<ISnackBarState>({
    open: false,
    text: '',
  });
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
        .replace('/mychallenge', undefined, { shallow: true })
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
    if (query.postReviewSuccess) {
      handleRouting(REVIEW_SNACKBAR_TEXT.POST);
    }
  }, [query, router]);
  return (
    <Layout
      headerText="MY 챌린지"
      title="마이챌린지"
      description="나의 챌린지 내역을 확인해보세요."
    >
      <TabMenu
        tabs={[
          { href: '#processing', text: '진행 중' },
          { href: '#pending', text: '대기 중' },
          { href: '#completed', text: '진행 완료' },
        ]}
      />
      {/* data.length == 0 일때 EmptyView + 챌린지탐색 */}
      <ChallengeEmptyView />
      <ChallengeSection status="진행 중" scrollId="processing" />
      <ChallengeSection status="대기 중" scrollId="pending" />
      <ChallengeSection status="진행 완료" scrollId="completed" />
      {snackBarState.open && (
        <SnackBar text={snackBarState.text} type={snackBarState.type} />
      )}
    </Layout>
  );
}
