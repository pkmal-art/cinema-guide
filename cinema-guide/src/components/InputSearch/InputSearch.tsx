import React from "react";
import './InputSearch.scss';

type InputSearchProps = {
  placeholder: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputSearch: React.FC<InputSearchProps> = ({ placeholder, value, onChange }) => {
  return (
    <div className="input__search">
      <img src="/search.svg" alt="Search Icon" className="input__search--icon" />
      <input
        className="input__search--input"
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
    
  );
};

export default InputSearch;