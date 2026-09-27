// controllers/usersController.js
// Контролер відповідає за логіку обробки запитів, пов'язаних з користувачами.
// Кожен метод обгорнутий у try/catch, щоб непередбачені помилки передавались
// у централізований errorHandler через next(err).

const getUsers = (req, res, next) => {
  try {
    res.send('Get users route');
  } catch (err) {
    next(err);
  }
};

const postUsers = (req, res, next) => {
  try {
    res.send('Post users route');
  } catch (err) {
    next(err);
  }
};

const getUserById = (req, res, next) => {
  try {
    const { userId } = req.params;
    res.send(`Get user by Id route: ${userId}`);
  } catch (err) {
    next(err);
  }
};

const putUserById = (req, res, next) => {
  try {
    const { userId } = req.params;
    res.send(`Put user by Id route: ${userId}`);
  } catch (err) {
    next(err);
  }
};

const deleteUserById = (req, res, next) => {
  try {
    const { userId } = req.params;
    res.send(`Delete user by Id route: ${userId}`);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getUsers,
  postUsers,
  getUserById,
  putUserById,
  deleteUserById,
};
