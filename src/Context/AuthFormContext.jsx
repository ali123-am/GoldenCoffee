import {
  createContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import axios from "axios";
import { supabase } from "../supabaseClient";
import { useCounter } from "../Hooks/useCounter";
import { toast } from "sonner";
export const AuthFormContext = createContext();

export const AuthFormProvider = ({ children }) => {
  const { formattedTime, reset, isFinished } = useCounter(0);
  const [step, setStep] = useState(localStorage.getItem("step"));
  const [prevStep, setPrevStep] = useState(localStorage.getItem("prevStep"));
  const [email, setEmail] = useState(localStorage.getItem("auth_email"));
  const [emailRegister, setEmailRegister] = useState(
    localStorage.getItem("auth_email_register")
  );
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState(
    localStorage.getItem("auth_user_name")
  );
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const sendOtpToEmail = useCallback(
    async (email) => {
      let emailInLS = null;
      let cleanedEmail = null;
      if (step === "login") {
        emailInLS = localStorage.getItem("auth_email");
        cleanedEmail = email.trim();
      } else {
        emailInLS = localStorage.getItem("auth_email_register");
        cleanedEmail = email.trim();
      }
      const { data } = await supabase
        .from("Users")
        .select("*")
        .eq("email", cleanedEmail);

      if (!data || data.length === 0) {
        if (step === "login") {
          toast.error("آدرس ایمیل شما وجود ندارد");
          return false;
        }
      } else {
        if (step === "register") {
          toast.error("ایمیل وارد شده قبلا استفاده شده است");
          return false;
        }
      }
      if (cleanedEmail === emailInLS) {
        if (!isFinished) {
          toast.success(
            `از کد قبلی شما ${formattedTime} زمان باقی مانده میتوانید از همان استفاده کنید.`
          );
          if (step !== "verify") {
            setPrevStep(step);
            localStorage.setItem("prevStep", step);
          }
          setStep("verify");
          localStorage.setItem("step", "verify");
          return false;
        }
      }
      try {
        // const response = await axios.post(
        //   "https://learn.alirezaahmadi.info/api/v1/auth/email/login",
        //   { email: cleanedEmail },
        //   { headers: { "Content-Type": "application/json" } }
        // );

        // if (response.data.success === 1) {
        // const timestamp = Date.now();
        // localStorage.setItem("timestamp", JSON.stringify(timestamp));
        // if (step !== "verify") {
        //   setPrevStep(step);
        //   localStorage.setItem("prevStep", step);
        // }
        // localStorage.setItem("step", "verify");
        // setStep("verify");
        // reset(response.data.seconds);
        // toast.success("کد تایید برای ایمیل شما ارسال شد");
        // return true;
        // } else {
        //   toast.error("ارسال کد تایید با خطا مواجه شد");
        // }
        ////////////////
        toast.info(
          "مشکلی برای سرور ارسال کد پیش امده است  لطفا تا رفع مشکل با کد 123456 وارد حساب شوید یا ثبت نام کنید."
        );
        const timestamp = Date.now();
        localStorage.setItem("timestamp", JSON.stringify(timestamp));
        if (step !== "verify") {
          setPrevStep(step);
          localStorage.setItem("prevStep", step);
        }
        localStorage.setItem("step", "verify");
        setStep("verify");
        reset(120);
        return true;
        ///////////////////////
      } catch {
        toast.error(
          "مشکلی در ارسال کد تایید پیش آمده لطفا بعدا دوباره امتحان کنید."
        );
      }
    },
    [step, reset, isFinished, formattedTime]
  );
  const testExpierdCode = async () => {
    const timestamp = JSON.parse(localStorage.getItem("timestamp"));
    if (timestamp) {
      const elapsed = Date.now() - timestamp;
      const remaining = OTP_EXPIRE_TIME - elapsed;
      if (remaining > 0) {
        reset(Math.floor(remaining / 1000));
        return true;
      } else {
        localStorage.removeItem("timestamp");
        reset(0);
        localStorage.setItem("step", prevStep);
        return false;
      }
    }
  };
  const createNewUserInDB = useCallback(async () => {
    console.log(userName, password, emailRegister);
    const res = await supabase.from("Users").insert([
      {
        userName,
        password,
        email: emailRegister,
        productsPay: [],
        productsInBasket: [],
        isLogin: true,
      },
    ]);
    if (res.error) {
      toast.error("خطا در ثبت کاربر");
      return false;
    }
    toast.success("ثبت ‌نام با موفقیت انجام شد");
    return true;
  }, [userName, password, emailRegister]);

  const resetForm = useCallback(async (cleanMode = "hide") => {
    if (cleanMode === "hide") {
      setEmail("");
      setUserName("");
      setPassword("");
      setEmailRegister("");
    } else {
      localStorage.removeItem("auth_email");
      localStorage.removeItem("auth_email_register");
      localStorage.removeItem("timestamp");
      localStorage.removeItem("auth_user_name");
      localStorage.removeItem("auth_password");
      localStorage.setItem("step", "login");
      localStorage.setItem("prevStep", null);
    }
  }, []);

  const setInputValue = useCallback(() => {
    localStorage.setItem("auth_email", email);
    localStorage.setItem("auth_user_name", userName || "");
    localStorage.setItem("auth_password", password || "");
    localStorage.setItem("auth_email_register", emailRegister || "");
  }, [email, password, userName, emailRegister]);

  const OTP_EXPIRE_TIME = 2 * 60 * 1000;

  useEffect(() => {
    testExpierdCode();

    return () => resetForm("deleteAll");
  }, []);

  const contextValue = useMemo(
    () => ({
      setInputValue,
      step,
      setStep,
      email,
      setEmailRegister,
      emailRegister,
      setEmail,
      userName,
      setUserName,
      otp,
      setOtp,
      setPassword,
      password,
      sendOtpToEmail,
      resetForm,
      createNewUserInDB,
      setPrevStep,
      prevStep,
      reset,
      formattedTime,
      isFinished,
    }),
    [
      setInputValue,
      step,
      setStep,
      email,
      emailRegister,
      setEmailRegister,
      setEmail,
      userName,
      setUserName,
      otp,
      setOtp,
      setPassword,
      password,
      sendOtpToEmail,
      resetForm,
      createNewUserInDB,
      setPrevStep,
      prevStep,
      reset,
      formattedTime,
      isFinished,
    ]
  );
  return (
    <AuthFormContext.Provider value={contextValue}>
      {children}
    </AuthFormContext.Provider>
  );
};
