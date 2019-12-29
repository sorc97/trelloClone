import React, { FormEvent, useState, useRef, useEffect } from 'react';
import './stylesheets/Composer.scss';

interface ComposerProps {
  submitText: string,
  cancelText: string,
  placeholder: string,
  onClose: () => void,
  handleSubmit: (title: string) => void,
}

const Composer: React.FC <ComposerProps> = ({
  onClose, handleSubmit, placeholder, submitText, cancelText
}) => {

  const [textValue, setTextValue] = useState('');
  const textInput = useRef(null);

  const handleClose = (e: MouseEvent) => {
    let target = e.target as HTMLElement;
    if(!target.closest('.composer')) {
      onClose();
    }
    console.log('click');
  }

  useEffect(() => {
    window.addEventListener('click', handleClose)
    console.log('MOUNT');
    return () => {
      window.removeEventListener('click', handleClose)
      console.log('UNMOUNT')
    }
  }, []);

  const handleChange = (e: FormEvent) => {
    const target = e.target as HTMLInputElement;
    setTextValue(target.value);
    expandTextarea(target);
  }

  // Expands textarea, when scroll exists
  const expandTextarea = (target: HTMLInputElement) => {
    target.style.height = 'auto';
    target.style.height = target.scrollHeight + (target.offsetHeight - target.clientHeight) + 'px';
  }

  const formSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dataSubmit();
  }

  const textareaSubmit = (e: React.KeyboardEvent) => {
    if(e.key === 'Enter') {
      dataSubmit();
      e.preventDefault();
    }
  }

  const dataSubmit = () => {
    if(textValue === '') {
      textInput.current.focus();
      return;
    }
    
    handleSubmit(textValue);

    textInput.current.focus();
    textInput.current.style.height = 'auto';
    setTextValue('');
  }

  return(
    <form onSubmit={formSubmit} className="composer">
      <textarea 
        autoFocus
        rows={3}
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
        >
          {cancelText}
        </button>
      </div>
    </form>
  )
} 

export default Composer;
