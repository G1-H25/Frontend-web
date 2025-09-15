import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../app/store";
import { fetchPackets, selectSortedPackets, setFilterArray } from "../redux/packetsSlice";
import PacketsItem from "./PacketsItem";
import useTempAlarmNotification from "../hooks/useTempAlarmNotification";
import { ChevronLeft, ChevronRight } from "lucide-react";
import FilterDropdown from "../components/FilterDropdown";
import type { Option } from "../components/FilterDropdown";
import FilterToggle from "../components/FilterToggle";

const PacketsList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const allPackets = useSelector((state: RootState) => state.packets.items); // alla paket
  const sortedPackets = useSelector(selectSortedPackets); // filtrerad lista för tabellen
  const filters = useSelector((state: RootState) => state.packets.filters);

  // Hämta data från API
  useEffect(() => {
    dispatch(fetchPackets());
  }, [dispatch]);

  // Kör notifikationer
  useTempAlarmNotification(
    sortedPackets.map((p) => ({
      sändningsnr: p.sändningsnr,
      currentTemp: p.currentTemp,
      expectedTempMin: p.expectedTemp.min,
      expectedTempMax: p.expectedTemp.max,
      currentHumidity: p.currentHumidity,
      expectedHumidityMin: p.expectedHumidity.min,
      expectedHumidityMax: p.expectedHumidity.max,
    }))
  );

  // Skapa filteralternativ från alla paket
  const routes: Option[] = [...new Set(allPackets.map((p) => p.rutt))].map((r) => ({
    value: r,
    label: r,
  }));

  const statusOptions: Option[] = [...new Set(allPackets.map((p) => p.status.text))].map((s) => ({
    value: s,
    label: s,
  }));

  // Hantera filterändring
  const handleFilterChange = (field: "rutt" | "status", values: string[]) => {
    dispatch(setFilterArray({ field, values }));
  };

  return (
    <div className="p-4 border border-[#9ACEFE] bg-white">
      <div className="flex items-center justify-center mt-4 mb-8">
        {/* Vänster knapp */}
        <button className="p-2 text-[#2782E2] hover:bg-[#EAF4FF] rounded-full transition active:scale-95">
          <ChevronLeft size={20} />
        </button>

        {/* Rubrik */}
        <h1 className="text-xl text-center text-[#2782E2] font-bold mx-4">
          Dagens paket
        </h1>

        {/* Höger knapp */}
        <button className="p-2 text-[#2782E2] hover:bg-[#EAF4FF] rounded-full transition active:scale-85">
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Filterdropdowns */}
      <div className="mb-4 flex gap-4 flex-row">
        <FilterDropdown
          label="Rutt"
          options={routes}
          selected={filters.rutt}
          onChange={(vals) => handleFilterChange("rutt", vals as string[])}
        />
        <FilterDropdown
          label="Status"
          options={statusOptions}
          selected={filters.status}
          onChange={(vals) => handleFilterChange("status", vals as string[])}
        />

        <FilterToggle />
      </div>

      {/* Tabell */}
      <table className="w-full border-separate border-spacing-y-2">
        <thead>
          <tr>
            <th className="text-center text-[#2782E2] px-4 py-2">Rutt</th>
            <th className="text-center text-[#2782E2] px-4 py-2">Sändningsnr</th>
            <th className="text-center text-[#2782E2] px-4 py-2">Status</th>
            <th className="text-center text-[#2782E2] px-4 py-2">Temperatur</th>
            <th className="text-center text-[#2782E2] px-4 py-2">Intervall</th>
            <th className="text-center text-[#2782E2] px-4 py-2">min/max</th>
            <th className="text-center text-[#2782E2] px-4 py-2">Fukt</th>
            <th className="text-center text-[#2782E2] px-4 py-2">Intervall</th>
            <th className="text-center text-[#2782E2] px-4 py-2">min/max</th>
            <th className="text-center text-[#2782E2] px-4 py-2">Avv. tid</th>
          </tr>
        </thead>
        <tbody>
          {sortedPackets.map((p, index) => (
            <PacketsItem key={index} {...p} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PacketsList;
