import React from "react";

interface ICalendarHeader {
  onNextClick?: React.MouseEventHandler<HTMLDivElement>;
  onPrevClick?: React.MouseEventHandler<HTMLDivElement>;
  onCurrentClick?: React.MouseEventHandler<HTMLDivElement>;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  content: React.ReactNode;
}

export const CalendarHeader: React.FC<ICalendarHeader> = (props) => {
  const { onNextClick, onPrevClick, onCurrentClick, onClick, content } = props;

  return (
    <div className="flex justify-between">
      <div className="text-sm cursor-pointer" onClick={onClick}>
        {content}
      </div>

      <div className="flex text-gray-400 gap-2">
        {onPrevClick && (
          <div
            className="mt-px hover:bg-gray-100 px-1.5 cursor-pointer"
            onClick={onPrevClick}
          >
            {"<"}
          </div>
        )}
        {onCurrentClick && (
          <div className="cursor-pointer" onClick={onCurrentClick}>
            o
          </div>
        )}

        {onNextClick && (
          <div
            className="mt-px hover:bg-gray-100 px-1.5 cursor-pointer"
            onClick={onNextClick}
          >
            {">"}
          </div>
        )}
      </div>
    </div>
  );
};
