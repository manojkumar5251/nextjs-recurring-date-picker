"use client";
import React from "react";
import { useUncontrolled } from "@/hooks";
import { Popover } from "../Popover";
import { Calendar } from "./Calendar";
import { Dayjs } from "dayjs";

interface IDatePicker {
  className?: React.HTMLAttributes<HTMLDivElement>["className"];
  selectedDate?: Dayjs[];
  setSelectedDate?: (value: Dayjs[]) => void;
  children: React.ReactNode;
}

export const DatePicker: React.FC<IDatePicker> = (props) => {
  const { className, selectedDate, setSelectedDate, children } = props;
  const [opened, setOpened] = useUncontrolled({ defaultValue: false });

  return (
    <Popover
      opened={opened}
      content={
        <Calendar
          selectedDate={selectedDate}
          setSelectedDate={(val) => {
            setSelectedDate?.(val);
            setOpened(false);
          }}
          className={className}
        />
      }
    >
      <div onClick={() => setOpened(true)}>{children}</div>
    </Popover>
  );
};
