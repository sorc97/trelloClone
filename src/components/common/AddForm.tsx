import React, { useState, useRef } from 'react';
import './AddForm.scss';

interface AddFormProps {
  handleAdding: (title: string) => void,
  placeholder: string,
  buttonText?: string,
  className?: string
}

const AddForm: React.FC<AddFormProps> = ({
  handleAdding, placeholder, className, buttonText
}) => {
  // Ref creation
  let textRef: React.RefObject<HTMLInputElement> = useRef(null);
  // Component's state
  const [value, setValue] = useState<string>('');
  
  const handleChange = (e: React.FormEvent): void => {
    const target = e.target as HTMLInputElement;
    setValue(target.value);  // Set current input value as a state value
  }

  const submit = (e: React.FormEvent): void => {
    e.preventDefault();
    handleAdding(value);  // Reverse data flow with input value
    setValue('');  // Reset input field
    textRef.current.focus();  // Focus on the input
  }

  return (
    <form className={className} onSubmit={submit}>
      <input
        type='text'
        placeholder={placeholder}
        value={value}
        ref={textRef}
        onChange={handleChange}
        required
      />
      <input type='submit' value={buttonText} />
    </form>
  )
}

AddForm.defaultProps = {
  handleAdding: () => {},
  placeholder: "Input field",
  className: "add-form",
  buttonText: "Add"
}

export default AddForm;