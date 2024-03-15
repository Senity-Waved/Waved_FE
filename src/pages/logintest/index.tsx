import { useState } from 'react';
import { IAuth } from '../api/auth/session';
import getCookieValue from '@/utils/cookie';

export default function LoginTest() {
  const [hasInfo, setHasInfo] = useState(false);

  console.log(getCookieValue('accessToken'));

  const handleLogin = () => {
    fetch('/api/auth/session', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data: IAuth) => {
        console.log(data);
        setHasInfo(data.hasInfo);
      })
      .catch((error) => console.error('Error:', error));
  };

  const handleReissue = () => {
    fetch('/api/auth/reissue', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <button type="button" onClick={handleLogin}>
        Login!!!
      </button>
      <button type="button" onClick={handleReissue}>
        액세스 토큰 재발급
      </button>
      <div>Has Info: {hasInfo ? 'Yes' : 'No'}</div>
    </div>
  );
}
