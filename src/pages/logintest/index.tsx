export default function LoginTest() {
  const handleLogin = () => {
    window.location.href =
      'https://waved.azurewebsites.net/oauth2/authorization/google';
  };

  return (
    <div>
      <button type="button" onClick={handleLogin}>
        Login!!!
      </button>
    </div>
  );
}
