import parsePhoneNumberFromString from 'libphonenumber-js';
import { z } from 'zod';

export const PhoneNumberSchema = z.string().transform((arg, ctx) => {
    const phone = parsePhoneNumberFromString(arg, {
        defaultCountry: 'PH',
        extract: false,
    });

    if (phone?.isValid()) {
        return phone.number;
    }

    ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Invalid phone number',
    });
    return z.NEVER;
});
