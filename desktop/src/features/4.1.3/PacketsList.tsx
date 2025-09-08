import { useState } from "react";
import PacketsItem from "./PacketsItem";

const exampleHistory = [
  { text: "Order skapad", timestamp: "08:30" },
  { text: "Lastad på bil", timestamp: "09:15" },
  { text: "Levererad", timestamp: "11:30" },
];

const PacketsList = () => {
  const [selectedPacket, setSelectedPacket] = useState<any | null>(null);

  const packets = [
    {
      rutt: "Stockholm",
      sändningsnr: "123456",
      expectedTemp: { min: 2, max: 8 },
      currentTemp: 5.0,
      minTempMeasured: 4.8,
      maxTempMeasured: 6.1,
      timeOutsideRange: 0,
      status: { text: "Order skapad", timestamp: "08:30" },
    },
    {
      rutt: "Göteborg",
      sändningsnr: "654321",
      expectedTemp: { min: 2, max: 8 },
      currentTemp: 9.1,
      minTempMeasured: 4.2,
      maxTempMeasured: 9.1,
      timeOutsideRange: 12,
      status: { text: "Lastad på bil", timestamp: "09:15" },
    },
    {
      rutt: "Stockholm",
      sändningsnr: "121212",
      expectedTemp: { min: 2, max: 8 },
      currentTemp: 5.0,
      minTempMeasured: 4.7,
      maxTempMeasured: 6.3,
      timeOutsideRange: 0,
      status: { text: "Levererad", timestamp: "11:30" },
    },
    {
      rutt: "Malmö",
      sändningsnr: "111111",
      expectedTemp: { min: 2, max: 8 },
      currentTemp: 4.0,
      minTempMeasured: 3.2,
      maxTempMeasured: 5.1,
      timeOutsideRange: 0,
      status: { text: "Order skapad", timestamp: "08:00" },
    },
    {
      rutt: "Umeå",
      sändningsnr: "222222",
      expectedTemp: { min: 2, max: 8 },
      currentTemp: 6.4,
      minTempMeasured: 5.0,
      maxTempMeasured: 7.2,
      timeOutsideRange: 0,
      status: { text: "Lastad på bil", timestamp: "08:30" },
    },
    {
      rutt: "Örebro",
      sändningsnr: "333333",
      expectedTemp: { min: 2, max: 8 },
      currentTemp: 3.2,
      minTempMeasured: 2.8,
      maxTempMeasured: 5.4,
      timeOutsideRange: 0,
      status: { text: "Order skapad", timestamp: "09:00" },
    },
    {
      rutt: "Göteborg",
      sändningsnr: "131313",
      expectedTemp: { min: 2, max: 8 },
      currentTemp: 6.8,
      minTempMeasured: 4.9,
      maxTempMeasured: 7.4,
      timeOutsideRange: 0,
      status: { text: "Levererad", timestamp: "12:00" },
    },
    {
      rutt: "Helsingborg",
      sändningsnr: "444444",
      expectedTemp: { min: 2, max: 8 },
      currentTemp: 7.3,
      minTempMeasured: 5.5,
      maxTempMeasured: 7.9,
      timeOutsideRange: 0,
      status: { text: "Lastad på bil", timestamp: "09:15" },
    },
    {
      rutt: "Karlstad",
      sändningsnr: "555555",
      expectedTemp: { min: 2, max: 8 },
      currentTemp: 5.0,
      minTempMeasured: 3.9,
      maxTempMeasured: 5.8,
      timeOutsideRange: 0,
      status: { text: "Order skapad", timestamp: "09:30" },
    },
    {
      rutt: "Linköping",
      sändningsnr: "666666",
      expectedTemp: { min: 2, max: 8 },
      currentTemp: 2.0,
      minTempMeasured: 2.0,
      maxTempMeasured: 2.5,
      timeOutsideRange: 0,
      status: { text: "Lastad på bil", timestamp: "10:00" },
    },
    {
      rutt: "Jönköping",
      sändningsnr: "777777",
      expectedTemp: { min: 2, max: 8 },
      currentTemp: 8.0,
      minTempMeasured: 6.2,
      maxTempMeasured: 8.0,
      timeOutsideRange: 0,
      status: { text: "Order skapad", timestamp: "10:15" },
    },
    {
      rutt: "Göteborg",
      sändningsnr: "202020",
      expectedTemp: { min: 2, max: 8 },
      currentTemp: 3.2,
      minTempMeasured: -1.0,
      maxTempMeasured: 6.5,
      timeOutsideRange: 12,
      status: { text: "Åter inom intervallet", timestamp: "12:15" },
    },
    {
      rutt: "Gävle",
      sändningsnr: "888888",
      expectedTemp: { min: 2, max: 8 },
      currentTemp: 6.0,
      minTempMeasured: 5.1,
      maxTempMeasured: 6.7,
      timeOutsideRange: 0,
      status: { text: "Lastad på bil", timestamp: "10:30" },
    },
    {
      rutt: "Borås",
      sändningsnr: "999999",
      expectedTemp: { min: 2, max: 8 },
      currentTemp: 9.0,
      minTempMeasured: 4.6,
      maxTempMeasured: 10.2,
      timeOutsideRange: 25,
      status: { text: "Order skapad", timestamp: "10:45" },
    },
    {
      rutt: "Sundsvall",
      sändningsnr: "101010",
      expectedTemp: { min: 2, max: 8 },
      currentTemp: 5.5,
      minTempMeasured: 3.9,
      maxTempMeasured: 6.7,
      timeOutsideRange: 0,
      status: { text: "Lastad på bil", timestamp: "11:00" },
    },
  ];

  // sorteringslogik
  const sortedPackets = [...packets].sort((a, b) => {
    const aOutNow = a.currentTemp < a.expectedTemp.min || a.currentTemp > a.expectedTemp.max;
    const bOutNow = b.currentTemp < b.expectedTemp.min || b.currentTemp > b.expectedTemp.max;

    if (aOutNow !== bOutNow) return aOutNow ? -1 : 1;

    const aWasOut = a.timeOutsideRange > 0;
    const bWasOut = b.timeOutsideRange > 0;

    if (aWasOut !== bWasOut) return aWasOut ? -1 : 1;

    return a.rutt.localeCompare(b.rutt, "sv"); // A–Ö sortering på rutt
  });

  return (
    <div className="relative">
      <div className="p-4 border border-[#9ACEFE] bg-white">
        <h1 className="text-xl text-center text-[#2782E2] font-bold mb-4">Dagens paket</h1>
        <table className="w-full border-separate border-spacing-y-2">
          <thead>
            <tr>
              <th className="text-center text-[#2782E2] px-4 py-2">Rutt</th>
              <th className="text-center text-[#2782E2] px-4 py-2">Sändningsnr</th>
              <th className="text-center text-[#2782E2] px-4 py-2">Status</th>
              <th className="text-center text-[#2782E2] px-4 py-2">Nuvarande temp</th>
              <th className="text-center text-[#2782E2] px-4 py-2">Förväntad temp</th>
              <th className="text-center text-[#2782E2] px-4 py-2">Mätt min/max</th>
              <th className="text-center text-[#2782E2] px-4 py-2">Avvikande tid</th>
            </tr>
          </thead>
          <tbody>
            {sortedPackets.map((p, index) => (
              <PacketsItem
                key={index}
                {...p}
                onClick={() => setSelectedPacket(p)}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Popup panel */}
      {selectedPacket && (
        <div
          className="fixed top-1/2 right-0 translate-y-[-50%] w-[30vw] min-w-[300px] max-w-[400px] h-[70vh] bg-white shadow-2xl border-l border-[#9ACEFE] z-50 p-6 flex flex-col rounded-l-2xl transition-transform duration-300 ease-out"
          style={{ boxShadow: "0 8px 32px rgba(39,130,226,0.12)" }}
        >
          <button
            className="self-end mb-4 text-[#2782E2] font-bold hover:underline"
            onClick={() => setSelectedPacket(null)}
          >
            Stäng ✕
          </button>
          <h2 className="text-lg font-bold text-[#2782E2] mb-4">
            Historik för {selectedPacket.sändningsnr}
          </h2>
          <ul className="space-y-3 overflow-y-auto">
            {(selectedPacket.history || exampleHistory).map((h: any, i: number) => (
              <li key={i} className="border-b pb-2 flex items-center">
                <span className="font-semibold text-[#2782E2]">{h.text}</span>
                <span className="ml-auto text-gray-500">{h.timestamp}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PacketsList;
