import React, {useContext} from 'react';
import './stylesheets/Task.scss';
import Draggable from './Dnd/Draggable/Draggable';
import { TodoContext } from './context/TodoContext';

type TaskProps = {
  id?: string,
  title: string,
  isDone: boolean,
  handleDrag?: () => void,
  handleDrop?: (taskId: string, targetTaskId?: string) => void,
  onEditTask?: (title: string, id: string) => void
}

const Task: React.FC<TaskProps> = ({ 
  title, isDone, id, handleDrag, handleDrop, onEditTask
}) => {

  const {startEditing, endEditing} = useContext(TodoContext);
  
  return(
    <Draggable 
      id={id} 
      className='draggable-wrapper' 
      handleDrag={handleDrag}
      handleDrop={handleDrop}
    >
      <li 
        onDoubleClick={startEditing}
        onBlur={(e) => 
          endEditing(
            e, (title) => onEditTask(title, id)
          )
        }
        className='tasks-item'
      >
        {title}
      </li>
    </Draggable>
  )
}


export default Task;
