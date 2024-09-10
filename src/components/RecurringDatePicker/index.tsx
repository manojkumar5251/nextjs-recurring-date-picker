import React, { useState } from "react";
import { RecurringSelect } from "./RecurringSelect";
import dayjs, { Dayjs } from "dayjs";
import { Calendar } from "../DatePicker/Calendar";
import { useUncontrolled } from "@/hooks";
import { RecurringDatesContext } from "./context";
import { IRecurringRules } from "./types";
import { Popover } from "../Popover";
import { EndRecurring } from "./EndRecurring";

interface IRecurringDatePicker {
  selectedDate?: Dayjs[];
  setSelectedDate?: (value?: Dayjs[]) => void;
  recurringRules?: IRecurringRules;
  setRecurringRules?: (value?: IRecurringRules) => void;
  children: React.ReactNode;
}

export const RecurringDatePicker: React.FC<IRecurringDatePicker> = ({
  selectedDate,
  setSelectedDate,
  recurringRules,
  setRecurringRules,
  children,
}) => {
  const [_selectedDate, _setSelectedDate] = useUncontrolled({
    value: selectedDate,
    onChange: setSelectedDate,
    defaultValue: [],
  });
  const [_recurringRules, _setRecurringRules] =
    useUncontrolled<IRecurringRules>({
      value: recurringRules,
      onChange: setRecurringRules,
      defaultValue: {},
    });
  const [opened, setOpened] = useState(false);
  const [isRepeatEnabled, setIsRepeatEnabled] = useState(false);
  const [recurringEndRules, setRecurringEndRules] = useState({});

  const onClearAllData = () => {
    setOpened(false);
    _setSelectedDate([]);
    _setRecurringRules({});
    setIsRepeatEnabled(false);
    setRecurringEndRules({});
  };

  const onSubmit = () => {
    setOpened(false);
    if (!dayjs.isDayjs(_selectedDate?.[0])) {
      _setSelectedDate?.([dayjs()]);
    }
  };

  const content = (
    <div className="w-72">
      <RecurringDatesContext.Provider
        value={{
          isRepeatEnabled,
          setIsRepeatEnabled,
          selectedDate: _selectedDate,
          setSelectedDate: _setSelectedDate,
          recurringRules: _recurringRules,
          setRecurringRules: _setRecurringRules,
          recurringEndRules,
          setRecurringEndRules,
        }}
      >
        <Calendar className="w-72" />

        <RecurringSelect />
      </RecurringDatesContext.Provider>

      <EndRecurring
        {...{
          minDate: _selectedDate?.[0],

          isRepeatEnabled,
          recurringRules: _recurringRules,
          recurringEndRules,
          setRecurringEndRules,
        }}
      />

      <div className="flex justify-around gap-3 px-2 my-2">
        <button
          onClick={onClearAllData}
          className="flex-1 text-center py-1.5 px-4 gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
        >
          Clear
        </button>

        <button
          onClick={onSubmit}
          className="flex-1 text-center py-1.5 px-4 gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-cyan-500 text-white hover:bg-cyan-600 focus:outline-none focus:bg-cyan-600 disabled:opacity-50 disabled:pointer-events-none"
        >
          OK
        </button>
      </div>
    </div>
  );

  return <Popover {...{ opened, setOpened, content, children }} />;
};
