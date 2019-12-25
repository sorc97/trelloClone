import React from 'react'
import { ITask } from '../interfaces'
import Task from './Task'

interface TasksListProps {
  tasks: ITask[],
  handleDrag: () => void,
  handleDrop?: (taskId: string, targetTaskId?: string) => void,
}

const TasksList: React.FC <TasksListProps> = ({
  tasks, handleDrag, handleDrop
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
          />
        )
      }
    </ul>
  )
}

export default TasksList;
