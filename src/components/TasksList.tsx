import React from 'react'
import { ITask } from '../interfaces'
import Task from './Task'

interface TasksListProps {
  tasks: ITask[],
  handleDrag?: () => void,
  handleDrop?: (taskId: string, targetTaskId?: string) => void,
  startEditing?: (e: React.MouseEvent) => void,
  endEditing?: (
    e: React.FocusEvent, 
    handleEditing: (title: string) => void
  ) => void,
  onEditTask?: (newTitle: string, taskId: string) => void
}

const TasksList: React.FC <TasksListProps> = ({
  tasks, handleDrag, handleDrop, startEditing, endEditing, onEditTask
}) => {

  return (
    <ul className="tasks-list">
      {
        tasks.map(task => 
          <Task
            key={task.id}
            {...task}
            handleDrag={handleDrag}
            handleDrop={handleDrop}
            startEditing={startEditing}
            endEditing={(e) => 
              endEditing(
                e, (newTitle) => onEditTask(newTitle, task.id)
              )
            }
          />
        )
      }
    </ul>
  )
}

export default TasksList;
