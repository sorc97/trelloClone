
interface InitialFields {
  title: string,
  id: string,
}

export interface IBoard extends InitialFields {
  date: Date,
  // todosList?: Array<ITodo>
}

export interface ITodo extends InitialFields {
  boardId: string,
  tasks: Array<ITask>
}

export interface ITask extends InitialFields {
  isDone: boolean
}

export interface IAction {
  type: string,
  payload: IPayloadData
}

export interface IPayloadData {
  title?: string,
  todoId?: string,
  boardId?: string
}

/* 
TodosList = [
  {
    id: "asdkj123asd",
    title: "In Process",
    todos: [
      {title: 'Eat', isDone: false, id: "123124124Fasdas"},
      {title: 'Sleep', isDone: false, id: "223124124Fasdas"},
      {title: 'Drink', isDone: false, id: "323124124Fasdas"}
    ]
  },
  {
    id: "asdkj123asd",
    title: "Done",
    todos: [
      {title: 'Wake up', isDone: true, id: "123124124Fasdas"},
      {title: 'Take shower', isDone: true, id: "223124124Fasdas"},
      {title: 'Take a breakfast', isDone: true, id: "323124124Fasdas"}
    ]
  },
]
 */

/* state = {
  boarsList: [
    {
      title: 'Trello Clone',
      id: 535,
      date: new Date(),
      totoList: [
        {
          id: "asdkj123asd",
          title: "In Process",
          todos: [
            {title: 'Eat', isDone: false, id: "123124124Fasdas"},
            {title: 'Sleep', isDone: false, id: "223124124Fasdas"},
            {title: 'Drink', isDone: false, id: "323124124Fasdas"}
          ]
        },
        {
          id: "asdkj123asd",
          title: "Done",
          todos: [
            {title: 'Wake up', isDone: true, id: "123124124Fasdas"},
            {title: 'Take shower', isDone: true, id: "223124124Fasdas"},
            {title: 'Take a breakfast', isDone: true, id: "323124124Fasdas"}
          ]
        },
      ]
    },
    {
      title: 'Dictionary',
      id: 535,
      date: new Date(),
      totoList: [
        {
          id: "asdkj123asd",
          title: "In Process",
          todos: [
            {title: 'Eat', isDone: false, id: "123124124Fasdas"},
            {title: 'Sleep', isDone: false, id: "223124124Fasdas"},
            {title: 'Drink', isDone: false, id: "323124124Fasdas"}
          ]
        },
        {
          id: "asdkj123asd",
          title: "Done",
          todos: [
            {title: 'Wake up', isDone: true, id: "123124124Fasdas"},
            {title: 'Take shower', isDone: true, id: "223124124Fasdas"},
            {title: 'Take a breakfast', isDone: true, id: "323124124Fasdas"}
          ]
        },
      ]
    }
  ]
} */