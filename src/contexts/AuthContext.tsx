import React, { createContext, useState, useEffect, useContext, ReactNode } from "react";
import { getProfile } from "../api/getProfile";
import { logoutUser } from "../api/logoutUser";

interface User {
  id: string;
  email: string;
  name: string;
  surname: string;
}

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextProps {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  isLoginOpen: boolean;
  openLoginModal: () => void;
  closeLoginModal: () => void;
  isRegisterOpen: boolean;
  openRegisterModal: () => void;
  closeRegisterModal: () => void;
  handleLogout: () => Promise<void>;
  isConfirmOpen: boolean;
  openConfirmModal: () => void;
  closeConfirmModal: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const openLoginModal = () => {
    setIsLoginOpen(true);
    setIsRegisterOpen(false);
  };

  const closeLoginModal = () => {
    setIsLoginOpen(false);
  };

  const openRegisterModal = () => {
    setIsRegisterOpen(true);
    setIsLoginOpen(false);
  };

  const closeRegisterModal = () => {
    setIsRegisterOpen(false);
  };

  const openConfirmModal = () => {
    console.log("Открываем окно подтверждения");
    setIsConfirmOpen(true);
    setIsRegisterOpen(false);
  };

  const closeConfirmModal = () => {
    setIsConfirmOpen(false);
  };

  const handleLogout = async () => {
    await logoutUser();
    setUser(null);
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

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isLoginOpen,
        openLoginModal,
        closeLoginModal,
        isRegisterOpen,
        openRegisterModal,
        closeRegisterModal,
        handleLogout,
        isConfirmOpen,
        openConfirmModal,
        closeConfirmModal,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext должен использоваться внутри AuthProvider");
  }
  return context;
};
