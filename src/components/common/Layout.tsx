import Head from 'next/head';
import styled from '@emotion/styled';
import media from '@/styles/media';
import screenSize from '@/constants/screenSize';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';

interface ILayout {
  children: React.ReactNode;
  headerText: string;
  rightText?: string;
  title?: string;
  description?: string;
  noFooter?: boolean;
}

export default function Layout({
  children,
  headerText,
  rightText,
  title,
  description,
  noFooter,
}: ILayout) {
  return (
    <SLayoutWrapper>
      <Head>
        <title>{title ? `WAVED | ${title}` : 'WAVED'}</title>
        <meta
          name="description"
          content={description || 'Waved 챌린지 서비스'}
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className="a11yHidden">WAVED</h1>
      <Header headerText={headerText} rightText={rightText} />
      <main>{children}</main>
      {noFooter || <Footer />}
    </SLayoutWrapper>
  );
}

export const SLayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: ${screenSize.max}px;
  height: 100vh;
  margin: 0 auto;
  background-color: #fff;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  @supports (-webkit-touch-callout: none) {
    height: -webkit-fill-available;
  }
  ${media.mobileMax} {
    width: 100vw;
  }
`;
