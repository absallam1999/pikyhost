import express from 'express';
import { SectionsController } from '../Handlers/Sections.Handler';
import { authenticate } from '../Middlewares/Auth.middleware';

const router = express.Router();

router.get('/', SectionsController.getAll);
router.get('/:key_name', SectionsController.getByKeyName);

router.post('/', authenticate, SectionsController.create);
router.put('/:key_name', authenticate, SectionsController.update);
router.delete('/:key_name', authenticate, SectionsController.delete);

export default router;
