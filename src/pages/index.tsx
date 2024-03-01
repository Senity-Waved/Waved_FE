import Head from 'next/head';
import Header from '@/components/common/Header';
import TabMenu from '@/components/common/TabMenu';
import Btn from '@/components/common/Btn';
import BottomFixedBtn from '@/components/common/BottomFixedBtn';
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
        <TabMenu
          tabs={[
            { href: '/', text: '메뉴1' },
            { href: '/menu2', text: '메뉴2' },
            { href: '/menu3', text: '메뉴3' },
          ]}
        />
        <Btn
          btns={[
            {
              text: '버튼1',
              styleType: 'primary',
              size: 'large',
            },
            {
              type: 'submit',
              text: '버튼2',
              isDisabled: true,
              styleType: 'gray',
              size: 'large',
            },
            {
              text: '버튼3',
              styleType: 'primary',
              size: 'small',
            },
          ]}
        />
        <BottomFixedBtn
          btns={[
            {
              text: '화면 하단 고정 버튼',
              styleType: 'primary',
              size: 'large',
            },
          ]}
        />
        <Footer />
      </main>
    </>
  );
}
