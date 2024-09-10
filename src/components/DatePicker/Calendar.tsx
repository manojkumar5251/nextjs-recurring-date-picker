"use client";
import React, { useContext } from "react";
import dayjs, { Dayjs } from "dayjs";
import { useUncontrolled } from "@/hooks";
import { CalendarHeader } from "./Header";
import { CalendarMonths } from "./Months";
import { CalendarDates } from "./Dates";
import { CalendarWeek } from "./Weeks";
import { RecurringDatesContext } from "../RecurringDatePicker/context";

interface ICalendar {
  className?: React.HTMLAttributes<HTMLDivElement>["className"];
  selectedDate?: Dayjs[];
  setSelectedDate?: (value: Dayjs[]) => void;
  minDate?: Dayjs;
  maxDate?: Dayjs;
}

export const Calendar: React.FC<ICalendar> = (props) => {
  const ctx = useContext(RecurringDatesContext);
  const {
    minDate,
    maxDate,
    className,
    selectedDate = ctx.selectedDate,
    setSelectedDate = ctx.setSelectedDate,
  } = props;

  const [displayDate, setDisplayDate] = useUncontrolled({
    defaultValue: dayjs(),
  });
  const [_selectedDate, _setSelectedDate] = useUncontrolled({
    value: selectedDate,
    onChange: setSelectedDate,
    defaultValue: [],
  });
  const [selectMonths, setSelectMonths] = useUncontrolled({
    defaultValue: false,
  });

  const incrementMonthYear = () => {
    selectMonths
      ? setDisplayDate(displayDate.year(displayDate.year() + 1))
      : setDisplayDate(displayDate.month(displayDate.month() + 1));
  };

  const decrementMonthYear = () => {
    selectMonths
      ? setDisplayDate(displayDate.year(displayDate.year() - 1))
      : setDisplayDate(displayDate.month(displayDate.month() - 1));
  };

  const resetDates = () => {
    setDisplayDate(dayjs());
    _setSelectedDate([dayjs()]);
  };

  const highlightRecurringDates = (date: Dayjs) => {
    const date1 = dayjs(date.format("YYYY-MM-DD"));
    const date2 = dayjs((_selectedDate?.[0] || dayjs())?.format("YYYY-MM-DD"));

    let isRecurring = false;

    switch (ctx.recurringRules.frequency) {
      case "daily": {
        isRecurring =
          date1.isSameOrAfter(date2, "d") &&
          date1.diff(date2, "d") % ctx.recurringRules.interval! === 0;
        break;
      }
      case "weekly": {
        isRecurring =
          date1.isSameOrAfter(date2, "d") &&
          (date1.week() - date2.week()) % ctx.recurringRules.interval! === 0 &&
          ctx.recurringRules.values!.includes(date1.day());
        break;
      }

      case "monthly": {
        isRecurring =
          ctx.recurringRules.values?.findIndex(
            (el: Dayjs) => el.date() === date1.date()
          ) !== -1;

        break;
      }

      case "yearly": {
        isRecurring =
          date1.isSameOrAfter(date2, "d") &&
          date1.date() === ctx.recurringRules.values?.[0].date() &&
          date1.month() === ctx.recurringRules.values?.[0].month();
        break;
      }
    }

    return isRecurring;
  };

  const headerText = selectMonths
    ? displayDate.year()
    : `${displayDate.format("MMM")} ${displayDate.year()}`;

  return (
    <div className={`w-64 ${className}`}>
      <CalendarHeader
        onNextClick={incrementMonthYear}
        onPrevClick={decrementMonthYear}
        onCurrentClick={resetDates}
        onClick={() => setSelectMonths(true)}
        content={headerText}
      />

      {selectMonths && (
        <CalendarMonths
          selectedMonth={displayDate.month()}
          onMonthSelect={(val) => {
            setDisplayDate(displayDate.month(val));
            setSelectMonths(false);
          }}
        />
      )}

      {!selectMonths && (
        <React.Fragment>
          <CalendarWeek />

          <CalendarDates
            minDate={minDate}
            maxDate={maxDate}
            selectedDate={_selectedDate}
            setSelectedDate={_setSelectedDate}
            displayDate={displayDate}
            highlightDates={highlightRecurringDates}
          />
        </React.Fragment>
      )}
    </div>
  );
};
