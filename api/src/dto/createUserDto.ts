import { z } from 'zod';

export const createUserSchema = z
  .object({
    login: z.string().min(1),
    password: z.string().min(1),
  })
  .required();

export type CreateUserDto = z.infer<typeof createUserSchema>;
