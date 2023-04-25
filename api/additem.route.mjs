import express from "express";
import  AddItemCtrl  from "./additem.controller.js";

const router = express.Router();

router.route("/")
    .post(AddItemCtrl.apiAddItem);

export default router;
