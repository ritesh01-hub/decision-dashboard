import { useQuery } from "@tanstack/react-query";
import { fetchDecision } from "../services/decisionApi";

export const useDecision = () => {
  return useQuery({
    queryKey: ["decision"],
    queryFn: fetchDecision,
  });
};