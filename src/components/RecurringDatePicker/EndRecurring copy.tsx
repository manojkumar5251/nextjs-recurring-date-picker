import React, { useState } from "react";
import { Popover } from "../Popover";
import { Dayjs } from "dayjs";
import { Calendar } from "../DatePicker/Calendar";
import { IRecurringRules } from "./types";

export const EndRecurring: React.FC<{
  recurringRules: IRecurringRules;
  minDate?: Dayjs;
  isRepeatEnabled: boolean;
  recurringEndType: string;
  setRecurringEndType?: (value: string) => void;
  recurringEndRules: { date?: Dayjs; count?: number };
  setRecurringEndRules?: (value: { date?: Dayjs; count?: number }) => void;
}> = (props) => {
  const {
    recurringEndRules,
    setRecurringEndRules,
    isRepeatEnabled,
    recurringEndType,
    setRecurringEndType,
    recurringRules,
    minDate,
  } = props;
  const [opened, setopened] = useState(false);

  const dateUI = (
    <Calendar
      minDate={minDate}
      selectedDate={recurringEndRules?.date ? [recurringEndRules.date] : []}
      setSelectedDate={(e) => {
        setRecurringEndRules!({ date: e?.[0] });
        setopened(false);
      }}
    />
  );

  const countUI = (
    <div className="px-2 pt-2">
      <div className="flex items-center justify-center text-sm w-56 ">
        Repeat Count
        <input
          min={1}
          type="number"
          value={recurringEndRules?.count}
          onChange={(e) => {
            setRecurringEndRules!({
              count: Number(e.target.value),
            });
          }}
          className="w-28 ml-5 p-1 rounded text-center leading-none text-sm focus-visible:outline-0 appearance-none border"
        />
      </div>

      <div className="flex justify-around gap-3 px-2 my-2">
        <button
          onClick={() => {
            setopened(false);
            setRecurringEndRules!({});
            setRecurringEndType!("");
          }}
          className="flex-1 text-center py-0.5 px-3 gap-x-2 text-sm font-medium rounded border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
        >
          Clear
        </button>

        <button
          onClick={() => {
            if (
              (recurringEndType === "count" &&
                recurringEndRules.hasOwnProperty("count")) ||
              (recurringEndType === "date" &&
                recurringEndRules.hasOwnProperty("date"))
            )
              setopened(false);
          }}
          className="flex-1 text-center py-0.5 px-3 gap-x-2 text-sm font-medium rounded border border-transparent bg-cyan-500 text-white hover:bg-cyan-600 focus:outline-none focus:bg-cyan-600 disabled:opacity-50 disabled:pointer-events-none"
        >
          OK
        </button>
      </div>
    </div>
  );

  if (!isRepeatEnabled || recurringRules.repeatType === "custom") {
    return null;
  }
  const isEndRepeatEnabled = Object.keys(recurringEndRules).length;

  return (
    <Popover
      opened={opened}
      content={
        recurringEndType === "date"
          ? dateUI
          : recurringEndType === "count"
          ? countUI
          : ""
      }
    >
      <div
        className={`relative text-sm text-gray-700 my-1 p-2 hover:bg-gray-100 rounded-md cursor-pointer ${
          isEndRepeatEnabled ? "bg-cyan-50" : ""
        }`}
        onClick={() => {
          if (recurringEndType) {
            setopened(true);
          }
        }}
      >
        <div className="flex justify-between items-center">
          {isEndRepeatEnabled ? "End Repeat enabled" : "Repeat Ends"}

          {!!isEndRepeatEnabled && (
            <div
              className="flex justify-center items-center rotate-45 text-xl rounded-full h-6 w-6 hover:bg-gray-200"
              onClick={(e) => {
                setRecurringEndType!("");
                setRecurringEndRules!({});
              }}
            >
              +
            </div>
          )}
        </div>
        {!recurringEndType && (
          <select
            value={recurringEndType}
            className="absolute top-0 bottom-0 left-0 right-0 opacity-0 cursor-pointer"
            onChange={(e) => {
              setopened(!!e.target.value);
              setRecurringEndType!(e.target.value);
              if (!e.target.value) {
                setRecurringEndRules!({});
              }
            }}
          >
            <option value="">Endless</option>
            <option value="date">End by date</option>
            <option value="count">End by count</option>
          </select>
        )}
      </div>
    </Popover>
  );
};
