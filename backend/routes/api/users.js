const express = require("express");
const bcrypt = require("bcryptjs");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User } = require("../../db/models");
const router = express.Router();

const { check, validationResult } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const validateSignup = [
  check("email")
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage("Please provide a valid email."),
  check("username")
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage("Please provide a username with at least 4 characters."),
  check("username").not().isEmail().withMessage("Username cannot be an email."),
  check("firstName")
    .exists({ checkFalsy: true })
    .withMessage("First Name is required"),
  check("lastName")
    .exists({ checkFalsy: true })
    .withMessage("Last Name is required"),
  check("password")
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage("Password must be 6 characters or more."),
  handleValidationErrors,
];

// Sign up
router.post("/", validateSignup, async (req, res) => {
  const { email, firstName, lastName, password, username } = req.body;

  const err = validationResult(req);
  if (!err.isEmpty()) {
    res.status(400);
    return res.json({
      message: "Bad Request",
      errors: err.array().reduce((acc, error) => {
        acc[error.param] = error.msg;
        return acc;
      }, {}),
    });
  }
  const existingEmail = await User.findOne({
    where: {
      email,
    },
  });

  const existingUserName = await User.findOne({
    where: {
      username,
    },
  });

  let errors = {};

  if (existingUserName) {
    errors.username = "Username already exists";
  }

  if (existingEmail) {
    errors.email = "User with that email already exists";
  }

  if (Object.keys(errors).length > 0) {
    res.status(500);
    return res.json({
      message: "Validation error",
      errors,
    });
  }

  const hashedPassword = bcrypt.hashSync(password);
  const user = await User.create({
    email,
    username,
    firstName,
    lastName,
    hashedPassword,
  });

  const safeUser = {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    username: user.username,
  };

  await setTokenCookie(res, safeUser);

  return res.json({
    user: safeUser,
  });
});

module.exports = router;
