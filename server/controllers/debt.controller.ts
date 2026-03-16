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

        const { name, totalAmount, interestRate, minimumPayment } = req.body;

        const debts = await debt.create({
            userId: req.userId, name, totalAmount, interestRate, minimumPayment
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

export const updateDebts = async (req: AuthRequest, res: Response) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        const debts = await debt.findByIdAndUpdate(id, updates, { new: true });
        res.status(200).json(debts);
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

export const payDebts = async (req: AuthRequest, res: Response) => {
    try {
        const { amount } = req.body
        const { id } = req.params;
        const debts = await debt.findById(id);

        if (!debts) return res.status(404).json({ message: `Debt not found` });

        debts.totalAmount = debts.totalAmount - amount;

        if (debts.totalAmount <= 0) {
            await debt.findByIdAndDelete(id);
            return res.status(200).json({
                message: `Debt fully paid and cleared.`
            })
        }

        await debts.save()
        res.status(200).json(debts)
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

export const deleteDebts = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deleted = await debt.findByIdAndDelete(id);
        res.status(200).json(deleted)
    } catch (error) {
        res.status(500).json({ message: error })
    }
}
