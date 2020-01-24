import React, { useRef, useEffect } from 'react';
import { v4 } from 'uuid';
import Task from './Task';
import Composer from '../common/Composer';
import { ITask } from '../../interfaces';
import './TasksList.scss';

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
  // Access to list DOM element
  const list: React.RefObject<HTMLUListElement> = useRef(null);

  const scrollDown = (): void => {
    let elem = list.current;
    // When element got scroll, sroll down
    if (elem.scrollHeight - elem.clientHeight) {
      elem.scrollTop = elem.scrollHeight;
    }
  }

  useEffect(() => {
    // Scroll down every time, when composer is opened
    if (isAdding && tasks.length) {
      scrollDown();
    }
  }, [tasks, isAdding]);

  // Task editing
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
        id
      }
    ]

    setNewTasks(newTasks);
  }

  return (
    <ul className="tasks-list" ref={list}>
      {tasks.map(task =>
        <Task
          key={task.id}
          {...task}
          handleDrag={handleDrag}
          handleDrop={handleDrop}
          onEditTask={(newTitle) => editTask(newTitle, task.id)}
        />
      )}
      {isAdding &&
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

TasksList.defaultProps = {
  tasks: [],
  isAdding: false,
  handleDrag: () => { },
  handleDrop: () => { },
  setNewTasks: () => { },
  toggleAdding: () => { }
}

export default TasksList;