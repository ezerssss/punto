import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { FirebaseError } from 'firebase/app';
import { AuthErrorCodes } from 'firebase/auth';
import { toast } from 'sonner';
import {
    isToday,
    isYesterday,
    startOfWeek,
    endOfWeek,
    startOfMonth,
    endOfMonth,
    subMonths,
    format,
    subWeeks,
    isEqual,
} from 'date-fns';
import { TransactionType } from '@/app/schemas/transaction';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function toastError(error: unknown) {
    console.error(error);

    let message = 'Something went wrong.';

    if (error instanceof FirebaseError) {
        if (error.code === AuthErrorCodes.INTERNAL_ERROR) {
            message = error.message;
        } else if (error.code === AuthErrorCodes.INVALID_LOGIN_CREDENTIALS) {
            message = 'Invalid username or password';
        } else {
            message = error.message;
        }
    } else if (error instanceof Error) {
        message = error.message;
    } else if (typeof error === 'string') {
        message = error;
    }

    toast.error(message);
}

export function categorizeDates(date1?: Date, date2?: Date): string {
    if (!date1 || !date2) {
        return 'Invalid date';
    }

    const now = new Date();

    // Check for "Today"
    if (isToday(date1) && isToday(date2)) {
        return 'Today';
    }

    // Check for "Yesterday"
    if (isYesterday(date1) && isYesterday(date2)) {
        return 'Yesterday';
    }

    // Check for "This Week"
    const thisWeekStart = startOfWeek(now, { weekStartsOn: 0 });
    const thisWeekEnd = endOfWeek(now, { weekStartsOn: 0 });
    if (isEqual(date1, thisWeekStart) && isEqual(date2, thisWeekEnd)) {
        return 'This Week';
    }

    // Check for "Last Week"
    const lastWeekStart = startOfWeek(subWeeks(now, 1), { weekStartsOn: 0 });
    const lastWeekEnd = endOfWeek(subWeeks(now, 1), { weekStartsOn: 0 });
    if (isEqual(date1, lastWeekStart) && isEqual(date2, lastWeekEnd)) {
        return 'Last Week';
    }

    // Check for "This Month"
    const thisMonthStart = startOfMonth(now);
    const thisMonthEnd = endOfMonth(now);
    if (isEqual(date1, thisMonthStart) && isEqual(date2, thisMonthEnd)) {
        return 'This Month';
    }

    // Check for "Last Month"
    const lastMonthStart = startOfMonth(subMonths(now, 1));
    const lastMonthEnd = endOfMonth(subMonths(now, 1));
    if (isEqual(date1, lastMonthStart) && isEqual(date2, lastMonthEnd)) {
        return 'Last Month';
    }

    // Default: Format the date range
    const formattedDate1 = format(date1, 'MMM dd, yyyy');
    const formattedDate2 = format(date2, 'MMM dd, yyyy');
    return `${formattedDate1} - ${formattedDate2}`;
}

export function numberWithCommas(number: number): string {
    return number
        .toFixed(2)
        .replace(/[.,]00$/, '')
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export function getNumberOfCustomersFromTransactions(
    transactions: TransactionType[]
): number {
    const customerIdSet = new Set();

    for (const transaction of transactions) {
        customerIdSet.add(transaction.customer_id);
    }

    return customerIdSet.size;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function fieldSorter(field: string): (a: any, b: any) => number {
    let dir: number = 1;
    if (field.startsWith('-')) {
        dir = -1;
        field = field.substring(1);
    } else {
        dir = 1;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return function (a: any, b: any) {
        const first = field.split('.').reduce((o, i) => o[i], a);
        const second = field.split('.').reduce((o, i) => o[i], b);

        if (typeof first === 'string') {
            return first.localeCompare(second) * dir;
        } else {
            if (first > second) return dir;
            if (first < second) return -dir;
        }

        return 0;
    };
}
