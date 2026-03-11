import { Request, Response } from 'express'
import { userRecords } from '../models/record.model'
import { recordValidate } from '../validations/user.validation'

export const addFinancialRecords = async (req: Request, res: Response) => {
    try {
        const parsed = recordValidate.safeParse(req.body);

        if (!parsed.success) {
            return res.status(400).json({ message: parsed.error.issues[0].message });
        }

        const { type, category, amount } = req.body;

        const RECORDS = await userRecords.create({
            type,
            category,
            amount
        })

        return res.status(200).json({
            message: "Records added successfully",
            RECORDS: {
                type: RECORDS.type,
                category: RECORDS.category,
                amount: RECORDS.amount
            }
        })

    } catch (error) {
        res.status(500).json({ message: "Error: ", error })
    }
}

export const getFinancialRecords = async (req: Request, res: Response) => {
    try {
        const records = await userRecords.find().sort({ date: -1 });
        return res.status(200).json(records);
    } catch (error) {
        res.status(500).json({ message: "Server Error: ", error })
    }
}