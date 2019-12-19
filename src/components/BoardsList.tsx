import React from 'react'
import { IBoard } from '../interfaces'
import { Link } from 'react-router-dom'
import './stylesheets/BoardsList.scss'

type BoardsListProps = {
  boards: Array<IBoard>
}

const BoardsList: React.FC<BoardsListProps> = ({boards}) =>
  <ul className="boards-list">
    {
      boards.map((item: IBoard) => 
        <li className="boards-item" key={item.id}>
          <Link to={`/todos/${item.id}`}>{item.title}</Link>
        </li>
      )
    }
  </ul>

export default BoardsList;