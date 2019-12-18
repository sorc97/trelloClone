
interface InitialFields {
  title: string,
  id: string,
}

export interface IBoard extends InitialFields {
  date: Date,
  // todos?: Array<ITodo>
  todos: {
    [name: string]: ITodo
  }
  // todosList?: Array<ITodo>
}

export interface ITodo extends InitialFields {
  // boardId: string,
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
  boardId?: string,
  activeTodos?: Array<ITodo>,
  todosList?: Array<ITodo>
}

export type AppState = {
  boardsList: Array<IBoard>,
  // activeTodos: Array<ITodo>
}

/* 
  let boardsList = [
    {
      title: "Trello",
      id: "asd23",
      todos: {
        "asdj123": {
          title: "Todo",
          id: "asdasd123",
          tasks: [
            {
              title: 'Do something',
              id: v4(),
              isDone: false
            },
            {
              title: 'Do something',
              id: v4(),
              isDone: false
            }
          ]
        },
        "asdasdj123d1": {
          title: "Todo",
          id: "asdasd123",
          tasks: [
            {
              title: 'Do something',
              id: v4(),
              isDone: false
            },
            {
              title: 'Do something',
              id: v4(),
              isDone: false
            }
          ]
        }
      }
    }
  ]
 */


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