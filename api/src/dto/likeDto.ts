import { z } from 'zod';

export const likeDto = z
  .object({
    user_id: z.string().min(1),
    cat_id: z.string().min(1),
  })
  .required();

export type LikeDto = z.infer<typeof likeDto>;
