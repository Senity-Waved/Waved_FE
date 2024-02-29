import { css } from '@emotion/react';

const global = css`
  /*
  Copyright (c) 2021 Kil Hyung-jin, with Reserved Font Name Pretendard.
  https://github.com/orioncactus/pretendard

  This Font Software is licensed under the SIL Open Font License, Version 1.1.
  This license is copied below, and is also available with a FAQ at:
  http://scripts.sil.org/OFL
  */

  @font-face {
    font-family: 'Pretendard';
    font-weight: 900;
    font-display: swap;
    src:
      local('Pretendard Black'),
      url(./woff2/Pretendard-Black.woff2) format('woff2'),
      url(./woff/Pretendard-Black.woff) format('woff');
  }

  @font-face {
    font-family: 'Pretendard';
    font-weight: 800;
    font-display: swap;
    src:
      local('Pretendard ExtraBold'),
      url(./woff2/Pretendard-ExtraBold.woff2) format('woff2'),
      url(./woff/Pretendard-ExtraBold.woff) format('woff');
  }

  @font-face {
    font-family: 'Pretendard';
    font-weight: 700;
    font-display: swap;
    src:
      local('Pretendard Bold'),
      url(./woff2/Pretendard-Bold.woff2) format('woff2'),
      url(./woff/Pretendard-Bold.woff) format('woff');
  }

  @font-face {
    font-family: 'Pretendard';
    font-weight: 600;
    font-display: swap;
    src:
      local('Pretendard SemiBold'),
      url(./woff2/Pretendard-SemiBold.woff2) format('woff2'),
      url(./woff/Pretendard-SemiBold.woff) format('woff');
  }

  @font-face {
    font-family: 'Pretendard';
    font-weight: 500;
    font-display: swap;
    src:
      local('Pretendard Medium'),
      url(./woff2/Pretendard-Medium.woff2) format('woff2'),
      url(./woff/Pretendard-Medium.woff) format('woff');
  }

  @font-face {
    font-family: 'Pretendard';
    font-display: swap;
    src:
      local('Pretendard Regular'),
      url(./woff2/Pretendard-Regular.woff2) format('woff2'),
      url(./woff/Pretendard-Regular.woff) format('woff');
  }

  @font-face {
    font-family: 'Pretendard';
    font-weight: 300;
    font-display: swap;
    src:
      local('Pretendard Light'),
      url(./woff2/Pretendard-Light.woff2) format('woff2'),
      url(./woff/Pretendard-Light.woff) format('woff');
  }

  @font-face {
    font-family: 'Pretendard';
    font-weight: 200;
    font-display: swap;
    src:
      local('Pretendard ExtraLight'),
      url(./woff2/Pretendard-ExtraLight.woff2) format('woff2'),
      url(./woff/Pretendard-ExtraLight.woff) format('woff');
  }

  @font-face {
    font-family: 'Pretendard';
    font-weight: 100;
    font-display: swap;
    src:
      local('Pretendard Thin'),
      url(./woff2/Pretendard-Thin.woff2) format('woff2'),
      url(./woff/Pretendard-Thin.woff) format('woff');
  }

  :root {
    --font-family: 'Pretendard', sans-serif;
  }

  html,
  body,
  div,
  span,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  a,
  img,
  strong,
  b,
  i,
  dl,
  dt,
  dd,
  ol,
  ul,
  li,
  fieldset,
  form,
  label,
  legend,
  table,
  caption,
  tbody,
  tfoot,
  thead,
  tr,
  th,
  td,
  article,
  aside,
  figure,
  figcaption,
  footer,
  header,
  menu,
  nav,
  section,
  time {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }

  * {
    scroll-behavior: smooth;
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    font-family: var(--font-family);
  }

  html {
    background-color: #f1f1f1;
    font-size: 14px;
  }

  body {
    display: flex;
    justify-content: center;
    font-family: var(--font-family);
  }

  main {
    position: relative;
    min-width: 375px;
    max-width: 430px;
    height: 100vh;
    background-color: #fff;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  ul,
  ol {
    list-style: none;
  }

  button {
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
  }

  .a11yHidden,
  lengnd {
    display: inline-block;
    overflow: hidden;
    clip: rect(0px, 0px, 0px, 0px);
    clip-path: inset(50%);
    width: 1px;
    height: 1px;
    margin: -1px;
    position: absolute !important;
  }
`;

export default global;
