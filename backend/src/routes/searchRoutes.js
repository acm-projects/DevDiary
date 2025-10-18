import express from 'express';
import { performSearch } from '../controllers/searchController.js';

const router = express.Router();

router.post('/', performSearch);

export default router;
