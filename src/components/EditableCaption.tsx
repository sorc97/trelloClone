import React from 'react';
import withToggle from './ToggleHOC';

interface EditableCaptionProps {
  caption: string,
  toggle: () => void,
  toggleStatus: string
}

const EditableCaption: React.FC <EditableCaptionProps> = ({
  caption, toggleStatus, toggle
}) => {
  return(
    <div className='editableCaption'>
        {
          // toggleStatus ? 
          // <h1>{caption}</h1>: 
        }
    </div>
  )
}
