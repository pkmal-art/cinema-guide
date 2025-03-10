import React from "react";
import "./ModalRegister.scss";
import Button from "../Button/Button";
import {
  InputModalEmail,
  InputModalPassword,
  InputModalName,
  InputModalSurname,
  InputModalConfirmPassword,
} from "../InputModal/InputModal";
import { Link } from "react-router-dom";
import { useRegisterForm } from "../../hooks/useRegisterForm";
import { useAuthContext } from "../../contexts/AuthContext";


interface ModalRegisterProps {
  isOpenRegister: boolean;
  onCloseRegister: () => void;
  onLoginClick: () => void;
}


const ModalRegister: React.FC<ModalRegisterProps> = () => {
  // Используем AuthContext для получения данных
  const {
    isRegisterOpen,
    closeRegisterModal,
    openLoginModal,
    openConfirmModal,
    // setUser,
  } = useAuthContext();

  const {
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
  } = useRegisterForm({
    onCloseRegister: closeRegisterModal,
    openConfirmModal, 
  });

  if (!isRegisterOpen) return null;

  return (
    <div className="modal__overlay" onClick={closeRegisterModal}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal__close" onClick={() => {
            closeRegisterModal();
            resetForm(); 
          }}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.5859 12L2.79297 4.20706L4.20718 2.79285L12.0001 10.5857L19.793 2.79285L21.2072 4.20706L13.4143 12L21.2072 19.7928L19.793 21.2071L12.0001 13.4142L4.20718 21.2071L2.79297 19.7928L10.5859 12Z"
              fill="black"
            />
          </svg>
        </button>
        <img src="/CinemaGuide.svg" alt="CinemaGuide" className="modal__img" />
        <h2 className="modal__title">Регистрация</h2>
        <form className="modal__form" onSubmit={handleRegister}>
          <div className="modal__inputs">
            <InputModalEmail
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Электронная почта"
              className={errors.email ? "input__data--red" : ""}
              classNameDiv={errors.email ? "input__data--error" : ""}
              hasError={!!errors.email}
            />
            {errors.email && <p className="input__error">{errors.email}</p>}

            <InputModalName
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Имя"
              className={errors.name ? "input__data--red" : ""}
              classNameDiv={errors.name ? "input__data--error" : ""}
              hasError={!!errors.name}
            />
            {errors.name && <p className="input__error">{errors.name}</p>}

            <InputModalSurname
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              placeholder="Фамилия"
              className={errors.surname ? "input__data--red" : ""}
              classNameDiv={errors.surname ? "input__data--error" : ""}
              hasError={!!errors.surname}
            />
            {errors.surname && <p className="input__error">{errors.surname}</p>}

            <InputModalPassword
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Пароль"
              className={errors.password ? "input__data--red" : ""}
              classNameDiv={errors.password ? "input__data--error" : ""}
              hasError={!!errors.password}
            />
            {errors.password && <p className="input__error">{errors.password}</p>}

            <InputModalConfirmPassword
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Подтвердите пароль"
              className={errors.confirmPassword ? "input__data--red" : ""}
              classNameDiv={errors.confirmPassword ? "input__data--error" : ""}
              hasError={!!errors.confirmPassword}
            />
            {errors.confirmPassword && <p className="input__error">{errors.confirmPassword}</p>}
          </div>
          <Button className="modal__button" text="Создать аккаунт" />
          <Link to="/" onClick={openLoginModal} className="modal__link">
            У меня есть пароль
          </Link>
        </form>
      </div>
    </div>
  );
};

export default ModalRegister;
