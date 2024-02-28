import Head from 'next/head';
import TestBtn from '@/components/TestBtn';

export default function Home() {
  return (
    <>
      <Head>
        <title>Waved</title>
        <meta name="description" content="Waved 챌린지 서비스" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>Waved</h1>
        <TestBtn message="Test Button" />
      </main>
    </>
  );
}
