/* eslint-disable react/require-default-props */
import Head from 'next/head';

interface IHeadMeta {
  title?: string;
  description?: string;
}

export default function HeadMeta({ title, description }: IHeadMeta) {
  return (
    <Head>
      <title>{title ? `WAVED | ${title}` : 'WAVED'}</title>
      <meta name="description" content={description || 'Waved 챌린지 서비스'} />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, viewport-fit=cover"
      />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
}
