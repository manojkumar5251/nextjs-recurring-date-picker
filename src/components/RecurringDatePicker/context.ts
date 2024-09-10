import { Dayjs } from "dayjs";
import { createContext } from "react";
import { IRecurringRules } from "./types";

interface IRecurringDatesContext {
  selectedDate?: Dayjs[];
  setSelectedDate?: (value: Dayjs[]) => void;
  recurringRules: IRecurringRules;
  setRecurringRules?: (value: IRecurringRules) => void;
  isRepeatEnabled: boolean;
  setIsRepeatEnabled?: (value: boolean) => void;
  recurringEndRules?: { date?: Dayjs; count?: number };
  setRecurringEndRules?: (value: { date?: Dayjs; count?: number }) => void;
}

export const RecurringDatesContext = createContext<IRecurringDatesContext>({
  recurringRules: {},
  isRepeatEnabled: false,
});
