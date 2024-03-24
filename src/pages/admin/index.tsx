import styled from '@emotion/styled';
import Head from 'next/head';
import { SLayoutWrapper } from '@/components/common/Layout';

export default function AdminPage() {
  return (
    <SAdminPageWrapper>
      <Head>
        <title>WAVED | 관리자 페이지</title>
        <meta name="description" content="관리자 페이지" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className="a11yHidden">WAVED</h1>
      <main>
        <h2>관리자 페이지</h2>
        <div>
          <h3>진행중인 챌린지</h3>
          <div>
            <p>test</p>
          </div>
        </div>
      </main>
    </SAdminPageWrapper>
  );
}

const SAdminPageWrapper = styled(SLayoutWrapper)`
  display: flex;
  & main {
    display: flex;
    flex-flow: column nowrap;
  }
`;
