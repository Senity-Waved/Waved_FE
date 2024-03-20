export default function LoginTest() {
  const handleLogin = () => {
    window.location.href = 'http://127.0.0.1:9000/oauth2/authorization/google';
  };

  return (
    <div>
      <button type="button" onClick={handleLogin}>
        Login!!!
      </button>
    </div>
  );
}
