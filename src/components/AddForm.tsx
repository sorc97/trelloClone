import React, { useState, useRef } from 'react'

interface AddFormProps {
  handleAdding: (title: string) => void,
  placeholder: string,
  button?: string,
  className?: string
}

const AddForm: React.FC<AddFormProps> = ({
  handleAdding, placeholder, button, className
}) => {
  // Ref creation
  let textRef: React.RefObject<HTMLInputElement> = useRef(null);
  // Component's state
  const [value, setValue] = useState<string>('');

  const handleChange = (e: React.FormEvent): void => {
    const target = e.target as HTMLInputElement;
    setValue(target.value);
  }

  const submit = (e: React.FormEvent): void => {
    e.preventDefault();
    handleAdding(value);
    setValue('');
    textRef.current.focus();
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
      {
        button && <input type='submit' value={button} />
      }
    </form>
  )
}

export default AddForm;
