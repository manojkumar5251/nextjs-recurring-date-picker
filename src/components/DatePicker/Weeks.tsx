import React from "react";
import { weekArr } from "./constants";

interface ICalendarWeek {
  className?: React.HTMLAttributes<HTMLDivElement>["className"];
  disabled?: boolean;
  values?: Array<number>;
  onChange?: (value: Array<number>) => void;
}

export const CalendarWeek: React.FC<ICalendarWeek> = (props) => {
  const { disabled = true, values = [], onChange, className } = props;

  return (
    <div
      className={`grid grid-cols-7 gap-1 text-xs justify-items-center ${className}`}
    >
      {weekArr.map((el, index) => {
        const selectedIndex = values.findIndex((i) => i === index);
        const selected = selectedIndex !== -1;

        return (
          <div
            key={el}
            onClick={() => {
              if (selectedIndex === -1) {
                onChange?.([...values, index]);
              } else {
                onChange?.([
                  ...values.slice(0, selectedIndex),
                  ...values.slice(selectedIndex + 1),
                ]);
              }
            }}
            className={`flex justify-center items-center h-8 w-8 p-0.5 ${
              !disabled ? "cursor-pointer border rounded-full" : ""
            } ${selected ? "bg-cyan-500	text-white" : "text-gray-400"}`}
          >
            {el[0]}
          </div>
        );
      })}
    </div>
  );
};
