export interface IRecurringRules {
  frequency?: "daily" | "weekly" | "monthly" | "yearly";
  interval?: number;
  values?: Array<any>;
}
