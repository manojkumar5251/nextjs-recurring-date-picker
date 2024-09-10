import React from "react";

interface ICalendarMonths {
  onMonthSelect?: (value: number) => void;
  selectedMonth?: number;
  className?: React.HTMLAttributes<HTMLDivElement>["className"];
}

export const CalendarMonths: React.FC<ICalendarMonths> = (props) => {
  const { selectedMonth, onMonthSelect, className } = props;
  const monthsArr = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return (
    <div
      className={`grid grid-cols-4 gap-5 text-xs justify-items-center ${className}`}
    >
      {monthsArr.map((el, i) => {
        return (
          <div
            key={el}
            onClick={() => onMonthSelect?.(i)}
            className={`flex justify-center items-center h-8 w-8 p-0.5 cursor-pointer border rounded-full ${
              selectedMonth === i ? "bg-cyan-500	text-white" : ""
            }`}
          >
            {el}
          </div>
        );
      })}
    </div>
  );
};
