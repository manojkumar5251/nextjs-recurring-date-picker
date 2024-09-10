import React, { useContext, useState } from "react";
import { Popover } from "../Popover";
import dayjs from "dayjs";
import { CalendarWeek } from "../DatePicker/Weeks";
import { CalendarDates } from "../DatePicker/Dates";
import { CalendarHeader } from "../DatePicker/Header";
import { IRecurringRules } from "./types";
import { RecurringDatesContext } from "./context";
import { useUncontrolled } from "@/hooks";
import { CalendarMonths } from "../DatePicker/Months";

const RecurringYearlySelect: React.FC = () => {
  const { recurringRules, setRecurringRules, selectedDate } = useContext(
    RecurringDatesContext
  );
  const [displayDate, setDisplayDate] = useUncontrolled({
    defaultValue: selectedDate?.[0] || dayjs(),
  });

  const incrementMonthYear = () => {
    const year = displayDate.year();
    const value = displayDate.month(displayDate.month() + 1);
    value.year() !== year;
    setDisplayDate(
      value.year() !== year
        ? displayDate.month(displayDate.month() + 1).year(year)
        : displayDate.month(displayDate.month() + 1)
    );
  };

  const decrementMonthYear = () => {
    const year = displayDate.year();
    const value = displayDate.month(displayDate.month() - 1);
    value.year() !== year;
    setDisplayDate(
      value.year() !== year
        ? displayDate.month(displayDate.month() - 1).year(year)
        : displayDate.month(displayDate.month() - 1)
    );
  };

  return (
    <React.Fragment>
      <CalendarHeader
        onNextClick={incrementMonthYear}
        onPrevClick={decrementMonthYear}
        content={displayDate.format("MMM")}
      />
      <CalendarDates
        showAllDays
        displayDate={displayDate}
        selectedDate={recurringRules.values}
        setSelectedDate={(values) => {
          setRecurringRules!({ ...recurringRules, values });
        }}
      />
    </React.Fragment>
  );
};

