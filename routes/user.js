const express = require("express");
const {
  saveUser,
  deleteAllUsers,
  getUserByName,
  getAllUsers,
  getUserById,
  login,
} = require("../controllers/user");
const router = express.Router();


router.get("/", getAllUsers);

router.post("/signup",saveUser);

router.post("/login", login);

/* -------------------- lab ------------------- */
router.get("/search", getUserByName);

router.delete("/",deleteAllUsers);
/* -------------------------------------------- */

/** get user by id **/
router.get("/:id", getUserById);

module.exports = router;
