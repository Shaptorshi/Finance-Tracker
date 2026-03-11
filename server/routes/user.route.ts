import express from 'express';
import { Register, Login } from '../controllers/user.controller'
import { addFinancialRecords, getFinancialRecords } from '../controllers/records.controller'
import { addDebts, updateDebts, getDebts } from '../controllers/debt.controller'
import { authMiddleware } from '../middleware/debt.middleware'

const router = express.Router();

router.post('/register', Register);
router.post('/login', Login);

//financial records(income or expense) 
router.post('/financialRecords', addFinancialRecords)
router.get('/financialRecords', getFinancialRecords)

router.post('/debts', authMiddleware, addDebts);
router.get('/debts', authMiddleware, getDebts);
router.put('/debts/:id', authMiddleware, updateDebts);
export default router