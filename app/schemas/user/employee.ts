import { Timestamp } from 'firebase/firestore';
import { z } from 'zod';

export const EmployeeUserDataSchema = z.object({
    employee_id: z.string().min(1),
    business_id: z.string().min(1),
    employee_name: z.string().min(1),
    username: z.string().min(1),
    password: z.string().min(6), // hashed using bcrypt
    date_created: z.instanceof(Timestamp),
});

export type EmployeeUserDataType = z.infer<typeof EmployeeUserDataSchema>;

export const EmployeePublicDataSchema = z.object({
    employee_name: z.string().min(1),
    username: z.string().min(1),
});

export type EmployeePublicDataType = z.infer<typeof EmployeePublicDataSchema>;

export const EmployeeUserSignUpSchema = EmployeeUserDataSchema.omit({
    business_id: true,
    employee_id: true,
    date_created: true,
}).extend({ password: z.string().min(6) });

export type EmployeeUserSignUpType = z.infer<typeof EmployeeUserSignUpSchema>;

export const EmployeeLoginSchema = z.object({
    username: z.string().min(1),
    password: z.string().min(6),
});

export type EmployeeLoginType = z.infer<typeof EmployeeLoginSchema>;
