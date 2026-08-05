import { z } from "zod";

const envSchema = z.object({
  DEEPSEEK_API_KEY: z.string().optional(),
  OPENAI_API_KEY: z.string().optional(),
});

const parsedEnv = envSchema.safeParse({
  DEEPSEEK_API_KEY: process.env.DEEPSEEK_API_KEY,
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
});

if (!parsedEnv.success) {
  console.error("Invalid environment variables", parsedEnv.error.format());
  throw new Error("Invalid environment variables");
}

export const env = parsedEnv.data;
