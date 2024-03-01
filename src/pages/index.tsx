import Head from 'next/head';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import ModalTest from '@/components/modal/ModalTest';

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
        <Header headerText="Title" rightText="인증패스" />
        <ModalTest />
        <Footer />
      </main>
    </>
  );
}
