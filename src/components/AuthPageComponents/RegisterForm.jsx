import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AuthFormContext } from "../../Context/AuthFormContext.jsx";
import { schemaRegister } from "../../pages/LoginOrRegister/schemaRegister";
import {
  EnvelopeIcon,
  UserIcon,
  EyeSlashIcon,
  EyeIcon,
} from "@heroicons/react/24/outline";
export default function RegisterForm({from}) {
  const [isHide, setIsHide] = useState(false);
  const {
    setStep,
    emailRegister,
    setEmailRegister,
    password,
    userName,
    resetForm,
    setUserName,
    sendOtpToEmail,
    setPassword,
  } = useContext(AuthFormContext);
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schemaRegister),
    defaultValues: {
      email: emailRegister,
      userName: userName,
      password: password,
    },
  });

  const setValueInContext = (email = "", userName = "", password = "") => {
    setEmailRegister(email);
    setUserName(userName);
    setPassword(password);
  };

  const onSubmit = async () => {
    setValueInContext(
      getValues("email").trim(),
      getValues("userName").trim(),
      getValues("password").trim()
    );
    localStorage.setItem("auth_email_register",getValues("email").trim())
    localStorage.setItem("auth_user_name",getValues("userName").trim())
    const res=await sendOtpToEmail(getValues("email"));
    if(res) localStorage.setItem("step", "verify");
  };
  return (
    <div
      className={`w-full h-full  transition-transform
       duration-200`}
    >
      <h2
        className="text-3xl font-bold text-center mb-5 text-black dark:text-white 
          tracking-tighter font-DanaMedium
        "
      >
        عضویت
      </h2>
      <div className="text-center mb-7 text-sm text-[#4e3c30] dark:text-white">
        <span className="text-base font-normal font-Dana tracking-tight">
          قبلا ثبت نام کرده اید؟{" "}
        </span>
        <button
          className="text-yellow-700 dark:text-teal-500 cursor-pointer font-Dana 
                font-bold"
          onClick={() => {
            setStep("login");
            localStorage.setItem("step","login")
            resetForm();
          }}
        >
          وارد شوید
        </button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="relative">
          <input
            {...register("userName")}
            type="text"
            placeholder="نام کاربری"
            className="w-full pr-4 pl-12 h-12  text-black text-sm
                 dark:text-white bg-stone-700/7 rounded-xl dark:bg-[#333c4c] 
                 dark:placeholder:text-[#94a3b8]
                  focus:outline-none focus:ring-1 focus:ring-blue-700 placeholder:text-sm
                  font-semibold dark:focus:ring-[#0095ff]"
          />
          <UserIcon
            className="absolute top-3 left-4 w-6 h-6 text-stone-700/80
            dark:text-[#94a3b8]"
          />
          {errors.userName && (
            <p
              className="absolute -bottom-6 tracking-tightest
               text-red-400/80 text-[13px] font-bold"
            >
              {errors.userName.message}
            </p>
          )}
        </div>

        <div className="relative">
          <input
            {...register("email")}
            type="text"
            placeholder="آدرس ایمیل"
            className="w-full pr-4 pl-12 h-12  text-black text-sm
                 dark:text-white bg-stone-700/7 rounded-xl dark:bg-[#333c4c] 
                 dark:placeholder:text-[#94a3b8]
                  focus:outline-none focus:ring-1 focus:ring-blue-700 placeholder:text-sm
                  font-semibold dark:focus:ring-[#0095ff]"
          />
          <EnvelopeIcon
            className="absolute top-3 left-4 w-6 h-6 text-stone-700/80
            dark:text-[#94a3b8]"
          />
          {errors.email && (
            <p
              className="absolute -bottom-6 tracking-tightest
               text-red-400/80 text-[13px] font-bold"
            >
              {errors.email.message}
            </p>
          )}
        </div>
        <div className="relative">
          <input
            {...register("password")}
            type={isHide ? "text" : "password"}
            placeholder="رمز عبور"
            className="w-full pr-4 pl-12 h-12  text-black text-sm
                 dark:text-white bg-stone-700/7 rounded-xl dark:bg-[#333c4c] 
                 dark:placeholder:text-[#94a3b8]
                  focus:outline-none focus:ring-1 focus:ring-blue-700 placeholder:text-sm
                  font-semibold dark:focus:ring-[#0095ff]"
          />
          {isHide ? (
            <EyeSlashIcon
              onClick={() => setIsHide((p) => !p)}
              className="absolute top-3 left-4 w-6 h-6 text-stone-700/80 cursor-pointer
                dark:text-[#94a3b8]"
            />
          ) : (
            <EyeIcon
              onClick={() => setIsHide((p) => !p)}
              className="absolute top-3 left-4 w-6 h-6 text-stone-700/80 cursor-pointer
                dark:text-[#94a3b8]"
            />
          )}
          {errors.password && (
            <p
              className="absolute -bottom-6 tracking-tightest
               text-red-400/80 text-[13px] font-bold"
            >
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-yellow-800/70 hover:bg-yellow-800/80 text-white
             font-Dana py-3 rounded-xl transition shadow-sm dark:bg-teal-600
             dark:hover:bg-teal-700 cursor-pointer"
        >
          {isSubmitting ? "در حال ارسال..." : "ادامه"}
        </button>
      </form>
    </div>
  );
}
