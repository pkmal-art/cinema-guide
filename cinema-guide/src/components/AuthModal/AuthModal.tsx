import React from "react";
import { NavLink } from "react-router-dom";
import ModalLogin from "../ModalLogin/ModalLogin";
import ModalRegister from "../ModalRegister/MogalRegister"; 
import ModalConfirm from "../ModalConfirm/ModalConfirm";
import { useAuthContext } from "../../contexts/AuthContext";
import "./AuthModal.scss";

const AuthModal: React.FC = () => {
  const {
    user,
    isLoginOpen,
    isRegisterOpen,
    openLoginModal,
    openRegisterModal,
    closeLoginModal,
    closeRegisterModal,
    isConfirmOpen,
    closeConfirmModal,
  } = useAuthContext();

  return (
    <>
      {user ? (
        <NavLink to="/account" >
          <button className="button__login">
          <span className="button__text">{user.name}</span>
          <img src="/user.svg" alt="User Icon" className="button__icon" />
          </button>
        </NavLink>
      ) : (
        <button onClick={openLoginModal} className="button__login">
          <span className="button__text">Войти</span>
          <img src="/user.svg" alt="User Icon" className="button__icon" />
        </button>
      )}
      <ModalLogin
        isLoginOpen={isLoginOpen}
        onCloseLogin={closeLoginModal}
        onRegisterClick={openRegisterModal}
      />
      <ModalRegister
        isOpenRegister={isRegisterOpen}
        onCloseRegister={closeRegisterModal}
        onLoginClick={openLoginModal}
      />
      <ModalConfirm
        isOpenConfirm={isConfirmOpen}
        onCloseConfirm={closeConfirmModal}
        onLoginClick={openLoginModal}
      />
    </>
  );
};

export default AuthModal;
