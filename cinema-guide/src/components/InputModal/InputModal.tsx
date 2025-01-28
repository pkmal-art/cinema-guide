import React from "react";
import './InputModal.scss';

type InputModalProps = {
  placeholder: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  classNameDiv?: string;
  errorMessage?: string;
  hasError?: boolean; 
};

export const InputModalEmail: React.FC<InputModalProps> = ({ placeholder, value, onChange, className, classNameDiv, hasError }) => (
  <div className={`input__data ${classNameDiv}`}>
    <img src={hasError ? "/emailRed.svg" : "/email.svg"} alt="email icon" className="input__data--icon" />
    <input
      className={`input__data--input ${className}`}
      type="e-mail"     
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  </div>
);

export const InputModalName: React.FC<InputModalProps> = ({ placeholder,  value, onChange, className, classNameDiv, hasError }) => {
  return (
    <div className={`input__data ${classNameDiv}`}>
      <img src={hasError ? "/personRed.svg" : "/person.svg"} alt="person icon" className="input__data--icon" />
      <input 
        className={`input__data--input ${className}`}
        type="name"
        placeholder={placeholder}        
        value={value}        
        onChange={onChange} />
    </div>
  );
};

export const InputModalSurname: React.FC<InputModalProps> = ({ placeholder,  value, onChange, className, classNameDiv, hasError }) => {
  return (
    <div className={`input__data ${classNameDiv}`}>
      <img src={hasError ? "/personRed.svg" : "/person.svg"} alt="person icon" className="input__data--icon" />
      <input 
        className={`input__data--input ${className}`}
        type="surname"
        placeholder={placeholder}         
        value={value}        
        onChange={onChange} />
    </div>
  );
};

export const InputModalPassword: React.FC<InputModalProps> = ({ placeholder, value, onChange, className, classNameDiv, hasError }) => {
  return (
    <div className={`input__data ${classNameDiv}`}>
      <img src={hasError ? "/keyRed.svg" : "/key.svg"} alt="password icon" className="input__data--icon" />
      <input 
         className={`input__data--input ${className}`}
        type="password"
        placeholder={placeholder}
        
        value={value}
        onChange={onChange} />
    </div>
  );
};

export const InputModalConfirmPassword: React.FC<InputModalProps> = ({ placeholder,  value, onChange, className, classNameDiv, hasError }) => {
  return (
    <div className={`input__data ${classNameDiv}`}>
      <img src={hasError ? "/keyRed.svg" : "/key.svg"} alt="password icon" className="input__data--icon" />
      <input 
        className={`input__data--input ${className}`}
        type="password"
        placeholder={placeholder}        
        value={value}
        onChange={onChange} />
    </div>
  );
};
