import express from "express";
import UsersController from "./users.controller.js";

const router = express.Router();

router.get("/", UsersController.apiGetUsers);

export default router;
