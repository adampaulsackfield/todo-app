# Todo App

A todo application built using NodeJS, ExpressJS, MySQL and React.

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
- [✅] - User Model
- [✅] - Password Hashing (bcrypt)

## Endpoints

Todos

- `GET /api/todos` - Returns an array of all Todos
- `GET /api/todos/1` - Returns the todo with an `ID` of `1`
- `POST /api/todos` - Create a new todo:

  ```json
  { "title": "Sample Title", "priority: "high" }
  ```

- `PUT /api/todos/1` - Updates a todo with an `ID` of `1` => `{ "title": "New Title" }`
- `DELETE /api/todos/1` - Deleted the todo with an `ID` of `1`

Users

- `POST /api/users` - Create a new user:

  ```json
  {
  	"first_name": "Test",
  	"last_name": "User",
  	"username": "sampleuser123",
  	"email": "email@example.com",
  	"password": "password"
  }
  ```

- `POST /api/users/:userId` - Login a user:

```json
{
	"username": "sampleuser123",
	"password": "password"
}
```

## Testing

Todos

- `GET /api/todos`
  - Should return an array of todos
  - Should be able to search from `title` Example: `/api/todos?title='clean'`
  - Should sort results `ASC` in `priority` Example: `/api/todos?priority=ASC`
  - Should sort results `DESC` in `priority` Example: `/api/todos?priority=DESC`
- `POST /api/todos`
  - should return a status code of `201` and the newly created `Todo`
  - should return a status code of `400` when not provided a priority
  - should return a status code of `400` when not provided a title
- `GET /api/todos/:todoId`
  - should return a status code of `200` and the correct `Todo` if the ID exists
  - should return a status code of `404` when the ID does not exist
- `PUT /api/todos/:todoId`
  - should get a status code of `200` when updating the title
  - should get a status code of `200` when updating the priority
  - should get a status code of `404` when the ID does not exist
- `DELETE /api/todos/:todoId`
  - should return a status code of `200` when successfully deleting a `Todo`
  - should return a status code of `404` when the ID does not exist

Users

- `POST /api/users`
  - should return a status code of `201` and a newly created `User` with a hashed password
  - should return a status code of 400 when providing a username that fails length validation (5-20)
  - should return a status code of 400 when not providing a username
  - should return a status code of 400 when not providing a password
  - should return a status code of 400 when providing a password that fails length validation (< 8)
