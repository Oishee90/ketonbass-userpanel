import { Navigate, NavLink } from "react-router-dom";
import logo from "../../assets/logo.png";
import google from "../../assets/google.png";
import image from "../../assets/ketonregister.png";
import { useEffect } from "react";
import { userLoggedIn } from "../../Redux/feature/auth/authSlice";
import { useDispatch } from "react-redux";

export default function SignUpPage() {
  const dispatch = useDispatch();
  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data?.type === "GOOGLE_AUTH_SUCCESS") {
        const data = event.data.payload;
        dispatch(
          userLoggedIn({
            user: {
              name: data.name,
              email: data.email,
              profile_picture: data.profile_picture,
            },
            accessToken: data.access_token,
            refreshToken: data.refresh_token,
          })
        );

        Navigate("/dashboard");
      }
    };

    window.addEventListener("message", handleMessage);

    return () => window.removeEventListener("message", handleMessage);
  }, []);

  const handleGoogleLogin = () => {
    const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    const REDIRECT_URI =
      "https://3ed269d4afe9.ngrok-free.app/google-auth/google/callback/";
    const scope = [
      "openid",
      "email",
      "profile",
      "https://www.googleapis.com/auth/gmail.readonly",
      "https://www.googleapis.com/auth/calendar",
    ].join(" ");

    const authUrl =
      `https://accounts.google.com/o/oauth2/v2/auth?` +
      `client_id=${GOOGLE_CLIENT_ID}` +
      `&redirect_uri=${REDIRECT_URI}` +
      `&response_type=code` +
      `&scope=${encodeURIComponent(scope)}` +
      `&prompt=consent&access_type=offline`;

    window.open(authUrl, "googleLoginPopup", "width=500,height=600");
  };

  return (
    <div className="flex flex-col items-center justify-between h-full 2xl:flex-row 2xl:h-screen">
      {/* Back Button */}
      <NavLink
        to="/"
        className="absolute top-5 left-5 text-3xl text-[#1F762C] hover:text-green-800"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-8 h-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
      </NavLink>

      {/* Left Form Section */}
      <div className="w-full max-w-3xl bg-gradient-to-b from-[#F5FFF9] to-[#E3FFED] rounded-lg p-[6rem] mx-auto">
        {/* Logo and Title */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <img src={logo} alt="Logo" />
          </div>
          <p className="text-[#1C6A28] text-2xl font-semibold poppins">
            Create your account
          </p>
        </div>

        {/* Google Login Button */}
        <div className="mb-6 space-y-4">
          <button
            onClick={handleGoogleLogin}
            className="flex items-center justify-center w-full gap-4 px-5 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            <span className="text-[#979797] text-base poppins">
              Login with Google
            </span>
            <img src={google} alt="Google" />
          </button>
        </div>
      </div>

      {/* Right Image Section */}
      <div className="w-full 2xl:w-1/2 2xl:h-screen">
        <img
          src={image}
          alt="Signup visual"
          className="object-cover w-full h-full"
        />
      </div>
    </div>
  );
}
