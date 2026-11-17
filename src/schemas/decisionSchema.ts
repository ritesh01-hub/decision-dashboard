
import { z } from "zod";

export const optionSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
});

export const criterionSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  weight: z.number().min(0),
  type: z.enum(["benefit", "cost"]),
});

export const decisionSchema = z.object({
  id: z.string(),
  title: z.string().min(1),
  options: z.array(optionSchema).min(2),
  criteria: z.array(criterionSchema).min(1),
  scores: z.record(
    z.string(),
    z.record(z.string(), z.number())
  ),
});

export type DecisionData = z.infer<typeof decisionSchema>;
