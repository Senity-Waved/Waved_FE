import styled from '@emotion/styled';
// import SnackBar from '@/components/common/SnackBar';

export default function ShareBtn() {
  // const [isSnackBarVisible, setIsSnackBarVisible] = useState(false);
  const copyUrl = () => {
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl).then(
      () => {
        console.log('URL 복사 성공');
        // setIsSnackBarVisible(true);
        // setTimeout(() => setIsSnackBarVisible(false), 3500);
      },
      (error) => {
        console.error('URL 복사 실패', error);
      },
    );
  };

  return (
    <>
      <SShareBtn
        type="button"
        onClick={copyUrl}
        aria-label="현재 페이지 URL 복사하기"
      />
      {/* {isSnackBarVisible && <SnackBar text="URL을 클립보드에 복사했습니다." />} */}
    </>
  );
}

const SShareBtn = styled.button`
  position: absolute;
  right: 0;
  margin-right: 1.25rem;
  display: inline-block;
  width: 24px;
  height: 24px;
  background: url('/icons/icon-share.svg') no-repeat center;
`;
