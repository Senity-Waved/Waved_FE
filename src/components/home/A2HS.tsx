import { useEffect, useState } from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
}

const useA2HS = () => {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handler = (e: Event) => {
      e.preventDefault();
      if ('prompt' in e && 'userChoice' in e) {
        setDeferredPrompt(e as BeforeInstallPromptEvent);
      }
    };
    // beforeinstallprompt에 이벤트 핸들러를 등록합니다.
    window.addEventListener('beforeinstallprompt', handler);
    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const installApp = async () => {
    // 설치 메서드 실행
    if (deferredPrompt) {
      try {
        await deferredPrompt.prompt();
        clearPrompt();
      } catch (error) {
        console.error('홈 화면 추가 실패', error);
      }
    }
  };

  const clearPrompt = () => {
    setDeferredPrompt(null);
  };

  return { deferredPrompt, installApp, clearPrompt };
};

export default function A2HS() {
  const { deferredPrompt, installApp, clearPrompt } = useA2HS();

  return deferredPrompt ? (
    <div>
      <button type="button" onClick={clearPrompt}>
        취소
      </button>
      <button type="button" onClick={() => installApp}>
        홈 화면에 추가
      </button>
    </div>
  ) : null;
}
