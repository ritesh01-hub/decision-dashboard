import axios from "axios";
import { decisionSchema } from "../schemas/decisionSchema";
import type { DecisionData } from "../schemas/decisionSchema";

const API_URL = "http://localhost:3000/decisions/decision-1";

export const fetchDecision = async (): Promise<DecisionData> => {
  const response = await axios.get(API_URL);

  return decisionSchema.parse(response.data);
};