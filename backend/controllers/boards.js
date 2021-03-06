import ErrorResponse from '../utils/errorResponse.js';
import asyncHandler from '../middleware/async.js';
import Board from '../models/Board.js';
import Activity from '../models/Activity.js';

/* ----------------------------- Get all boards ----------------------------- */

// @desc      Get all boards for user
// @route     GET /api/boards
// @access    Private
export const getBoards = asyncHandler(async (req, res, next) => {
  const userBoards = await Board.find({ user: req.user.id });

  res.status(200).json(userBoards);
});

/* ---------------------------- Get single board ---------------------------- */

// @desc      Get single board
// @route     GET /api/boards/:id
// @access    Private
export const getBoard = asyncHandler(async (req, res, next) => {
  const board = await Board.findById(req.params.id);

  if (!board) {
    return next(
      new ErrorResponse(`Board with id ${req.params.id} not found`, 404)
    );
  }

  res.status(200).json(board);
});

/* ------------------------------ Create board ------------------------------ */

// @desc      Create new board
// @route     POST /api/boards
// @access    Private
export const createBoard = asyncHandler(async (req, res, next) => {
  // Add user to req.body
  req.body.user = req.user.id;

  const board = await Board.create(req.body);

  // Create new activity document when board is created
  await Activity.create({
    documentType: 'board',
    typeOfActivity: 'added',
    valueOfActivity: board.title,
    user: req.user,
    board: board._id,
  });

  res.status(201).json(board);
});

/* ------------------------------ Update board ------------------------------ */

// @desc      Update board
// @route     PUT /api/boards/:id
// @access    Private
export const updateBoard = asyncHandler(async (req, res, next) => {
  let board = await Board.findById(req.params.id);

  const { title, favorite, description, backgroundImage } = req.body;

  if (!board) {
    return next(
      new ErrorResponse(`Board with id ${req.params.id} not found`, 404)
    );
  }

  // Make sure user is board owner
  if (board.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to edit board with id ${req.params.id}`,
        404
      )
    );
  }

  // Create new activity document based on board changes
  await Activity.create({
    documentType: 'board',
    typeOfActivity:
      (board.description && description && 'changed') ||
      (backgroundImage && 'changed') ||
      (title && 'renamed') ||
      'changed',
    valueOfActivity:
      title ||
      description ||
      backgroundImage ||
      (favorite && 'true') ||
      (!favorite && 'false'),
    previousPropertyValue:
      (title && board.title) ||
      (description && board.description) ||
      (backgroundImage && board.backgroundImage) ||
      (favorite && 'false') ||
      (!favorite && 'true'),
    propertyChanged:
      (title && 'title') ||
      (description && 'description') ||
      (backgroundImage && 'background image') ||
      ((favorite || !favorite) && 'favorite'),
    user: req.user,
    board: req.params.id,
  });

  board = await Board.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json(board);
});

/* ------------------------------ Delete board ------------------------------ */

// @desc      Delete board
// @route     DELETE /api/boards/:id
// @access    Private
export const deleteBoard = asyncHandler(async (req, res, next) => {
  const board = await Board.findById(req.params.id);

  if (!board) {
    return next(
      new ErrorResponse(`Board with id ${req.params.id} not found`, 404)
    );
  }

  // Make sure user is board owner
  if (board.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to edit board with id ${req.params.id}`,
        404
      )
    );
  }

  // Create new activity document when board is deleted
  await Activity.create({
    documentType: 'board',
    typeOfActivity: 'deleted',
    valueOfActivity: board.title,
    user: req.user,
    board: board._id,
  });

  await board.remove();

  res.status(200).json({ id: req.params.id });
});

/* ------------------------------- View board ------------------------------- */

// @desc      View board
// @route     PUT /api/boards/:id/recent
// @access    Private
export const viewBoard = asyncHandler(async (req, res, next) => {
  let board = await Board.findById(req.params.id);

  if (!board) {
    return next(
      new ErrorResponse(`Board with id ${req.params.id} not found`, 404)
    );
  }

  // Make sure user is board owner
  if (board.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to edit board with id ${req.params.id}`,
        404
      )
    );
  }

  board = await Board.findByIdAndUpdate(
    req.params.id,
    { updatedAt: req.body.time },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json(board);
});

/* ------------------------ Get 5 most recent boards ------------------------ */

// @desc      Get 5 most recent boards
// @route     Get /api/boards/recent
// @access    Private
export const getRecentBoards = asyncHandler(async (req, res, next) => {
  const boards = await Board.find({ user: req.user.id })
    .sort({ updatedAt: -1 })
    .limit(5);

  res.status(200).json(boards);
});
