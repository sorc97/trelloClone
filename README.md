# TrelloClone

## About

### en

This project is Single Page Application, created with React, TypeScript and SCSS. Project's state management implemented with React Context and React Hooks. This project is implementing project management structure known as a kanban. First of all you create a project board, in that board you can create a multiple columns, which contains tasks, that you can transfer between columns. Tasks transfer was implemented with HTML5 Drag and Drop (without using any of library). While task is transferring you can drop it on another task, and they will be sorted, or you can drop it on another column, so task will be placed on that column, if task dropped on the empty space, it's placed on the end of the column. Also you can remove or edit columns, boards and tasks. Project was build with Webpack, for splitting production and development mode environment variables was used. Responsive version is not available, because Drag and Drop is not working on the touchscreen.

### ru

Данный проект представляет из себя одностраничное приложение, выполненное с помощью React, TypeScript и SCSS. Управление состоянием осуществляется при помощи React Context и React Hooks. Приложение реализует структуру управления проектами, известную как канбан. Для начала создается новый проект, при переходе в который можно создать множество колонок с заданиями, а затем переносить задания между колонками. Перенос заданий осуществлен при помощи технологии HTML5 Drag and Drop (без использования библиотек). В процессе переноса задания, при размещении его над другим заданием, происходит их сортировка (независимо от колонки), при размещении задания на другой колонке, происходит перенос на нужную колонку, если задание упало на свободное место, то оно встанет в конец списка. Также присутствует возможность редактирования и удаления доски проекта, колонки и задания. Проект был собран с помощью Webpack, этапы разработки разделены при помощи переменных окружения, опираясь на которые и формируется итоговый конфигурационный файл конкретного этапа разработки. Адаптивная версия проекта не реализована, так как Drag 'n Drop не работает на сенсорных экранах.
