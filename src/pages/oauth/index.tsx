import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { getCookie } from 'cookies-next';
import LoadingSpinner from '@/components/common/LoadingSpinner';

export default function Oauth() {
  const [accessToken, setAccessToken] = useState<string | null>('');
  const [refreshToken, setRefreshToken] = useState<string | null>('');
  const [hasInfo, setHasInfo] = useState<boolean | null>(null);
  const [isTokenPosted, setIsTokenPosted] = useState<boolean>(false);
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
          if (res.status === 200) {
            setIsTokenPosted(true);
          }
        })
        .catch((error) => {
          console.error('로그인 성공 후 토큰 저장 실패', error);
        });
    }
  }, [accessToken, refreshToken]);

  useEffect(() => {
    const cookieAccessToken = getCookie('accessToken');

    if (
      (isTokenPosted && typeof hasInfo === 'boolean') ||
      (cookieAccessToken && typeof hasInfo === 'boolean')
    ) {
      router.push(hasInfo ? '/home' : '/register').catch(console.error);
    }
  }, [hasInfo, router, accessToken, isTokenPosted]);

  return <LoadingSpinner />;
}
