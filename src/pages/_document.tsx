import { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';
import color from '@/constants/color';

export default function Document() {
  return (
    <Html lang="ko">
      <Head>
        <meta name="theme-color" content={color.NORMAL} />
        <meta name="msapplication-TileColor" content={color.NORMAL} />
        <meta
          name="msapplication-TileImage"
          content="/app-assets/logo/144.png"
        />
        <link rel="apple-touch-icon" href="/app-assets/logo/192.png" />
        <link rel="apple-touch-icon" href="/app-assets/logo/512.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.ico" />
        <link
          href="/app-assets/splashscreens/iphone5_splash.png"
          media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)"
          rel="apple-touch-startup-image"
        />
        <link
          href="/app-assets/splashscreens/iphone6_splash.png"
          media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)"
          rel="apple-touch-startup-image"
        />
        <link
          href="/app-assets/splashscreens/iphoneplus_splash.png"
          media="(device-width: 621px) and (device-height: 1104px) and (-webkit-device-pixel-ratio: 3)"
          rel="apple-touch-startup-image"
        />
        <link
          href="/app-assets/splashscreens/iphonex_splash.png"
          media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)"
          rel="apple-touch-startup-image"
        />
        <link
          href="/app-assets/splashscreens/iphonexr_splash.png"
          media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2)"
          rel="apple-touch-startup-image"
        />
        <link
          href="/app-assets/splashscreens/iphonexsmax_splash.png"
          media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3)"
          rel="apple-touch-startup-image"
        />
        <Script
          src="https://cdn.iamport.kr/v1/iamport.js"
          strategy="beforeInteractive"
        />
      </Head>
      <body>
        <Main />
        <div id="_modal" />
        <NextScript />
      </body>
    </Html>
  );
}
