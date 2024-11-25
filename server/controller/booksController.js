const books = require("../db/models/books");
const user = require("../db/models/user");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

const createProject = catchAsync(async (req, res, next) => {
  const body = req.body;
  const userId = req.user.id;

  const newBook = await books.create({
    title: body.title,
    genre: body.genre,
    author: body.author,
    coverImageUrl: body.coverImageUrl,
    shortDescription: body.shortDescription,
    isbn: body.isbn,
    createdBy: userId,
  });

  return res.status(201).json({
    status: "success",
    data: newBook,
  });
});

const getAllBooks = catchAsync(async (req, res, next) => {
  const result = await books.findAll({ include: user });

  return res.json({
    status: "success",
    bookData: result,
  });
});

const getAllBooksByUser = catchAsync(async (req, res, next) => {
  const userId = req.user.id;
  const result = await books.findAll({
    include: user,
    where: { createdBy: userId },
  });
  
  return res.json({
    status: "success",
    bookByUser: result,
  });
});

const getBookById = catchAsync(async (req, res, next) => {
  const bookId = req.params.id;
  const result = await books.findByPk(bookId, { include: user });
  if (!result) {
    return next(new AppError("Invalid book id", 400));
  }

  return res.json({
    status: "success",
    bookDataId: result,
  });
});

const updatedBooks = catchAsync(async (req, res, next) => {
  const userId = req.user.id;
  const bookId = req.params.id;
  const body = req.body;

  const result = await books.findOne({
    where: { id: bookId, createdBy: userId },
  });

  if (!result) {
    return next(new AppError("Not the user who created", 400));
  }

  result.title = body.title;
  result.genre = body.genre;
  result.author = body.author;
  result.coverImageUrl = body.coverImageUrl;
  result.description = body.description;
  result.shortDescription = body.shortDescription;
  result.isbn = body.isbn;

  const updatedResult = await result.save();

  return res.json({
    status: "success",
    data: updatedResult,
  });
});

const deleteBooks = catchAsync(async (req, res, next) => {
  const userId = req.user.id;
  const bookId = req.params.id;
  const body = req.body;

  const result = await books.findOne({
    where: { id: bookId, createdBy: userId },
  });

  if (!result) {
    return next(new AppError("Not the user who created", 400));
  }

  await result.destroy();

  return res.json({
    status: "success",
    message: "Record delted successfully",
  });
});

module.exports = {
  createProject,
  getAllBooks,
  getAllBooksByUser,
  getBookById,
  updatedBooks,
  deleteBooks,
};
