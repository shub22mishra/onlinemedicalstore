const express = require("express");
const router = express.Router();
const { addUser } = require("../modules/users/service/userService");
const {
  registerSchema,
} = require("../modules/users/validations/authValidation");
const {
  joiErrorFormatter,
  mongooseErrorFormatter,
} = require("../utils/validationFormatter");
const passport = require("passport");

/**
 * Shows page for user registration
 */
router.get("/register", (req, res) => {
  return res.render("register", { message: {}, formData: {}, errors: {} });
});

/**
 * Handles user registration
 */
router.post("/register", async (req, res) => {
  try {
    const validationResult = registerSchema.validate(req.body, {
      abortEarly: false,
    });
    if (validationResult.error) {
      return res.render("register", {
        message: {
          type: "error",
          body: "Validation Errors",
        },
        errors: joiErrorFormatter(validationResult.error),
        formData: req.body,
      });
    }
    const user = await addUser(req.body);
    return res.render("register", {
      message: {
        type: "success",
        body: "Registration success",
      },
      errors: {},
      formData: req.body,
    });
  } catch (e) {
    console.error(e);
    return res.status(400).render("register", {
      message: {
        type: "error",
        body: "Validation Errors",
      },
      errors: mongooseErrorFormatter(e),
      formData: req.body,
    });
  }
});

/**
 * Shows page for user login
 */
router.get("/login", (req, res) => {
  return res.render("login", { message: {}, formData: {}, errors: {} });
});

/**
 * Logs in a user
 */
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
  }),
  (req, res) => {
    console.log(req.user);

    return res.render("login", {
      message: {
        type: "success",
        body: "Login success",
      },
      formData: {},
      errors: {},
    });
  }
);
router.get("/about", (req, res) => {
  return res.render("about", { message: {}, formData: {}, errors: {} });
});
router.get("/prescription", (req, res) => {
  return res.render("prescription", { message: {}, formData: {}, errors: {} });
});
router.get("/medicine", (req, res) => {
  return res.render("medicine", { message: {}, formData: {}, errors: {} });
});
router.get("/checkout", (req, res) => {
  return res.render("checkout", { message: {}, formData: {}, errors: {} });
});
router.get("/order", (req, res) => {
  return res.render("order", { message: {}, formData: {}, errors: {} });
});
router.get("/final", (req, res) => {
  return res.render("final", { message: {}, formData: {}, errors: {} });
});
module.exports = router;
