import { css } from '@emotion/react';

const global = css`
  :root {
    --font-family: sans-serif;
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
  }

  html {
    font-size: 14px;
  }

  body {
    font-family: var(--font-family);
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
