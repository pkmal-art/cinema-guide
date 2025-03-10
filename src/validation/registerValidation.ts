import * as yup from "yup";

export const registerValidationSchema = yup.object().shape({
  email: yup.string().email("Неверный формат email").required("Email обязателен"),
  name: yup.string().min(2, "Имя должно содержать минимум 2 символа").required("Имя обязательно"),
  surname: yup.string().min(2, "Фамилия должна содержать минимум 2 символа").required("Фамилия обязательна"),
  password: yup
    .string()
    .min(6, "Пароль должен содержать минимум 6 символов")
    .required("Пароль обязателен"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Пароли не совпадают")
    .required("Подтверждение пароля обязательно"),
});
