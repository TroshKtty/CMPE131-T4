export default function GoogleLoginButton() {
  const handleGoogleLogin = () => {
    // Implement Google login logic here, e.g., using Google API
    console.log("Google login triggered");
  };

  return (
    <button className="google-login-button" onClick={handleGoogleLogin}>
      Log in with Google
    </button>
  );
}
