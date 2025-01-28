import { useState, useEffect } from "react";
import { getProfile } from "../api/getProfile";


interface User {
  id: string;
  email: string;
  name: string;
  surname: string;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);

 
  const handleLoginSuccess = (userData: User) => {
    setUser(userData);
  };

  
  useEffect(() => {
    (async () => {
      try {
        const profile = await getProfile();
        setUser(profile);
      } catch (error) {
        console.log("Пользователь не авторизован");
      }
    })();
  }, []);

  return { user, handleLoginSuccess /*, handleLogout */ };
};