import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthFormContext } from "../../Context/AuthFormContext";
import { ArrowLeftCircleIcon } from "@heroicons/react/24/outline";
import { UserInfoContext } from "./../../Context/UserInfoContext";
import { useContextSelector } from "use-context-selector";
import { useRef, useState, useContext, useId, useEffect } from "react";
import { toast } from "sonner";

export default function OTPInput({ from }) {
  const [opt, setOtp] = useState(["", "", "", "", "", ""]);
  const inputsRef = useRef([]);
  const uuid = useId();

  const handleVerify = async () => {
    // مثلا OTP درست وارد شد
    // userID در کوکی ذخیره شد
    navigate(from, { replace: true });
  };

  const {
    prevStep,
    setPrevStep,
    setStep,
    email,
    emailRegister,
    resetForm,
    createNewUserInDB,
    isFinished,
    formattedTime,
    sendOtpToEmail,
  } = useContext(AuthFormContext);

  const mutationForLogin = useContextSelector(
    UserInfoContext,
    (ctx) => ctx.mutationForLogin
  );
  const setUserIdFromEmail = useContextSelector(
    UserInfoContext,
    (ctx) => ctx.setUserIdFromEmail
  );
  const [isAhtenticate, setIsAhtenticate] = useState(false);
  const navigate = useNavigate();
  const handleChangevalue = (e, index) => {
    const value = e.target.value;
    if (!/^\d?$/.test(value)) return;
    const newArry = [...opt];

    newArry[index] = value;
    setOtp(newArry);

    if (value && index >= 0 && index < 5) {
      inputsRef.current[index + 1].focus();
    }
    if (newArry.every((val) => val !== "")) {
      onSubmit(e, Number(newArry.join("")));
    }
  };

  const onSubmit = async (e, codeOpt) => {
    e.preventDefault();
    if (isFinished) {
      toast.error(
        "کد تایید ارسال شده منقضی شده است، لطفا روی دکمه ارسال دوباره کلیک کنید."
      );
      return false;
    }

    console.log(codeOpt);
    try {
      let emailIn = null;
      setIsAhtenticate(true);
      if (prevStep === "login")
        emailIn = email || localStorage.getItem("auth_email");
      else
        emailIn = emailRegister || localStorage.getItem("auth_email_register");
      // console.log(emailIn);
      // const res = await axios.post(
      //   "https://learn.alirezaahmadi.info/api/v1/auth/email/login/verify",
      //   {
      //     email: emailIn,
      //     code: codeOpt,
      //     "app-device-uid": uuid,
      //   },
      //   { headers: { "Content-Type": "application/json" } }
      // );
      // if (res.data.message === "Success") {
      //   if (prevStep === "register") {
      //     const addUser = await createNewUserInDB();
      //     console.log("adduser : ", addUser);
      //     if (addUser) {
      //       await setUserIdFromEmail(emailIn);
      //       localStorage.setItem("step", "login");
      //       handleVerify()
      //     }
      //   } else {
      //     await setUserIdFromEmail(emailIn);
      //     mutationForLogin.mutate({ situation: true });
      //     toast.success("ورود با موفقیت انجام شد");
      //     handleVerify()
      //   }
      // }
      if (codeOpt === 123456) {
        if (prevStep === "register") {
          const addUser = await createNewUserInDB();
          console.log("adduser : ", addUser);
          if (addUser) {
            await setUserIdFromEmail(emailIn);
            localStorage.setItem("step", "login");
            handleVerify();
          }
        } else {
          await setUserIdFromEmail(emailIn);
          mutationForLogin.mutate({ situation: true });
          toast.success("ورود با موفقیت انجام شد");
          handleVerify();
        }
      } else {
        throw new Error();
      }
    } catch {
      setIsAhtenticate(false);
      toast.error("کد وارد شده اشتباه میباشد");
      return false;
    }

    resetForm("deleteAll");
  };
  useEffect(() => {
    inputsRef.current[0].focus();
  }, []);
  const keyboardHanlder = (e, index) => {
    if (e.key === "Backspace" && !opt[index] && index <= 5 && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  return (
    <div className="w-full h-full flex flex-col gap-1 ">
      <div className="flex justify-between">
        <h2 className="text-black dark:text-white font-Dana font-bold text-xl">
          کد تایید
        </h2>
        <ArrowLeftCircleIcon
          onClick={() => {
            setStep(prevStep);
            localStorage.setItem("step", prevStep);
            setPrevStep(null);
          }}
          className="w-6 h-6 dark:text-white cursor-pointer"
        />
      </div>
      <p
        className="text-black dark:text-white font-Dana font-medium text-center my-4
     "
      >
        کد تایید برای ایمیل شما ارسال شد.
      </p>

      <form
        onSubmit={onSubmit}
        className="flex justify-between flex-wrap w-full [direction:ltr]"
      >
        {opt.map((digit, index) => (
          <input
            key={index * 361}
            type="text"
            ref={(el) => (inputsRef.current[index] = el)}
            value={digit}
            onChange={(e) => {
              handleChangevalue(e, index);
            }}
            onKeyUp={(e) => {
              keyboardHanlder(e, index);
            }}
            maxLength={1}
            required
            min={0}
            max={9}
            inputMode="numeric"
            className=" text-black text-sm w-11.5 h-11.5 md:w-12.5 md:h-12.5
                 dark:text-white bg-stone-700/7 rounded-xl dark:bg-[#333c4c] 
                  focus:outline-none focus:ring-1 focus:ring-blue-700
                  font-semibold dark:focus:ring-[#0095ff] text-center"
          />
        ))}
        <button
          type="submit"
          disabled={isAhtenticate}
          className="w-full bg-yellow-800/70 hover:bg-yellow-800/80 text-white
             font-Dana py-3 rounded-xl transition shadow-sm dark:bg-teal-600
             dark:hover:bg-teal-700 mt-7"
        >
          {isAhtenticate ? "...درحال بررسی" : "تایید"}
        </button>
      </form>
      <div>
        <div className="flex justify-between items-center w-full mt-6 px-4 *:dark:text-[#94a3b8]">
          <p
            className="underline font-Dana font-medium text-base
            text-stone-700/70 select-none cursor-pointer"
          >
            حریم خصوصی
          </p>
          <button
            className="font-Dana font-medium text-base tracking-tightest
            text-stone-700/70 select-none cursor-pointer"
          >
            {isFinished ? (
              <span
                onClick={() => {
                  if (prevStep === "login") sendOtpToEmail(email);
                  else sendOtpToEmail(emailRegister);
                }}
              >
                ارسال دوباره
              </span>
            ) : (
              <h2>{formattedTime}</h2>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
