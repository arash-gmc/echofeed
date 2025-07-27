"use client";
import { CheckIcon } from "@radix-ui/react-icons";
import { PostFiltersObject, PostFilters } from "../(main)/filter/Filters";
import { useState } from "react";
import useTheme from "next-theme";

interface Props {
  options: { label: string; value: PostFilters }[];
  status: PostFiltersObject;
  toggleStatus: (filter: PostFilters) => void;
  title?: String;
}

const MultiSelectingButtons = ({
  options,
  status,
  toggleStatus,
  title,
}: Props) => {
  const collapseNumber = 10;
  const [collapse, setCollapse] = useState(true);
  const { theme } = useTheme();
  if (options.length > collapseNumber && collapse) {
    options = [...options.slice(0, collapseNumber)];
  }

  const buttonClass =
    "py-3 px-4 inline-flex items-center gap-x-2  text-sm focus:z-10 border "
  const titleClass = buttonClass + " text-white font-bold rounded-t-xl";
  return (
    <div className="max-w-sm w-44 flex flex-col rounded-lg shadow-sm">
      {title && (
        <button
          type="button"
          className={titleClass}
          style={{ backgroundColor: "var(--accent-8)" }}
        >
          {title}
        </button>
      )}
      {options.map((option, index) => (
        <button
          type="button"
          className={
            buttonClass + (index === options.length - 1 ? " rounded-b-xl" : "")
          }
          key={option.value}
          style={{backgroundColor:"var(--gray-1)"}}
          onClick={() => {
            toggleStatus(option.value);
          }}
        >
          {status[option.value] && <CheckIcon />}
          {option.label}
        </button>
      ))}
      {collapse && options.length >= collapseNumber && (
        <button className={buttonClass} onClick={() => setCollapse(false)}>
          ...more
        </button>
      )}
    </div>
  );
};

export default MultiSelectingButtons;
