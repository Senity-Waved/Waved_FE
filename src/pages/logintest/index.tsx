export default function LoginTest() {
  const handleLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_BASE_URL}/oauth2/authorization/google`;
  };

  return (
    <div>
      <button type="button" onClick={handleLogin}>
        Login!!!
      </button>
    </div>
  );
}
