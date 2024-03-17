import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';

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
    if (accessToken && refreshToken) {
      axios
        .post('/api/auth/session', {
          accessToken,
          refreshToken,
        })
        .then((res) => {
          console.log(res.data);
        })
        .catch((error) => {
          console.error('서버에 토큰 전달 실패', error);
        });
    }
  }, [accessToken, refreshToken]);

  useEffect(() => {
    if (accessToken && typeof hasInfo === 'boolean') {
      router
        .push(hasInfo ? '/' : '/register')
        .catch((error) => console.error(error));
    }
  }, [hasInfo, router, accessToken]);

  return <div>oauth</div>;
}
