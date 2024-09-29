import { Router } from 'express';
import { loginCtrl, logoutCtrl, registerCtrl } from '../controllers/auth.ctrl';
import {
    loginLimiterMW,
    registerLimiterMW,
} from '../middlewares/rateLimiter.mw';

const router = Router();

router.post('/login', loginLimiterMW, loginCtrl);

router.get('/logout', logoutCtrl);

router.post('/register', registerLimiterMW, registerCtrl);

export default router;
