import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function OauthTest() {
  const [accessToken, setAccessToken] = useState<string | null>('');
  const [refreshToken, setRefreshToken] = useState<string | null>('');
  const [hasInfo, setHasInfo] = useState<boolean | null>(null);

  const router = useRouter();
  useEffect(() => {
    const url = window.location.search;
    const urlParams = new URLSearchParams(url);
    const accessTokenParam = urlParams.get('accessToken');
    const refreshTokenParam = urlParams.get('refreshToken');
    const hasInfoParam = urlParams.get('hasInfo');

    const hasInfoBoolean =
      // eslint-disable-next-line no-nested-ternary
      hasInfoParam === 'true' ? true : hasInfoParam === 'false' ? false : null;

    if (accessTokenParam !== null) {
      setAccessToken(accessTokenParam);
    }
    if (refreshTokenParam !== null) {
      setRefreshToken(refreshTokenParam);
    }
    if (hasInfoParam !== null) {
      setHasInfo(hasInfoBoolean);
    }
  }, []);

  useEffect(() => {
    if (accessToken && refreshToken && !hasInfo) {
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      router.push('/register').catch((error) => {
        console.error('페이지 이동에 실패하였습니다.', error);
      });
    }
  }, [accessToken, hasInfo, refreshToken, router]);

  console.log(accessToken, refreshToken, hasInfo);
  return <div>oauth</div>;
}
