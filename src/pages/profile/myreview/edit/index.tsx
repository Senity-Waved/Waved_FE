import { useState } from 'react';
import { useRouter } from 'next/router';
import { useMutation } from '@tanstack/react-query';
import { GetServerSidePropsContext } from 'next';
import Layout from '@/components/common/Layout';
import WriteLayout from '@/components/common/WriteLayout';
import TextArea from '@/components/common/TextArea';
import writeLayoutText from '@/constants/writeLayoutText';
import {
  getPreviousReviewContentApi,
  patchReviewApi,
} from '@/lib/axios/review/api';
import createServerInstance from '@/lib/axios/serverInstance';

export default function EditReview({ prevContent }: { prevContent: string }) {
  const router = useRouter();
  const reviewId = router.query.reviewId as string;
  const { placeholder } = writeLayoutText['후기수정'];
  const [text, setText] = useState<string>(prevContent);

  const { mutate: patchReview } = useMutation(
    (newContent: string) => patchReviewApi(reviewId, newContent),
    {
      onSuccess: () => {
        router
          .replace({
            pathname: '/profile/myreview',
            query: {
              editReviewSuccess: true,
            },
          })
          .catch((error) => console.error('페이지 이동 실패', error));
      },
      onError: (error) => {
        console.error('리뷰 수정 실패', error);
      },
    },
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    patchReview(text);
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
    </Layout>
  );
}

export async function getServerSideProps(
  context: GetServerSidePropsContext,
): Promise<{
  props: {
    prevContent: string;
  };
}> {
  const { reviewId } = context.query as { reviewId: string };
  const serverInstance = createServerInstance(context);
  let prevContent = '';
  try {
    const response = await getPreviousReviewContentApi(
      serverInstance,
      reviewId,
    );
    prevContent = response.data;
  } catch (error) {
    console.error('이전 리뷰 데이터 가져오기 실패', error);
  }
  return {
    props: {
      prevContent,
    },
  };
}
