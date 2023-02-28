# Todo App

A todo application built using NodeJS, ExpressJS, MySQL and React.

## Docker Setup

Before running the application you will need to create a `.env` file at the root directory. Inside the file add the following fields:

```env
PORT=5001
JWT_SECRET=THIS_IS_A_SECRET_KEY_AND_IS_REQUIRED

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=password
DB_NAME=todo_app
DB_PORT=3306
TEST_DB=todo_app_test
```

Once you have the `.env` file and you have Docker installed on the machine, you can run the following command to run docker-compose and start the DB and API containers.

`docker-compose up -d`

Once up and running you can use a HTTP tool like _postman_, _insomnia_, or _thunder client for VSCode_ to make requests to the API. The available endpoints are listed below and would be prepended with `localhost:5001`

## Required Features

- [✅] - Todo must have an ID, TITLE, and PRIORITY.
- [✅] - Follow the MVC (Model, View, Controller) structure.
- [✅] - Have the following endpoints:
  - [✅] GET /api/todos
  - [✅] GET /api/todos/:todoId
  - [✅] POST /api/todos
  - [✅] PUT /api/todos/:todoId
  - [✅] DELETE /api/todos/:todoId

## Extension Features

- [✅] - GET /todos - Add the following query params:
  - [✅] /api/todos?title=searchText
  - [✅] /api/todos?priority=asc
  - [✅] /api/todos?priority=desc

## Custom Extension

- [✅] - Tested all `endpoints` with `Jest`
- [✅] - TypeScript
- [✅] - Custom Logger
- [✅] - Custom Errors

## Endpoints

- `GET /api/todos` - Returns an array of all Todos
- `GET /api/todos/1` - Returns the todo with an `ID` of `1`
- `POST /api/todos` - Create a new todo => `{ "title": "Sample Title", "priority: "high" }`
- `PUT /api/todos/1` - Updates a todo with an `ID` of `1` => `{ "title": "New Title" }`
- `DELETE /api/todos/1` - Deleted the todo with an `ID` of `1`

## Testing

- `GET /api/todos`
  - Should return an array of todos
  - Should be able to search from `title` Example: `/api/todos?title='clean'`
  - Should sort results `ASC` in `priority` Example: `/api/todos?priority=ASC`
  - Should sort results `DESC` in `priority` Example: `/api/todos?priority=DESC`
- `POST /api/todos`
  - should return a status code of `201` and the newly created todo
  - should return a status code of `400` when not provided a priority
  - should return a status code of `400` when not provided a title
- `GET /api/todos/:todoId`
  - should return a status code of `200` and the correct todo if the ID exists
  - should return a status code of `404` when the ID does not exist
- `PUT /api/todos/:todoId`
  - should get a status code of `200` when updating the title
  - should get a status code of `200` when updating the priority
  - should get a status code of `404` when the ID does not exist
- `DELETE /api/todos/:todoId`
  - should return a status code of `200` when successfully deleting a todo
  - should return a status code of `404` when the ID does not exist
