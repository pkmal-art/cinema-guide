import { useState } from "react";

import { registerUser } from "../api/registerUser";
import { registerValidationSchema } from "../validation/registerValidation";

interface UseRegisterFormProps {
  onCloseRegister: () => void;
  openConfirmModal: () => void;
 
}



export function useRegisterForm({ onCloseRegister, openConfirmModal }: UseRegisterFormProps) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
 

  const resetForm = () => {
    setEmail("");
    setName("");
    setSurname("");
    setPassword("");
    setConfirmPassword("");
    setErrors({});
  };

  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault();
  
    const formData = { email, name, surname, password, confirmPassword };
    try {
      await registerValidationSchema.validate(formData, { abortEarly: false });
      setErrors({});
      await registerUser({ email, name, surname, password });
      onCloseRegister();
      openConfirmModal(); 
    } catch (error: any) {
      if (error.response && error.response.status === 409) {
        setErrors({ email: "Пользователь с таким email уже существует" });
      } else if (error.inner) {
        const validationErrors: Record<string, string> = {};
        error.inner.forEach((err: any) => {
          validationErrors[err.path] = err.message;
        });
        setErrors(validationErrors);
      } else {
        console.error("Неизвестная ошибка:", error);
      }
    }
  };
 

  return {
    email,
    setEmail,
    name,
    setName,
    surname,
    setSurname,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    handleRegister,
    errors,
    resetForm, 
  };
}
