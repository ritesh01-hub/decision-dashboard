import axios from "axios";
import { z } from "zod";
import { decisionSchema } from "../schemas/decisionSchema";
import type { DecisionData } from "../schemas/decisionSchema";

const API_URL = "/db.json";

const dbSchema = z.object({
  decisions: z.array(decisionSchema),
});

export const fetchDecision = async (): Promise<DecisionData> => {
  const response = await axios.get(API_URL);
  const { decisions } = dbSchema.parse(response.data);

  const decision = decisions.find((d) => d.id === "decision-1");
  if (!decision) {
    throw new Error("Decision not found");
  }

  return decision;
};