const SpecificDateSelect: React.FC = () => {
  const { recurringRules, setRecurringRules, selectedDate } = useContext(
    RecurringDatesContext
  );
  const [selectMonths, setSelectMonths] = useState(false);
  const [displayDate, setDisplayDate] = useUncontrolled({
    defaultValue: selectedDate?.[0] || dayjs(),
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
  return (
    <div className="w-52">
      <CalendarHeader
        onNextClick={incrementMonthYear}
        onPrevClick={decrementMonthYear}
        onClick={() => setSelectMonths(true)}
        content={
          selectMonths
            ? displayDate.year()
            : `${displayDate.format("MMM")} ${displayDate.year()}`
        }
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

          {/* <CalendarDates
            minDate={minDate}
            maxDate={maxDate}
            selectedDate={_selectedDate}
            setSelectedDate={_setSelectedDate}
            displayDate={displayDate}
            highlightDates={highlightRecurringDates}
          /> */}
        </React.Fragment>
      )}
    </div>
  );
};
export const RecurringSelect: React.FC = () => {
  const {
    recurringRules,
    setRecurringRules,
    selectedDate,
    setSelectedDate,
    isRepeatEnabled,
    setIsRepeatEnabled,
    setRecurringEndRules,
  } = useContext(RecurringDatesContext);

  const [repeatModeSelect, setrepeatModeSelect] = useState(false);

  const handleRepeatInterval = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (Number(e.target.value) <= 1) {
      e.target.value = "1";
    }
    setRecurringRules!({
      ...recurringRules,
      interval: Number(e.target.value),
    });
  };

  const handleFrequencySelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const frequency = e.target.value as IRecurringRules["frequency"];
    const values =
      frequency === "yearly"
        ? [dayjs()]
        : frequency === "monthly"
        ? [dayjs().month(0)]
        : frequency === "weekly"
        ? [dayjs().day()]
        : [];

    setRecurringRules!({ ...recurringRules, frequency, values });
  };

  const onClearRecurringRules = () => {
    setRecurringRules!({});
    setIsRepeatEnabled!(false);
    setrepeatModeSelect(false);
    setRecurringEndRules!({});
  };

  const onSubmitRecurringRules = () => {
    if (!dayjs.isDayjs(selectedDate?.[0])) {
      setSelectedDate?.([dayjs()]);
    }
    setIsRepeatEnabled!(true);
    setrepeatModeSelect(false);
  };

  const renderSelectFreqAndInterval = (
    <React.Fragment>
      <div className="flex gap-2">
        <div className="w-[100px] mb-2 relative border rounded-md ">
          <span className="absolute top-1/2 transform -translate-y-1/2 left-2 text-sm">
            Every
          </span>
          <input
            min={1}
            type="number"
            className="pr-2 text-right leading-none text-sm w-full focus-visible:outline-0 appearance-none"
            value={recurringRules.interval}
            onChange={handleRepeatInterval}
          />
        </div>

        <select
          value={recurringRules.frequency}
          onChange={handleFrequencySelect}
          className="w-[110px] mb-2 py-1 px-2 border border-gray-200 rounded-md text-sm focus-visible:outline-0"
        >
          <option value="daily">Day</option>
          <option value="weekly">Week</option>
          <option value="monthly">Month</option>
          <option value="yearly">Year</option>
        </select>
      </div>
      {recurringRules.frequency === "weekly" && (
        <CalendarWeek
          disabled={false}
          className="[&>div]:h-6 [&>div]:w-6"
          values={recurringRules.values}
          onChange={(e: any) => {
            setRecurringRules?.({ ...recurringRules, values: e });
          }}
        />
      )}

      {recurringRules.frequency === "monthly" && (
        <CalendarDates
          multiple
          className="[&>div]:h-6 [&>div]:w-6"
          displayDate={recurringRules.values?.[0]}
          selectedDate={recurringRules.values}
          setSelectedDate={(values) => {
            setRecurringRules?.({ ...recurringRules, values });
          }}
          showAllDays
        />
      )}

      {recurringRules.frequency === "yearly" && <RecurringYearlySelect />}
    </React.Fragment>
  );

  const content = (
    <div className="w-52 my-1.5 mx-3">
      {renderSelectFreqAndInterval}

      <div className="flex justify-around gap-3 px-2 my-2">
        <button
          onClick={onClearRecurringRules}
          className="flex-1 text-center py-0.5 px-4 gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
        >
          Clear
        </button>

        <button
          onClick={onSubmitRecurringRules}
          className="flex-1 text-center py-0.5 px-4 gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-cyan-500 text-white hover:bg-cyan-600 focus:outline-none focus:bg-cyan-600 disabled:opacity-50 disabled:pointer-events-none"
        >
          OK
        </button>
      </div>
    </div>
  );

  const handlePopover = (val: boolean) => {
    val &&
      !isRepeatEnabled &&
      setRecurringRules!({
        frequency: "daily",
        interval: 1,
        values: [],
      });
    !val && !isRepeatEnabled && setRecurringRules!({});
    setrepeatModeSelect(val);
  };

  return (
    <Popover
      opened={repeatModeSelect}
      setOpened={handlePopover}
      className="left-5 bottom-0"
      content={content}
    >
      <div
        className={`flex justify-between items-center text-sm font-light text-gray-700 mt-3 mb-2 p-2 hover:bg-gray-100 rounded-md cursor-pointer ${
          isRepeatEnabled ? "bg-cyan-50" : ""
        }`}
      >
        <div>{isRepeatEnabled ? "Repeat enabled" : "Select Repeat Dates"}</div>

        {isRepeatEnabled && (
          <div
            className="flex justify-center items-center rotate-45 text-xl rounded-full h-6 w-6 hover:bg-gray-200"
            onClick={(e) => {
              e.stopPropagation();
              onClearRecurringRules();
            }}
          >
            +
          </div>
        )}
      </div>
    </Popover>
  );
};
