import React from 'react';

interface AddButtonProps {
  text: string,
  className?: string,
  handleClick?: () => void
}

const AddButton: React.FC <AddButtonProps> = ({
  className, text, handleClick
}) => 
  <button
    className={className}
    onClick={handleClick}
  >
    {text}
  </button>

AddButton.defaultProps = {
  text: 'Submit',
  handleClick: () => { }
}

export default AddButton;