import { z } from 'zod';
import { errorMessages } from '../constants/TextMessages';

export const loginSchema = z.object({
  email: z.string().email({ message: errorMessages.email }),
  password: z
    .string()
    .min(6, { message: errorMessages.password.min })
    .regex(/\d/, { message: errorMessages.password.number })
    .regex(/[A-Z]/, { message: errorMessages.password.uppercase })
    .regex(/[!@#$%^&*(),.?":{}|<>]/, {
      message: errorMessages.password.special,
    }),
});

export type LoginData = z.infer<typeof loginSchema>;
