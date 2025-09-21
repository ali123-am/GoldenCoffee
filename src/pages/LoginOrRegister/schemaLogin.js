import * as yup from "yup";

export const schemaLogin = yup.object({
  email: yup
    .string()
    .required("لطفا ایمیل را به درستی وارد کنید ")
    .email("ایمیل فرمت اشتباه دارد")
});
