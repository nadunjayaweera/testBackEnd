import express from "express";
import SignupCtrl from "./signup.controller.js";

const router = express.Router();

router.route("/")
    .get(SignupCtrl.apiGetSignup)
    .post(SignupCtrl.apiPostSignup);

export default router;
