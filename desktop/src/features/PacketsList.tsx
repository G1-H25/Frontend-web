import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../app/store";
import { fetchPackets, selectSortedPackets } from "../redux/packetsSlice";
import PacketsItem from "./PacketsItem";
import useTempAlarmNotification from "../hooks/useTempAlarmNotification";

const PacketsList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const sortedPackets = useSelector(selectSortedPackets);

  // Hämta data från API när komponenten mountas
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

  return (
    <div className="p-4 border border-[#9ACEFE] bg-white">
      <h1 className="text-xl text-center text-[#2782E2] font-bold mb-4">
        Dagens paket
      </h1>

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
