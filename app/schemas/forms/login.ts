import { z } from "zod";

export const LoginFormSchema = z.object({
    email: z.string().email({ message: "Must be a valid email." }),
    password: z.string().min(6, { message: "Password is required." }),
});

export type LoginFormType = z.infer<typeof LoginFormSchema>;
