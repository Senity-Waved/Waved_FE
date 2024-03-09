import { useState } from 'react';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import Layout from '@/components/common/Layout';
import { IGithub } from '@/types/github';
import BottomFixedBtn from '@/components/common/BottomFixedBtn';

export default function MyGithub() {
  const [githubData, setGithubData] = useState<IGithub>({
    githubId: 'hello_world',
    githubToken: '12345678',
  });
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(`깃허브 연동: ${JSON.stringify(githubData)}`);
    router.push('/profile').catch((error) => {
      console.error('페이지 이동에 실패하였습니다.', error);
    });
  };
  return (
    <Layout
      noFooter
      headerText="깃허브 연동 관리"
      title="깃허브 연동 관리"
      description="깃허브 아이디와 토큰을 입력하여, 깃허브 연동을 할 수 있는 페이지입니다. 연동 혹은 해지가 가능합니다."
    >
      <SMyGithubWrapper>
        <h2 className="a11yHidden">깃허브 연동 관리</h2>
        <p>해당 연동은 &#34;1일 1커밋&#34; 챌린지 참여자에게 필수입니다.</p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="githubIdInput">아이디</label>
          <input
            type="text"
            id="githubIdInput"
            name="githubId"
            value={githubData.githubId}
            onChange={(e) =>
              setGithubData({ ...githubData, githubId: e.target.value })
            }
          />
          <label htmlFor="githubTokenInput">토큰</label>
          <input
            type="text"
            id="githubTokenInput"
            name="githubToken"
            value={githubData.githubToken}
            onChange={(e) =>
              setGithubData({ ...githubData, githubToken: e.target.value })
            }
          />
          <BottomFixedBtn
            btns={[
              {
                text: '연동하기',
                styleType: 'primary',
                size: 'large',
                type: 'submit',
              },
            ]}
          />
        </form>
      </SMyGithubWrapper>
    </Layout>
  );
}

const SMyGithubWrapper = styled.div``;
