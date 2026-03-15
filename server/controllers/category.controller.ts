import { Request, Response } from "express";
import { category } from '../models/category.model'
import { categoryValidate } from '../validations/user.validation'

interface AuthRequest extends Request {
    userId?: string
}

export const addCategory = async (req: AuthRequest, res: Response) => {
    try {
        const parsed = categoryValidate.safeParse(req.body);

        if (!parsed.success) {
            return res.status(400).json({ message: parsed.error.issues[0].message })
        }

        const { name, type } = req.body;

        const CATEGORIES = await category.create({
            name,
            type,
            userId: req.userId
        })

        return res.status(200).json({ message: `Category created successfully`, categories: CATEGORIES })
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

export const getCategory = async (req: AuthRequest, res: Response) => {
    try {
        const categories = await category.find({ userId: req.userId }).sort({ createdAt: -1 })
        return res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

export const updateCategory = async (req: AuthRequest, res: Response) => {
    try {
        const updates = req.body;
        const updatedCategory = await category.findByIdAndUpdate(req.params.id, updates, { new: true })
        return res.status(200).json(updatedCategory);
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

export const deleteCategory = async (req: AuthRequest, res: Response) => {
    try {
        const { id } = req.params
        const deletedCategory = await category.findOneAndDelete({ _id: id, userId: req.userId });
        if (!deletedCategory) {
            return res.status(404).json({ message: `Category not found` })
        }
        return res.status(200).json(deletedCategory)
    } catch (error) {
        res.status(500).json({ message: error })
    }
}