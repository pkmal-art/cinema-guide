import { useState } from "react";

export const useModal = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const openLoginModal = () => {
    setIsLoginOpen(true);
    setIsRegisterOpen(false);
  };

  const openRegisterModal = () => {
    setIsRegisterOpen(true);
    setIsLoginOpen(false);
  };

  const closeLoginModal = () => {
    setIsLoginOpen(false);
  };

  const closeRegisterModal = () => {
    setIsRegisterOpen(false);
  };

  return {
    isLoginOpen,
    isRegisterOpen,
    openLoginModal,
    openRegisterModal,
    closeLoginModal,
    closeRegisterModal,
  };
};