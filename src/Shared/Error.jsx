import { NavLink } from "react-router-dom";
import error from "../assets/error.png";
const Error = () => {
  return (
    <div className="container mx-auto bg-white montserrat ">
      <NavLink
        to="/"
        className="absolute flex items-center gap-2 text-xl text-green-900 top-5 left-5"
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
        </svg>{" "}
        Back To Home
      </NavLink>
      <div className="container flex items-center justify-center w-2/3 p-4 mx-auto mt-28 ">
        <img src={error} alt="404 error" />
      </div>
    </div>
  );
};

export default Error;
