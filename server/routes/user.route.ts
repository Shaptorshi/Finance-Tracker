import express from 'express';
import { Register, Login, editUser } from '../controllers/user.controller'
import { addFinancialRecords, getFinancialRecords } from '../controllers/records.controller'
import { addDebts, updateDebts, getDebts, deleteDebts, payDebts } from '../controllers/debt.controller'
import { addCategory, deleteCategory, getCategory, updateCategory } from '../controllers/category.controller'
import { authMiddleware } from '../middleware/debt.middleware'

const router = express.Router();

router.post('/register', Register);
router.post('/login', Login);
router.put('/settings/:id', editUser);
//financial records(income or expense) 
router.post('/financialRecords', authMiddleware, addFinancialRecords)
router.get('/financialRecords', authMiddleware, getFinancialRecords)

router.post('/debts', authMiddleware, addDebts);
router.get('/debts', authMiddleware, getDebts);
router.put('/debts/:id', authMiddleware, updateDebts);
router.patch('/debts/:id', authMiddleware, payDebts)
router.delete('/debts/:id', authMiddleware, deleteDebts);

router.post('/categories', authMiddleware, addCategory)
router.get('/categories', authMiddleware, getCategory)
router.put('/categories', authMiddleware, updateCategory)
router.delete('/categories/:id', authMiddleware, deleteCategory)

export default router