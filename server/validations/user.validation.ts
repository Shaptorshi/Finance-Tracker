import { z } from 'zod'

export const registerValidate = z.object({
    name: z.string().min(3, "Name must contain atleast 3 characters!"),
    email: z.string().email("Invalid email format"),
    password: z.string().min(8, "Password must contain atleast 8 characters").regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@_$])[A-Za-z\d@_$]+$/, "Password must include uppercase, lowercase, number and special characters"),
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ['confirmPassword'],
});

export const loginValidate = z.object({
    email: z.string().email("Invalid email format"),
    password: z.string().min(8)
})

export const recordValidate = z.object({
    type: z.enum(['income', 'expense'], "Type is required"),
    category: z.string().min(1, "Category is required"),
    amount: z.number().positive("Amount must be greater than 0"),
})

export const budgetValidate = z.object({
    name: z.string().min(3, "Name must contain atleast 3 characters!"),
    balance: z.number({ error: "Balance must be a number" }).min(0, 'Amount must be greater than 0'),
    interestRate: z.number({ error: "Interest Rate must be a number" }).min(0, 'Interest Rate cannot be negative').max(100, 'Interest Rate cannot exceed 100%'),
    minimumPayment: z.number({ error: "Minimum Payment must be a number" }).min(0, 'Minimum payment cannot be negative'),
    // userId: z.string().nonempty('User ID is required')

})