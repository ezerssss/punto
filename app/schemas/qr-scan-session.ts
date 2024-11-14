import { z } from 'zod';

export const QRScanSessionSchema = z.object({
    business_id: z.string().min(1),
    employee_id: z.string().min(1),
    customer_id: z.string().min(1),
    timestamp: z.string().datetime(),
});

export type QRScanSessionType = z.infer<typeof QRScanSessionSchema>;

export const ScanQRCodeRequestSchema = z.object({
    customer_id: z.string().min(1),
});

export type ScanQRCodeRequestType = z.infer<typeof ScanQRCodeRequestSchema>;
