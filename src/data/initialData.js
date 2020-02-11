import { v4 } from 'uuid'

export default {
  title: "Initial board",
  id: v4(),
  date: new Date(),
  todos: {
    "1": {
      title: "Plans",
      id: "1",
      tasks: [
        {
          title: "Create REST API",
          id: v4()
        },
        {
          title: "Connect API and MongoDB",
          id: v4()
        },
        {
          title: "Connect Back-end and Front-end",
          id: v4()
        },
        {
          title: "Deploy porject on the hosting",
          id: v4()
        }
      ]
    },
    "2": {
      title: "In Process",
      id: "2",
      tasks: [
        {
          title: "Create and style React Components",
          id: v4()
        }
      ]
    },
    "3": {
      title: "Done",
      id: "3",
      tasks: [
        {
          title: "Layout design",
          id: v4()
        },
        {
          title: "Create Webpack config",
          id: v4()
        },
        {
          title: "Install necessary npm packages",
          id: v4()
        },
        {
          title: "Choose state managment approach",
          id: v4()
        }
      ]
    }
  }
}