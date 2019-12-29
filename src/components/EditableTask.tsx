import React from 'react';
import withEdditable from './EditableHOC';

interface EditableTaskProps {
  title: string,
  className?: string,
  onStartEdit?: (e: React.MouseEvent) => void,
  onEndEdit?: (e: React.FocusEvent) => void,
}

const EditableTask: React.FC <EditableTaskProps> = ({
  title, onStartEdit, onEndEdit, className
}) => 
  <li 
    onDoubleClick={onStartEdit}
    onBlur={onEndEdit}
    className={className}
  >
    {title}
  </li>

export default withEdditable(EditableTask);