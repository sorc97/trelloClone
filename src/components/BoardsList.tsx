import React from 'react'
import { IBoard } from '../interfaces'
import { Link } from 'react-router-dom'
import './stylesheets/BoardsList.scss'

type BoardsListProps = {
  boards: Array<IBoard>,
  onRemove: (id: string) => void
}

const BoardsList: React.FC<BoardsListProps> = ({ boards, onRemove }) =>
  <ul className="boards-list">
    {
      boards.map((board) =>
        <li className="boards-item" key={board.id}>
          <Link to={`/board/${board.id}`}>{board.title}</Link>
          <button 
            className="boards-remove"
            onClick={() => onRemove(board.id)}
          >
            &times;
          </button>
        </li>
      )
    }
  </ul>

export default BoardsList;