import * as yup from "yup";

export const schemaRegister = yup.object({
  userName: yup
    .string()
    .required("لطفا نام کاربری را به درستی وارد کنید")
    .min(3, "نام کاربری باید بیشتر از 3 حرف باشد")
    .matches(
      /^[A-Za-z0-9_]+$/,
      "در نام کاربری استفاده از حروف انگلیسی و اعداد مجاز است"
    ),
  email: yup
    .string()
    .required("لطفا ایمیل را به درستی وارد کنید ")
    .email("ایمیل فرمت اشتباه دارد"),
  password: yup
    .string()
    .required("لطفا رمز عبور را به درستی وارد کنید")
    .min(8, "رمز عبور باید حداقل 8 کاراکتر باشد")
    .matches(/^\S+$/, "رمز عبور نمی‌تواند شامل فاصله باشد. "),
});
