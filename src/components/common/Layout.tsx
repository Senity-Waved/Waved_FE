import Head from 'next/head';
import styled from '@emotion/styled';
import media from '@/styles/media';
import screenSize from '@/constants/screenSize';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';

interface ILayout {
  children: React.ReactNode;
  headerText?: string;
  rightText?: string;
  title?: string;
  description?: string;
  noFooter?: boolean;
  noHeader?: boolean;
  withBottomFixedBtn?: boolean;
  rightOnClick?: () => void;
  isLogined?: boolean;
}

export default function Layout({
  children,
  headerText,
  rightText,
  title,
  description,
  noFooter,
  noHeader,
  withBottomFixedBtn,
  rightOnClick,
  isLogined,
}: ILayout) {
  return (
    <SLayoutWrapper
      noHeader={noHeader}
      noFooter={noFooter}
      withBottomFixedBtn={withBottomFixedBtn}
    >
      <Head>
        <title>{title ? `WAVED | ${title}` : 'WAVED'}</title>
        <meta
          name="description"
          content={description || 'Waved 챌린지 서비스입니다.'}
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className="a11yHidden">WAVED</h1>
      {noHeader || (
        <Header
          headerText={headerText}
          rightText={rightText}
          rightOnClick={rightOnClick}
        />
      )}
      <main>{children}</main>
      {noFooter || <Footer isLogined={isLogined !== undefined && isLogined} />}
    </SLayoutWrapper>
  );
}

export const SLayoutWrapper = styled.div<{
  noHeader?: boolean;
  noFooter?: boolean;
  withBottomFixedBtn?: boolean;
}>`
  width: ${screenSize.max}px;
  height: auto;
  min-height: 100dvh;
  margin: 0 auto;
  background-color: #fff;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  ${media.mobileMax} {
    width: 100vw;
  }
  main {
    margin-top: ${({ noHeader }) => (noHeader ? '0' : '3.5rem')};
    margin-bottom: ${({ noFooter, withBottomFixedBtn }) => {
      if (withBottomFixedBtn) return '7.125rem';
      if (noFooter) return '0';
      return '5.6875rem';
    }};
  }
`;
