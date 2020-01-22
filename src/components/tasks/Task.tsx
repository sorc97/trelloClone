import React from 'react';
import Draggable from '../dnd/Draggable';
import EditableTask from './EditableTask';
import './Task.scss';

type TaskProps = {
  title: string,
  id: string,
  isDone?: boolean,
  handleDrag?: () => void,
  handleDrop?: (taskId: string, targetTaskId?: string) => void,
  onEditTask?: (title: string, id: string) => void,
}

const Task: React.FC<TaskProps> = ({ 
  title, isDone, id, handleDrag, handleDrop, onEditTask
}) => {

  return(
    <Draggable 
      id={id} 
      className='draggable-wrapper' 
      handleDrag={handleDrag}
      handleDrop={handleDrop}
    >
      <EditableTask
        title={title}
        className= {isDone ? 'tasks-item done': 'tasks-item'} 
        handleEditingEnd={(title) => onEditTask(title, id)}
      />
    </Draggable>
  )
}

export default Task;
