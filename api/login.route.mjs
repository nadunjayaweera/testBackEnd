import express from 'express';
const router = express.Router();
import loginController from './login.controller.js';

router.post('/login', (req, res) => {
  loginController.login(req, res);
});

export default router;
