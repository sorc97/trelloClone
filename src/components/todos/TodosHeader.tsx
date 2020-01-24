import React from 'react';
import AddForm from '../common/AddForm';
import Basket from '../common/Basket';
import EditableCaption from '../common/EditableCaption';
import './TodosHeader.scss';

interface TodosHeader {
  currentBoardTitle: string,
  editBoard: (newTitle: string) => void,
  addNewTodo: (todoTitle: string) => void,
  removeTask: (taskId: string) => void
}

const TodosHeader: React.FC<TodosHeader> = ({
  currentBoardTitle, editBoard, addNewTodo, removeTask
}) => {

  return (
    <section className="todos-header">
      <EditableCaption
        title={currentBoardTitle}
        captionRole="main"
        className="todos-boardCaption"
        handleEditingEnd={editBoard}
      />
      <AddForm
        placeholder="Add new Todo"
        handleAdding={addNewTodo}
        className="add-form"
      />
      <Basket
        onRemove={removeTask}
        basketText="Drop task here to remove"
      />
    </section>
  )
}

TodosHeader.defaultProps = {
  currentBoardTitle: "Unknown",
  editBoard: () => { },
  addNewTodo: () => { },
  removeTask: () => { }
}

export default TodosHeader;