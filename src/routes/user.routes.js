const { Router } = require("express");
const userRouters = Router();

const CreateUserController = require("../modules/user/CreateUser/CreateUserController");
const createUserController = new CreateUserController();

const EditUserController = require("../modules/user/EditUser/EditUserController");
const editUserController = new EditUserController();

const EditPassUserController = require("../modules/user/EditPassUser/EditPassUserController");
const editPassUserController = new EditPassUserController();

const LoginController = require("../modules/user/Login/LoginController");
const loginController = new LoginController();

const VerifyTokenController = require("../modules/user/VerifyToken/VerifyTokenController");
const verifyTokenController = new VerifyTokenController();

userRouters.post("/", createUserController.handle);
userRouters.put("/:token", editUserController.handle);
userRouters.put("/pass/:id", editPassUserController.handle);
userRouters.post("/login", loginController.handle);
userRouters.get("/token/:token", verifyTokenController.handle);

module.exports = userRouters;
