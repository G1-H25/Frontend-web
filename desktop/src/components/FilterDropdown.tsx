import { useState, useEffect, useRef } from "react";
import { ChevronDown, ChevronUp, Check, RotateCw } from "lucide-react";

export type Option = {
  value: string | number;
  label: string;
};

type FilterDropdownProps = {
  label: string;
  options: Option[];
  selected?: (string | number)[];
  onChange?: (values: (string | number)[]) => void;
};

export default function FilterDropdown({
  label,
  options,
  selected: selectedProp = [],
  onChange,
}: FilterDropdownProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<(string | number)[]>(selectedProp);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setSelected(selectedProp);
  }, [selectedProp]);

  const toggleOption = (option: string | number) => {
    const newSelected = selected.includes(option)
      ? selected.filter((o) => o !== option)
      : [...selected, option];
    setSelected(newSelected);
    onChange?.(newSelected);
  };

  const handleReset = () => {
    setSelected([]);
    onChange?.([]);
  };

  const handleMouseEnter = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const handleMouseLeave = () => {
    timerRef.current = setTimeout(() => {
      setOpen(false);
      timerRef.current = null;
    }, 500);
  };

  return (
    <div
      className="relative inline-block w-full max-w-sm"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Filterknapp */}
      <button
        onClick={() => setOpen(!open)}
        className={`w-full flex items-center justify-between px-4 py-2 rounded-lg font-medium border transition active:scale-95
          ${selected.length > 0
            ? "bg-[#D9F2FF] text-[#2782E2] border-[#2782E2]"
            : "bg-[#2782E2] text-white border-[#2782E2] hover:bg-[#D9F2FF] hover:text-[#2782E2] shadow-lg hover:border-[#2782E2] hover:cursor-pointer"
          }`}
      >
        {label}
        {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>

      {/* Dropdown-panel */}
      {open && (
        <div
          className="
            absolute z-10 mt-2 w-[380px] 
            border border-[#9ACEFE] rounded-lg 
            bg-[#2782E2] text-white shadow-lg p-3
            flex flex-wrap gap-2
            overflow-auto
          "
          style={{
            maxHeight: "calc(5 * 3.5rem)", // max 5 rader, justera höjd per kort
          }}
        >
          {/* Reset-knapp */}
          {selected.length > 0 && (
            <button
              onClick={handleReset}
              className="flex w-full mb-2 items-center gap-2 px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition hover:cursor-pointer"
            >
              <RotateCw size={16} />
              <span>Återställ</span>
            </button>
          )}

          {options.map((opt) => {
            const isSelected = selected.includes(opt.value);
            return (
              <button
                key={opt.value}
                onClick={() => toggleOption(opt.value)}
                className={`flex items-center justify-between px-3 py-2 rounded-md border transition
                  ${isSelected
                    ? "bg-[#D9F2FF] border-[#2782E2] text-[#2782E2]"
                    : "bg-[#2782E2] text-white border border-[#2782E2] shadow-lg hover:bg-[#D9F2FF] hover:text-[#2782E2] hover:border-[#2782E2] hover:cursor-pointer"
                  }
                  max-w-full whitespace-nowrap
                `}
              >
                <span className="block">{opt.label}</span>

                {/* Plats för checkmark, alltid reserverad */}
                <span className="ml-2 flex-shrink-0 w-4 h-4 flex items-center justify-center">
                  {isSelected && <Check size={16} className="text-[#2782E2]" />}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
