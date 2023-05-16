import express from "express";
import  AddItemCtrl  from "./additem.controller.js";
import multer from "multer";
const upload = multer({dest:"uploads/"})// specify the directory to which files should be uploaded
const router = express.Router();

router.route("/")
    .post(upload.single("image"), AddItemCtrl.apiAddItem);
    

export default router;
