import React, { useState, useRef, useEffect } from 'react'

interface AddFormProps {
  handleAdding: (title: string) => void,
  placeholder: string,
  button?: string,
  className?: string
}

const AddForm: React.FC <AddFormProps> = ({
  handleAdding, placeholder, button, className
}) => {
  // let textRef: React.RefObject <HTMLInputElement> = React.createRef();
  let textRef: React.RefObject <HTMLInputElement> = useRef(null);

  const [value, setValue] = useState<string>('');

  useEffect(() => {
    console.log(value);
  }, [value]);

  const handleChange = (e: React.FormEvent): void => {
    const target = e.target as HTMLInputElement;
    setValue(target.value);
  }

  const submit = (e: React.FormEvent): void => {
    e.preventDefault();
    // console.log(textRef.current.value);
    // console.log(e.target);
    console.log(value);

    handleAdding(value);
    
    setValue('');
    // textRef.current.value = '';
    textRef.current.focus();
  }

  return(
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
          button && <input type='submit' value={button}/> 
        }
    </form>
  )
}

export default AddForm;
