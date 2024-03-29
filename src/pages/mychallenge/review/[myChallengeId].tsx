import { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/common/Layout';
import WriteLayout from '@/components/common/WriteLayout';
import writeLayoutText from '@/constants/writeLayoutText';
import TextArea from '@/components/common/TextArea';
import { postReviewApi } from '@/lib/axios/review/api';
import useSnackBar from '@/hooks/useSnackBar';
import SnackBar from '@/components/common/SnackBar';

export default function PostReview() {
  const router = useRouter();
  const myChallengeId = router.query.myChallengeId as string;
  const { snackBarData, openSnackBar } = useSnackBar();
  const { placeholder } = writeLayoutText['후기작성'];
  const [text, setText] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    postReviewApi(myChallengeId, text)
      .then((response) => {
        if (response) {
          router
            .push({
              pathname: '/mychallenge',
              query: {
                postReviewSuccess: true,
              },
            })
            .catch((error) => {
              console.error('페이지 에러 이동 실패', error);
            });
        }
      })
      .catch((error) => {
        console.error(`${myChallengeId}의 후기 작성 실패`, error);
        openSnackBar('후기 작성을 실패했습니다.');
      });
  };

  return (
    <Layout
      headerText="후기 작성"
      title="후기 작성"
      description="챌린지 완료 후 후기를 작성하는 페이지입니다."
      noFooter
    >
      <WriteLayout pageType="후기작성" handleSubmit={handleSubmit} text={text}>
        <TextArea placeholder={placeholder} text={text} setText={setText} />
      </WriteLayout>
      {snackBarData.open && (
        <SnackBar text={snackBarData.text} type={snackBarData.type} noFooter />
      )}
    </Layout>
  );
}
