import React from "react";
import './Button.scss';

type ButtonProps = {
  text: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  className?: string;
}; 

const Button: React.FC<ButtonProps> = ({ text, onClick, variant = 'primary', className }) => {
  return(
    <button className={`button button__${variant} ${className}`} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
