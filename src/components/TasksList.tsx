import React, { useRef, useEffect } from 'react'
import Task from './Task'
import Composer from './Composer'
import { v4 } from 'uuid'
import { ITask } from '../interfaces'
import './stylesheets/TasksList.scss'

interface TasksListProps {
  tasks: ITask[],
  isAdding: boolean,
  handleDrag?: () => void,
  handleDrop?: (taskId: string, targetTaskId?: string) => void,
  setNewTasks?: (newTasks: ITask[]) => void,
  toggleAdding?: () => void
}

const TasksList: React.FC<TasksListProps> = ({
  tasks, handleDrag, handleDrop, setNewTasks, isAdding, toggleAdding
}) => {

  const list: React.RefObject<HTMLUListElement> = useRef(null);

  const scrollDown = (): void => {
    let elem = list.current;
    if (elem.scrollHeight - elem.clientHeight) {
      elem.scrollTo(0, elem.scrollHeight);
    }
  }

  useEffect(() => {
    if (isAdding) {
      scrollDown();
    }
  }, [tasks, isAdding]);

  const editTask = (newTitle: string, taskId: string): void => {
    const newTasksList = tasks.map(task => {
      if (task.id === taskId) {
        task.title = newTitle;
      }

      return task;
    })

    setNewTasks(newTasksList);
  }

  // New task creation
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

    setNewTasks(newTasks);
  }

  return (
    <ul className="tasks-list" ref={list}>
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
          placeholder="Enter task"
          onClose={toggleAdding}
          handleSubmit={addNewTask}
        />
      }
    </ul>
  )
}

export default TasksList;
