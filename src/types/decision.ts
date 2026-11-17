
export interface Option {
  id: string;
  name: string;
}

export interface Criterion {
  id: string;
  name: string;
  weight: number;
  type: "benefit" | "cost";
}

export interface Decision {
  id: string;
  title: string;
  options: Option[];
  criteria: Criterion[];
  scores: Record<string, Record<string, number>>;
}
