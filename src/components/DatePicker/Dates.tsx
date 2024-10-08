"use client";
import React from "react";
import dayjs, { Dayjs } from "dayjs";

interface ICalendarDates {
  showAllDays?: boolean;
  className?: React.HTMLAttributes<HTMLDivElement>["className"];
  minDate?: Dayjs;
  maxDate?: Dayjs;

  selectedDate?: Array<Dayjs>;
  setSelectedDate?: (value: Array<Dayjs>) => void;
  multiple?: boolean;
  displayDate: Dayjs;
  highlightDates?: (value: Dayjs) => boolean;
}

export const CalendarDates: React.FC<ICalendarDates> = (props) => {
  const {
    showAllDays,
    selectedDate,
    setSelectedDate,
    displayDate,
    className,
    multiple,
    highlightDates,
    minDate,
    maxDate,
  } = props;

  const daysInCurrentMonth = showAllDays ? 31 : displayDate.daysInMonth();
  const delayStartCount = showAllDays ? 0 : displayDate.date(1).day();

  const onClick = (date: Dayjs | 0, i: number) => {
    if (!dayjs.isDayjs(date)) {
      return;
    }

    if (multiple) {
      if (i === -1) {
        setSelectedDate?.([...selectedDate!, date]);
      } else {
        setSelectedDate?.([
          ...selectedDate!.slice(0, i),
          ...selectedDate!.slice(i + 1),
        ]);
      }
    } else {
      setSelectedDate?.([date]);
    }
  };

  return (
    <div
      className={`grid grid-cols-7 gap-1 text-xs justify-items-center ${className}`}
    >
      {Array.from(Array(delayStartCount)).map((_, i) => (
        <div key={i} className="h-8 w-8" />
      ))}

      {Array.from(Array(daysInCurrentMonth)).map((_, i) => {
        i = i + 1;
        const renderDate = displayDate.date(i);
        const selectedIndex = selectedDate!.findIndex((j) =>
          j?.isSame(renderDate, "days")
        );
        const selectedClassName =
          selectedIndex !== -1 ? "bg-cyan-500	text-white" : "";
        const recurringDateClassName =
          renderDate && highlightDates?.(renderDate) ? "bg-cyan-100" : "";

        const disabledClassname =
          (dayjs.isDayjs(minDate) && renderDate.isBefore(minDate, "date")) ||
          (dayjs.isDayjs(maxDate) && renderDate.isAfter(maxDate))
            ? "opacity-50 pointer-events-none cursor-not-allowed"
            : "";

        return (
          <div
            key={i}
            onClick={() => onClick(renderDate, selectedIndex)}
            className={`flex justify-center items-center h-8 w-8 p-0.5 cursor-pointer border rounded-full ${recurringDateClassName} ${selectedClassName} ${disabledClassname}`}
          >
            {i}
          </div>
        );
      })}
    </div>
  );
};
