import Head from 'next/head';
import Header from '@/components/common/Header';
import TabMenu from '@/components/common/TabMenu';
import Btn from '@/components/common/Btn';
import BottomFixedBtn from '@/components/common/BottomFixedBtn';
import Footer from '@/components/common/Footer';
import color from '@/constants/color';

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
        <Header />
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
              type: 'button',
              text: '버튼1',
              isAble: true,
              backgroundColor: `${color.NORMAL}`,
              fontColor: `${color.WHITE}`,
              size: 'large',
            },
            {
              type: 'submit',
              text: '버튼2',
              isAble: false,
              backgroundColor: `${color.GRAYDE}`,
              fontColor: `${color.BLACK}`,
              size: 'large',
            },
          ]}
        />
        <BottomFixedBtn
          btns={[
            {
              type: 'button',
              text: '화면 하단 고정 버튼',
              isAble: true,
              backgroundColor: `${color.NORMAL}`,
              fontColor: `${color.WHITE}`,
              size: 'large',
            },
          ]}
        />
        <Footer />
      </main>
    </>
  );
}
