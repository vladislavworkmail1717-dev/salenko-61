# salenko-61 — Express API з мідлварами

ДЗ 61.1. Розширення існуючого Express-сервера за допомогою мідлварів (продовження salenko-60).

## Опис

Проект розширює REST API з ресурсами `users` та `articles` набором мідлварів: логування, автентифікація, валідація даних, управління сесіями та централізована обробка помилок. Архітектура MVC збережена, всі відповіді залишаються текстовими.

## Технології

- Node.js
- Express.js
- express-session

## Структура проекту

```
salenko-61/
├── controllers/
│   ├── rootController.js
│   ├── usersController.js
│   └── articlesController.js
├── middlewares/
│   ├── logger.js           # логування кожного запиту (метод, url, час)
│   ├── auth.js              # перевірка заголовка Authorization для /users
│   ├── validate.js          # валідація тіла запиту для POST/PUT /users
│   ├── accessControl.js     # перевірка прав (x-user-role) для зміни /articles
│   ├── session.js           # конфігурація express-session
│   ├── sessionTracker.js    # рахує кількість запитів у межах сесії
│   └── errorHandler.js      # централізований обробник помилок
├── routes/
│   ├── index.js
│   ├── usersRoutes.js
│   └── articlesRoutes.js
├── server.js
├── package.json
└── README.md
```

## Встановлення та запуск

```bash
npm install
npm start
```

Сервер стартує на `http://localhost:3000`.

## Мідлвари та їх застосування

| Мідлвар            | Де застосовується         | Що робить                                                                 |
|---------------------|----------------------------|-----------------------------------------------------------------------------|
| `logger`            | глобально (`app.use`)      | Логує метод, url та час кожного запиту — охоплює і `/`, і всі інші маршрути |
| `session` + `sessionTracker` | глобально          | Створює/підтримує сесію користувача, рахує кількість запитів у сесії       |
| `auth`              | `/users`, `/users/:userId` | Вимагає заголовок `Authorization`, інакше `401 Access denied`              |
| `validate`          | `POST/PUT /users`, `POST/PUT /users/:userId` | Вимагає поля `username` та `email` у тілі запиту, інакше `400`             |
| `accessControl`     | `/articles`, `/articles/:articleId` | `GET` дозволено всім; `POST/PUT/DELETE` вимагають заголовок `x-user-role: editor`, інакше `403` |
| `errorHandler`      | глобально, підключений останнім | Ловить помилки, передані через `next(err)`, повертає `500` з описом |

## Опис маршрутів

| Метод  | Маршрут              | Мідлвари                     | Відповідь                                      |
|--------|-----------------------|-------------------------------|--------------------------------------------------|
| GET    | `/`                   | logger, session               | `Get root route`                                  |
| GET    | `/users`              | auth                          | `Get users route`                                 |
| POST   | `/users`              | auth, validate                | `Post users route`                                |
| GET    | `/users/:userId`      | auth                          | `Get user by Id route: {userId}`                  |
| PUT    | `/users/:userId`      | auth, validate                | `Put user by Id route: {userId}`                  |
| DELETE | `/users/:userId`      | auth                          | `Delete user by Id route: {userId}`               |
| GET    | `/articles`           | accessControl                 | `Get articles route`                              |
| POST   | `/articles`           | accessControl                 | `Post articles route`                             |
| GET    | `/articles/:articleId`| accessControl                 | `Get article by Id route: {articleId}`            |
| PUT    | `/articles/:articleId`| accessControl                 | `Put article by Id route: {articleId}`            |
| DELETE | `/articles/:articleId`| accessControl                 | `Delete article by Id route: {articleId}`         |

## Перевірка (приклади curl)

```bash
# Головний маршрут
curl http://localhost:3000/

# /users без авторизації -> 401
curl -i http://localhost:3000/users

# /users з авторизацією -> 200
curl -i -H "Authorization: Bearer test" http://localhost:3000/users

# POST /users без обов'язкових полів -> 400
curl -i -X POST -H "Authorization: Bearer test" -H "Content-Type: application/json" -d '{}' http://localhost:3000/users

# POST /users з коректними даними -> 200
curl -i -X POST -H "Authorization: Bearer test" -H "Content-Type: application/json" \
  -d '{"username":"vlad","email":"vlad@example.com"}' http://localhost:3000/users

# GET /articles доступний без ролі
curl -i http://localhost:3000/articles

# POST /articles без ролі editor -> 403
curl -i -X POST http://localhost:3000/articles

# POST /articles з роллю editor -> 200
curl -i -X POST -H "x-user-role: editor" http://localhost:3000/articles

# Неіснуючий маршрут -> 404
curl -i http://localhost:3000/unknown-route
```
