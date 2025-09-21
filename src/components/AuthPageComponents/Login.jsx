import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { AuthFormContext } from "../../Context/AuthFormContext.jsx";
import { schemaLogin } from "../../pages/LoginOrRegister/schemaLogin.js";
import { toast } from "sonner";
export default function Login({from}) {
  const { setStep, resetForm, setEmail, email, sendOtpToEmail } =
    useContext(AuthFormContext);
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schemaLogin),
    defaultValues: {
      email: email || "",
    },
  });

  const onSubmit = async () => {
    const res=await sendOtpToEmail(getValues("email"));
    setEmail(getValues("email").trim());
    localStorage.setItem("auth_email",getValues("email").trim())
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
        ورود با ایمیل
      </h2>
      <div className="text-center mb-7 text-sm text-[#4e3c30] dark:text-white">
        <span className="text-base font-normal font-Dana tracking-tight">
          حساب کاربری ندارید؟{" "}
        </span>
        <button
          className="text-yellow-700 dark:text-teal-500 cursor-pointer font-Dana
                 font-bold"
          onClick={() => {
            setStep("register");
            localStorage.setItem("step", "register");
            resetForm();
          }}
        >
          ثبت‌ نام کنید
        </button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
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
          <EnvelopeIcon className="absolute top-3 left-4 w-6 h-6 text-stone-700/80 dark:text-[#94a3b8]" />
          {errors.email && (
            <p
              className="absolute -bottom-6 tracking-tightest
               text-red-400/80 text-[13px] font-bold"
            >
              {errors.email.message}
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
      <div className="flex justify-between w-full mt-6 px-4 *:dark:text-[#94a3b8]">
        <button
          onClick={() =>
            toast.info("ورود با شماره موبایل هنوز راه اندازی نشده است .")
          }
          className="font-Dana font-medium text-base tracking-tightest
            text-stone-700/70 select-none cursor-pointer"
        >
          ورود با موبایل
        </button>
        <p
          className="underline font-Dana font-medium text-base
            text-stone-700/70 select-none cursor-pointer"
        >
          حریم خصوصی
        </p>
      </div>
    </div>
  );
}
