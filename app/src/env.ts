import { z } from "zod";

const envSchema = z.object({
    SMTP_SERVICE: z.string(),
    SMTP_USER: z.string(),
    SMTP_PASS: z.string()
})

export const env = envSchema.parse(process.env)