import userLogin from '@/utils/userLogin';

export default function LoginTest() {
  return (
    <div>
      <button type="button" onClick={userLogin}>
        Login!!!
      </button>
    </div>
  );
}
