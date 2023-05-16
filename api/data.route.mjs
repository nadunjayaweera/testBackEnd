// data.route.mjs

import express from "express";
import DataController from "./data.controller.mjs";

const router = express.Router();

router.get("/", DataController.getData);
router.post("/", DataController.addData);

export default router;
