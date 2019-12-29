import React from 'react'
import { ITask } from '../interfaces'
import Task from './Task'
import Composer from './Composer'
import {v4} from 'uuid'

interface TasksListProps {
  tasks: ITask[],
  isAdding: boolean,
  handleDrag?: () => void,
  handleDrop?: (taskId: string, targetTaskId?: string) => void,
  setNewTodosList?: (newTasks: ITask[]) => void,
  toggleAdding?: () => void
}

const TasksList: React.FC <TasksListProps> = ({
  tasks, handleDrag, handleDrop, setNewTodosList, isAdding, toggleAdding
}) => {

  const editTask = ( newTitle: string, taskId: string ): void => {
    const newTasksList = tasks.map(task => {
      if(task.id === taskId) {
        task.title = newTitle;
      }
      
      return task;
    })

    setNewTodosList(newTasksList);
  }

  // Newa task creating
  const addNewTask = (title: string): void => {
    const id = v4();
    const newTasks: ITask[] = [
      ...tasks,
      {
        title,
        id,
        isDone: false
      }
    ] 

    setNewTodosList(newTasks);
  }

  return (
    <ul className="tasks-list">
      {
        tasks.map(task => 
          <Task
            key={task.id}
            {...task}
            handleDrag={handleDrag}
            handleDrop={handleDrop}
            onEditTask={(newTitle) => editTask(newTitle, task.id)}
          />
        )
      }
      {
        isAdding &&
          <Composer
            submitText='Add new Task'
            cancelText='X'
            onClose={toggleAdding}
            handleSubmit={addNewTask}
            placeholder="Enter task"
          />
      }
    </ul>
  )
}

export default TasksList;
