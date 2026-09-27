// controllers/articlesController.js
// Контролер відповідає за логіку обробки запитів, пов'язаних зі статтями.

const getArticles = (req, res, next) => {
  try {
    res.send('Get articles route');
  } catch (err) {
    next(err);
  }
};

const postArticles = (req, res, next) => {
  try {
    res.send('Post articles route');
  } catch (err) {
    next(err);
  }
};

const getArticleById = (req, res, next) => {
  try {
    const { articleId } = req.params;
    res.send(`Get article by Id route: ${articleId}`);
  } catch (err) {
    next(err);
  }
};

const putArticleById = (req, res, next) => {
  try {
    const { articleId } = req.params;
    res.send(`Put article by Id route: ${articleId}`);
  } catch (err) {
    next(err);
  }
};

const deleteArticleById = (req, res, next) => {
  try {
    const { articleId } = req.params;
    res.send(`Delete article by Id route: ${articleId}`);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getArticles,
  postArticles,
  getArticleById,
  putArticleById,
  deleteArticleById,
};
