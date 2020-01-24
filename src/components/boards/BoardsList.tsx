import React from 'react';
import { IBoard } from '../../interfaces';
import { Link } from 'react-router-dom';
import './BoardsList.scss';

type BoardsListProps = {
  boards: Array<IBoard>,
  onRemove: (id: string) => void
}

const BoardsList: React.FC<BoardsListProps> = ({
  boards = [], onRemove = f => f
}) =>
  (!boards.length) ?
    <p className="boards-empty empty">No boards</p> :
    <ul className="boards-list">
      {
        boards.map((board) =>
          <li className="boards-item" key={board.id}>
            <Link to={`/board/${board.id}`}>
              <span className='boards-name'>
                {board.title}
              </span>
            </Link>
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