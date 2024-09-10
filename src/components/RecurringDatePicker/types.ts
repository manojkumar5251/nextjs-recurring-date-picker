export interface IRecurringRules {
  repeatType?: "repeat" | "custom";
  frequency?: "daily" | "weekly" | "monthly" | "yearly";
  interval?: number;
  values?: Array<any>;
}
