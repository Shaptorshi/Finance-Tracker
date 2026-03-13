import express from 'express';
import { Register, Login, editUser } from '../controllers/user.controller'
import { addFinancialRecords, getFinancialRecords } from '../controllers/records.controller'
import { addDebts, updateDebts, getDebts, deleteDebts } from '../controllers/debt.controller'
// import { authMiddleware } from '../middleware/debt.middleware'

const router = express.Router();

router.post('/register', Register);
router.post('/login', Login);
router.put('/settings/:id', editUser);
//financial records(income or expense) 
router.post('/financialRecords', addFinancialRecords)
router.get('/financialRecords', getFinancialRecords)

router.post('/debts', addDebts);
router.get('/debts', getDebts);
router.put('/debts/:id', updateDebts);
router.delete('/debts/:id', deleteDebts);

export default router