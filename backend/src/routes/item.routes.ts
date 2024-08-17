import { Router } from 'express';
import {
  getItems,
  addItem,
  updateItem,
  removeItem,
} from '../controller/item.controller';

const router = Router();

router.get('/getItems', getItems);
router.post('/addItem', addItem);
router.patch('/updateItem/:id', updateItem);
router.delete('/removeItem/:id', removeItem);

export default router;
