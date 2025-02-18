export type StepType = 'do' | 'rest';

export interface Step {
  type: StepType;
  description?: string;
  time: number;
}