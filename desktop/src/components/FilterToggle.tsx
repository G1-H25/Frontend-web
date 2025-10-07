import { useDispatch, useSelector } from "react-redux";
import { Check } from "lucide-react";
import type { RootState } from "../app/store";
import { setFilterBoolean } from "../features/packets/packetsSlice";

const FilterToggle = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state: RootState) => state.packets.filters);

  const isSelected = filters.timeOutsideRange;

  const toggle = () => {
    dispatch(setFilterBoolean({ field: "timeOutsideRange", value: !isSelected }));
  };

  return (
    <button
      onClick={toggle}
      className={`relative w-[115px] px-3 py-2 rounded-md border transition
        ${isSelected
          ? "bg-[#D01338] border-[#D01338] text-white"
          : "bg-[#2782E2] text-white border border-[#2782E2] hover:bg-[#D9F2FF] hover:text-[#2782E2] hover:border-[#2782E2] hover:cursor-pointer"
        }`}
    >
      <span className="block text-left">Larmat?</span>
      {isSelected && (
        <Check
          size={16}
          className="text-white absolute right-3 top-1/2 -translate-y-1/2"
        />
      )}
    </button>
  );
};

export default FilterToggle;
