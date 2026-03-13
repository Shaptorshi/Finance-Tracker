import { Request, Response } from 'express'
import { budgetValidate } from '../validations/user.validation'
import { debt } from '../models/debt.model'


export const addDebts = async (req: Request, res: Response) => {
    try {
        const parsed = budgetValidate.safeParse(req.body);

        if (!parsed.success) {
            return res.status(400).json({ message: parsed.error.issues[0].message })
        }

        const { name, balance, interestRate, minimumPayment } = req.body;

        const debts = await debt.create({
            name, balance, interestRate, minimumPayment
        })
        // console.log(`USER ID: ${req.userId}`)
        return res.status(200).json({
            // id:debts._id,
            name: debts.name,
            balance: debts.balance,
            interestRate: debts.interestRate,
            minimumPayment: debts.minimumPayment
        })
    } catch (error) {
        return res.status(500).json({ message: error })
    }
}

export const getDebts = async (req: Request, res: Response) => {
    try {
        const debts = await debt.find();
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

export const deleteDebts = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deleted = await debt.findByIdAndDelete(id);
        res.status(200).json(deleted)
    } catch (error) {
        res.status(500).json({ message: error })
    }
}
