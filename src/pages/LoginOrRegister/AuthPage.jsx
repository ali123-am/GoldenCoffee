import { useContext, useEffect } from "react";
import Login from "../../components/AuthPageComponents/Login";
import { AuthFormContext } from "../../Context/AuthFormContext";
import OTPINput from "../../components/AuthPageComponents/OTPInput";
import { getCookie } from "./cookieUtils";
import { useLocation, useNavigate } from "react-router-dom";
import RegisterForm from "../../components/AuthPageComponents/RegisterForm";

export default function AuthPage() {
  const { step } = useContext(AuthFormContext);
  const navigate = useNavigate();
  const location = useLocation();

  // گرفتن مسیر مقصد
  const from = location.state?.from || "/";
  useEffect(() => {
    const userID = getCookie("userID");
    if (userID) navigate("/");
  }, [navigate]);
  return (
    <div
      className="min-h-screen flex flex-col gap-10 items-center justify-center bg-gradient-to-br
     from-blue-100/40 to-purple-100/50 dark:from-blue-950/70 dark:to-teal-950/80
      transition-colors duration-300 *:font-Dana"
    >
      <div
        className={`w-88 md:w-100 bg-white dark:bg- shadow-xl rounded-3xl
       border border-brown-600/10 dark:bg-[rgb(36,42,56,1)] py-8 px-7.5`}
      >
        {step === "verify" ? (
          <OTPINput from={from} />
        ) : step === "login" ? (
          <Login from={from} />
        ) : (
          <RegisterForm from={from} />
        )}
      </div>
      <p className="w-84 md:w-90 text-center dark:text-white">
        با عضویت در سایت، تمامی قوانین و شرایط استفاده از خدمات
        <span className="text-orange-800 dark:text-teal-500">
          {" "}
          گلد کافی{" "}
        </span>{" "}
        را پذیرفته اید.
      </p>
    </div>
  );
}
