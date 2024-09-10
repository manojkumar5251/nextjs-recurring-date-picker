import React, { useState } from "react";
import { Popover } from "../Popover";
import { Dayjs } from "dayjs";
import { Calendar } from "../DatePicker/Calendar";
import { IRecurringRules } from "./types";

export const EndRecurring: React.FC<{
  recurringRules: IRecurringRules;
  minDate?: Dayjs;
  isRepeatEnabled: boolean;

  recurringEndRules: { date?: Dayjs; count?: number };
  setRecurringEndRules?: (value: { date?: Dayjs; count?: number }) => void;
}> = (props) => {
  const {
    recurringEndRules,
    setRecurringEndRules,
    isRepeatEnabled,
    recurringRules,
    minDate,
  } = props;
  const [opened, setopened] = useState(false);

  if (!isRepeatEnabled) {
    return null;
  }
  const isEndRepeatEnabled = Object.keys(recurringEndRules).length;

  return (
    <Popover
      opened={opened}
      content={
        <Calendar
          minDate={minDate}
          selectedDate={recurringEndRules?.date ? [recurringEndRules.date] : []}
          setSelectedDate={(e) => {
            setRecurringEndRules!({ date: e?.[0] });
            setopened(false);
          }}
        />
      }
    >
      <div
        className={`flex justify-between items-center relative text-sm text-gray-700 my-1 p-2 hover:bg-gray-100 rounded-md cursor-pointer ${
          isEndRepeatEnabled ? "bg-cyan-50" : ""
        }`}
        onClick={() => {
          setopened(true);
        }}
      >
        {isEndRepeatEnabled ? "End Repeat enabled" : "Repeat Ends"}

        {!!isEndRepeatEnabled && (
          <div
            className="flex justify-center items-center rotate-45 text-xl rounded-full h-6 w-6 hover:bg-gray-200"
            onClick={(e) => {
              e.stopPropagation();
              setopened(false);
              setRecurringEndRules!({});
            }}
          >
            +
          </div>
        )}
      </div>
    </Popover>
  );
};
