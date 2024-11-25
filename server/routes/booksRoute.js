const { authentication } = require("../controller/authorizationController");
const {
  createProject,
  getAllBooks,
  getBookById,
  updatedBooks,
  deleteBooks,
  getAllBooksByUser,
} = require("../controller/booksController");

const router = require("express").Router();

router
  .route("/api/v1/")
  .post(authentication, createProject)
  .get(authentication, getAllBooks)
  
router.route('/api/v1/user/').get(authentication, getAllBooksByUser);

router
  .route("/books/:id")
  .get(authentication, getBookById)
  .put(authentication, updatedBooks)
  .delete(authentication, deleteBooks);


module.exports = router;
