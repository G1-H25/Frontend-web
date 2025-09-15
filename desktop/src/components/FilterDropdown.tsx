import { useState, useEffect, useRef } from "react";
import { ChevronDown, ChevronUp, Check } from "lucide-react";

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
  const timerRef = useRef<number | null>(null);

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
    }, 2000); // 2 sekunder
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
        className="w-full flex items-center justify-between px-4 py-2 rounded-lg text-white font-medium bg-[#2782E2] hover:bg-[#D9F2FF] hover:text-[#2782E2] hover:border-[#2782E2] hover:cursor-pointer border border-[#2782E2] transition active:scale-95"
      >
        {label}
        {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>

      {/* Dropdown-panel */}
      {open && (
        <div
          className="absolute z-10 mt-2 w-[400px] border border-[#9ACEFE] rounded-lg bg-[#2782E2] text-white shadow-lg p-3 grid grid-flow-col auto-rows-max gap-2"
          style={{ gridTemplateRows: "repeat(5, minmax(0, 1fr))" }}
        >
          {options.map((opt) => {
            const isSelected = selected.includes(opt.value);
            return (
              <button
                key={opt.value}
                onClick={() => toggleOption(opt.value)}
                className={`relative w-full px-3 py-2 rounded-md border transition
                  ${isSelected
                    ? "bg-[#D9F2FF] border-[#2782E2] text-[#2782E2]"
                    : "bg-[#2782E2] text-white border border-[#2782E2] hover:bg-[#D9F2FF] hover:text-[#2782E2] hover:border-[#2782E2] hover:cursor-pointer"
                  }`}
              >
                <span className="block text-left">{opt.label}</span>
                {isSelected && (
                  <Check
                    size={16}
                    className="text-[#2782E2] absolute right-3 top-1/2 -translate-y-1/2"
                  />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
