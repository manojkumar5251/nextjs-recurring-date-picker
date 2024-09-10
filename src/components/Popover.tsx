"use client";
import React from "react";
import { useUncontrolled } from "../hooks";

export const Popover: React.FC<{
  children: React.ReactNode;
  content: React.ReactNode;
  opened?: boolean;
  setOpened?: (value: boolean) => void;
  className?: React.HTMLAttributes<HTMLDivElement>["className"];
}> = ({ children, content, className, opened, setOpened }) => {
  const [isOpen, setIsOpen] = useUncontrolled({
    defaultValue: false,
    value: opened,
    onChange: setOpened,
  });

  const togglePopover = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <div onClick={togglePopover}>{children}</div>
      {isOpen && (
        <React.Fragment>
          <div
            className={`absolute z-10 w-max bg-white border border-gray-200 rounded-md shadow-lg p-1 mt-1 ${className}`}
          >
            {content}
          </div>
        </React.Fragment>
      )}
    </div>
  );
};
