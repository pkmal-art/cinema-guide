import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/loginUser";
import { loginValidationSchema } from "../validation/loginValidation";

interface UseLoginFormProps {
  onLoginSuccess: (user: any) => void;
  onCloseLogin: () => void;
}

export function useLoginForm({ onLoginSuccess, onCloseLogin }: UseLoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const navigate = useNavigate();

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setErrors({});
  };


  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log("handleLogin вызван с данными:", { email, password });
  
    try {
     
      await loginValidationSchema.validate({ email, password }, { abortEarly: false });
      setErrors({}); 
  
      const user = await loginUser(email, password);
      console.log("Получен ответ от сервера:", user);
      onLoginSuccess(user);
      onCloseLogin();
      navigate(0);
    } catch (error: any) {
      if (error.inner) {
       
        const validationErrors: Record<string, string> = {};
        error.inner.forEach((err: any) => {
          validationErrors[err.path] = err.message;
          console.log(`Ошибка в поле ${err.path}: ${err.message}`);
        });
        setErrors(validationErrors);
      } else if (error.response) {
       
        setErrors({ global: error.response.data.message || "Ошибка авторизации" });
      } else {
        console.error("Ошибка авторизации:", error);
      }
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    handleLogin,
    errors,
    resetForm, 
  };
}
