import { Request, Response } from 'express'
import { budgetValidate } from '../validations/user.validation'
import { debt } from '../models/debt.model'


interface AuthRequest extends Request {
    userId?: string
}
export const addDebts = async (req: AuthRequest, res: Response) => {
    try {
        const parsed = budgetValidate.safeParse(req.body);

        if (!parsed.success) {
            return res.status(400).json({ message: parsed.error.issues[0].message })
        }

        const { name, balance, interestRate, minimumPayment } = req.body;

        const debts = await debt.create({
            name, balance, interestRate, minimumPayment, userId: req.userId
        })

        return res.status(200).json(debts)
    } catch (error) {
        return res.status(500).json({ message: error })
    }
}

export const getDebts = async (req: AuthRequest, res: Response) => {
    try {
        const debts = await debt.find({ userId: req.userId });
        res.status(200).json(debts);
    } catch (error) {
        res.status(500).json({ message: error })
    }

}

export const updateDebts = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        const debts = await debt.findByIdAndUpdate(id, updates, { new: true });
        res.status(200).json(debts);
    } catch (error) {
        res.status(500).json({ message: error });
    }
}
