import React from 'react'
import { IBoard } from '../interfaces'

type BoardsListProps = {
  boards: Array<IBoard>
}

const BoardsList: React.FC<BoardsListProps> = ({boards}) =>
  <ul className="boards-list">
    {
      boards.map((item: IBoard) => 
        <li className="boards-item" key={item.id}>
          <a href="#">{item.title}</a>
        </li>
      )
    }
  </ul>

export default BoardsList;