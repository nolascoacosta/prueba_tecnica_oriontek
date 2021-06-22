import { useState } from 'react';
const useForm = (initialState = {}) => {
  const [formValues, setformValues] = useState(initialState)

  const handleInputChange = ({ target}) => {
    setformValues({
      ...formValues,
      [target.name] : target.type === 'checkbox' ? target.checked : target.value
    });
  }
  return {
    formValues, handleInputChange
  }
};
export default useForm;
