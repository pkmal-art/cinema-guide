import React from "react";
import "./ModalConfirm.scss";
import Button from "../Button/Button";
import { useAuthContext } from "../../contexts/AuthContext";

interface ModalConfirmProps {
  isOpenConfirm: boolean;
  onCloseConfirm: () => void;
  onLoginClick: () => void;
};

const ModalConfirm: React.FC<ModalConfirmProps> = () => {
  const { isConfirmOpen, closeConfirmModal, openLoginModal, } = useAuthContext();

  const handleLoginClick = () => {
    closeConfirmModal(); 
    openLoginModal(); 
  };
  
  if (!isConfirmOpen) return null;

  return (
    <div className="modalConfirm__overlay" onClick={closeConfirmModal}>
      <div className="modalConfirm" onClick={(e) => e.stopPropagation()}>
        <button className="modalConfirm__close" onClick={closeConfirmModal}>
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
        <img src="/CinemaGuide.svg" alt="CinemaGuide" className="modalConfirm__img" />
        <h2 className="modalConfirm__title">Регистрация завершена</h2>
        <p className="modalConfirm__desc">
          Используйте вашу электронную почту для входа
        </p>
        <Button className="modalConfirm__button" text="Войти" onClick={handleLoginClick} />

      </div>

    </div>
  )


}
export default ModalConfirm;