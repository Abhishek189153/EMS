const express = require("express");
const router = express.Router();
const {register,
       login,
       getAllUsers,
       getUserById,
       updateUser,
       deleteUser,
       searchUsers } = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);
router.get("/", getAllUsers);               
router.get("/search", searchUsers);         
router.get("/:id", getUserById);           
router.put("/:id", updateUser);             
router.delete("/:id", deleteUser);          


module.exports = router;
