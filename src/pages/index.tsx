import { RecurringDatePicker } from "@/components";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import weekOfYear from "dayjs/plugin/weekOfYear";
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
dayjs.extend(weekOfYear);

export default function Home() {
  return (
    <div className="flex flex-col	">
      <h1 className="my-5 font-black">Recurring Date picker</h1>
      <RecurringDatePicker>
        <button className="text-center py-1.5 px-4 text-sm font-medium rounded-lg border border-transparent bg-cyan-500 text-white hover:bg-cyan-600 focus:outline-none focus:bg-cyan-600 disabled:opacity-50 disabled:pointer-events-none">
          Date picker
        </button>
      </RecurringDatePicker>
    </div>
  );
}
