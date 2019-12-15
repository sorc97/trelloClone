import React from 'react'


interface AddFormProps {
  handleAdding: (title: string) => void,
  placeholder: string,
  button?: string
}

const AddForm: React.FC <AddFormProps> = ({
  handleAdding, placeholder, button
}) => {
  let textRef: React.RefObject <HTMLInputElement> = React.createRef();

  const submit = (e: React.FormEvent): void => {
    e.preventDefault();
    console.log(textRef.current.value);
    console.log(e.target);

    handleAdding(textRef.current.value);
    
    textRef.current.value = '';
    textRef.current.focus();
  }

  return(
    <form onSubmit={submit}>
      <input 
        type='text' 
        placeholder={placeholder}
        ref={textRef} 
        required
      />
        {
          button && <input type='submit' value={button}/> 
        }
    </form>
  )
}

export default AddForm;
