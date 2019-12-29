import React from 'react';
import withEdditable from './EditableHOC';

interface EditableCaptionProps {
  title: string,
  captionRole: string,
  className?: string,
  onStartEdit?: (e: React.MouseEvent) => void,
  onEndEdit?: (e: React.FocusEvent) => void,
}

const EditableCaption: React.FC <EditableCaptionProps> = ({
  title, className, captionRole, onStartEdit, onEndEdit
}) => 
  (captionRole === 'main') ? 
    <h1 
      className={className}
      onClick={onStartEdit}
      onBlur={onEndEdit}
    >
      {title}
    </h1> :
    <h2
      className={className}
      onClick={onStartEdit}
      onBlur={onEndEdit}
    >
      {title}
    </h2>

export default withEdditable(EditableCaption);
