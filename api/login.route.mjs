import express from 'express';
import loginController from './login.controller.js';

const router = express.Router();

router.post('/', loginController.loginUser);

export default router;
