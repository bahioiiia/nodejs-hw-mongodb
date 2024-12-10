import { Router } from 'express';
import * as authControllers from '../controllers/auth.js';
import ctrlWrapper from '../utils/ctrlWrapper.js';
import * as vldt from '../validation/auth.js'; //{ authLoginSchema, authRegisterSchema, resetPasswordSchema, requestResetEmailSchema }
import validateBody from '../utils/validateBody.js';

const authRouter = Router();

authRouter.post("/register", validateBody(vldt.authRegisterSchema), ctrlWrapper(authControllers.registerController));

authRouter.post("/login", validateBody(vldt.authLoginSchema), ctrlWrapper(authControllers.loginController));

authRouter.post("/refresh", ctrlWrapper(authControllers.refreshSessionController),);

authRouter.post('/logout', ctrlWrapper(authControllers.logoutController));
/* MAIL */
authRouter.post('/send-reset-email', validateBody(vldt.requestResetEmailSchema), ctrlWrapper(authControllers.requestResetEmailController),);

authRouter.post('/reset-pwd', validateBody(vldt.resetPasswordSchema), ctrlWrapper(authControllers.resetPasswordController),);
/* GOOGLE OAUTH */
authRouter.get('/get-oauth-url', ctrlWrapper(authControllers.getGoogleOAuthUrlController),);

authRouter.post('/confirm-oauth',validateBody(vldt.loginWithGoogleOAuthSchema),ctrlWrapper(authControllers.loginWithGoogleController),);

export default authRouter;