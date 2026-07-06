import { z } from 'zod';

/**
 * Zod schema for validating the request body when creating or updating a dog.
 * Matches the IDog interface fields (excluding server-managed fields like id, timestamps, isDeleted).
 */
export const dogSchema = z.object({
    breed: z.string().min(1),
    subBreads: z.array(z.string().min(1)),
});
