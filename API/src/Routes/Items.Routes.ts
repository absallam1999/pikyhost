import express from 'express';
import { SectionItemController } from '../Handlers/Items.Handler';
import { authenticate } from '../Middlewares/Auth.middleware';

const router = express.Router();

router.get('/', SectionItemController.getAll);
router.get('/section/:id', SectionItemController.getBySectionId);
router.get('/:id', SectionItemController.getById);

router.post('/', authenticate, SectionItemController.create);
router.put('/:id', authenticate, SectionItemController.update);
router.delete('/:id', authenticate, SectionItemController.deleteById);
router.delete('/section/:id', authenticate, SectionItemController.deleteBySectionId);

export default router;
