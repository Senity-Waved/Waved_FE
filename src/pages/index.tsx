import HeadMeta from '@/components/HeadMeta';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';

export default function Home() {
  return (
    <>
      <HeadMeta />
      <h1 className="a11yHidden">WAVED</h1>
      <Header headerText="Title" rightText="인증패스" />
      <main id="home">
        <p>Home</p>
      </main>
      <Footer />
    </>
  );
}
