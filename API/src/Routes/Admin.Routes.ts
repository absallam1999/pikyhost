import express from 'express';
import { AdminPasswordController } from '../Handlers/Admin.Handler';
import { authenticate } from '../Middlewares/Auth.middleware';

const router = express.Router();

router.post('/validate', AdminPasswordController.login);

router.get('/', authenticate, AdminPasswordController.getAll);
router.post('/', authenticate, AdminPasswordController.create);
router.delete('/:id', authenticate, AdminPasswordController.deleteById);

export default router;
