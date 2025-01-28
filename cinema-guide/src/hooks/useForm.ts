import { useState } from "react";

const useForm = (initialState: Record<string, string>) => {
  const [formData, setFormData] = useState(initialState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({...prevData, [name]: value}));
  };

  return {
    formData,
    handleChange,
  };
};
export default useForm;