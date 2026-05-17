import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(120),
  email: z.string().trim().email("Valid email required").max(255),
  company: z.string().trim().max(200).optional().default(""),
  service: z.string().trim().max(120).optional().default(""),
  message: z.string().trim().min(10, "Tell us a bit more").max(4000),
});
