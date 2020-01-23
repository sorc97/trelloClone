import React, { FormEvent, useState, useRef, useEffect } from 'react';
import './Composer.scss';

interface ComposerProps {
  submitText: string,
  cancelText: string,
  placeholder: string,
  minRows?: number,
  handleSubmit: (title: string) => void,
  onClose: () => void,
}

const Composer: React.FC<ComposerProps> = ({
  onClose, handleSubmit, placeholder, submitText, cancelText, minRows
}) => {

  const [textValue, setTextValue] = useState('');
  const textInput = useRef(null);  // Access to dom input element

  const handleClose = (e: MouseEvent) => {  // Composer's closing handler
    let target = e.target as HTMLElement;
    if (!target.closest('.composer')) {  // When click inside composer, don't close it
      onClose();
    }
  }

  useEffect(() => {
    window.addEventListener('mousedown', handleClose)  // Add composer's close handler on window 
    return () => {
      window.removeEventListener('mousedown', handleClose)  // Remove composer's close handler from window 
    }
  }, []);

  const handleChange = (e: FormEvent) => {  // Set current input field value as state
    const target = e.target as HTMLInputElement;
    setTextValue(target.value);
    expandTextarea(target);
  }

  // Expands textarea, when scroll exists
  const expandTextarea = (target: HTMLInputElement) => {
    target.style.height = 'auto';  // Reset element height
    //New height based on the scroll height and element size 
    target.style.height = target.scrollHeight + (target.offsetHeight - target.clientHeight) + 'px';
  }

  const formSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dataSubmit();
  }

  const textareaSubmit = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {  // Data submition by Enter 
      dataSubmit();
      e.preventDefault();  // Preventing line break by Enter
    }
  }

  const dataSubmit = () => {
    if (textValue === '') {  // When input field opened, focus on it 
      textInput.current.focus();
      return;
    }

    handleSubmit(textValue);  

    textInput.current.focus();  // When data submited, focus on input field
    textInput.current.style.height = 'auto';  // Height reset
    setTextValue('');  // Input field value reset
  }

  return (
    <form onSubmit={formSubmit} className="composer">
      <textarea
        autoFocus
        rows={minRows}
        ref={textInput}
        value={textValue}
        onChange={handleChange}
        className='composer-text'
        placeholder={placeholder}
        onKeyDown={textareaSubmit}
      ></textarea>
      <div className='composer-btnWrapper'>
        <button type='submit' className='composer-submit'>
          {submitText}
        </button>
        <button
          className="composer-cancel"
          onClick={onClose}
          type='button'
        >
          {cancelText}
        </button>
      </div>
    </form>
  )
}

Composer.defaultProps = {
  submitText: 'Submit',
  cancelText: 'X',
  placeholder: 'Enter the text',
  minRows: 3,
  handleSubmit: () => {},
  onClose: () => {},
}

export default Composer;
