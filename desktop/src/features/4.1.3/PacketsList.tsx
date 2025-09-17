import { useState, useEffect } from "react";
import PacketsItem from "./PacketsItem";
import React from "react";

const exampleHistory = [
  { text: "Order skapad", timestamp: "08:30" },
  { text: "Lastad på bil", timestamp: "09:15" },
  { text: "Levererad", timestamp: "11:30" },
];

const statusOptions = [
  "Order skapad",
  "Lastad på bil",
  "Levererad",
  "Åter inom intervallet",
  "Avbruten",
];

const PacketsList = () => {
  const [selectedPacket, setSelectedPacket] = useState<any | null>(null);
  const [showPanel, setShowPanel] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editPacket, setEditPacket] = useState<any | null>(null);

  const packets = [
    {
      rutt: "Stockholm",
      sändningsnr: "123456",
      kund: "ICA Maxi",
      destination: "Storgatan 1, Stockholm",
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
      kund: "Coop",
      destination: "Kungsportsavenyen 10, Göteborg",
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
      kund: "Hemköp",
      destination: "Drottninggatan 50, Stockholm",
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
      kund: "Lidl",
      destination: "Södra Förstadsgatan 100, Malmö",
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
      kund: "Willys",
      destination: "Rådhusesplanaden 10, Umeå",
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
      kund: "City Gross",
      destination: "Västerlånggatan 5, Örebro",
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
      kund: "Coop",
      destination: "Nordstan, Göteborg",
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
      kund: "ICA",
      destination: "Helsingborg C, Helsingborg",
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
      kund: "Hemköp",
      destination: "Västra Torggatan 1, Karlstad",
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
      kund: "Willys",
      destination: "Storgatan 10, Linköping",
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
      kund: "ICA Maxi",
      destination: "Huvudgatan 1, Jönköping",
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
      kund: "Coop",
      destination: "Göteborg C, Göteborg",
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
      kund: "Hemköp",
      destination: "Gävle C, Gävle",
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
      kund: "Willys",
      destination: "Borås C, Borås",
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
      kund: "ICA",
      destination: "Sundsvall C, Sundsvall",
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

  useEffect(() => {
    if (selectedPacket) {
      // Start animation on next tick
      setTimeout(() => setShowPanel(true), 10);
    } else {
      setShowPanel(false);
    }
  }, [selectedPacket]);

  // Spara ändringar
  const handleSave = () => {
    // Här kan du lägga till logik för att spara till backend/global state
    Object.assign(selectedPacket, editPacket);
    setEditMode(false);
  };

  // Avbryt leverans
  const handleCancelDelivery = () => {
    setEditPacket({
      ...editPacket,
      status: { text: "Avbruten", timestamp: new Date().toLocaleTimeString().slice(0, 5) },
    });
  };

  // När popup öppnas, kopiera paketet till editPacket
  useEffect(() => {
    if (selectedPacket) {
      setEditPacket({ ...selectedPacket });
      setTimeout(() => setShowPanel(true), 10);
    } else {
      setShowPanel(false);
      setEditMode(false);
    }
  }, [selectedPacket]);

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
          className={`
            fixed top-1/2 right-0 translate-y-[-50%] w-[30vw] min-w-[300px] max-w-[400px] h-[70vh]
            bg-white shadow-2xl border-l border-[#9ACEFE] z-50 p-6 flex flex-col rounded-l-2xl
            transition-transform duration-700 ease-out
            ${showPanel ? "translate-x-0" : "translate-x-full"}
          `}
          style={{ boxShadow: "0 8px 32px rgba(39,130,226,0.12)" }}
        >
          <button
            className="self-end mb-4 text-[#2782E2] font-bold hover:underline"
            onClick={() => setSelectedPacket(null)}
          >
            Stäng ✕
          </button>
          <h2 className="text-lg font-bold text-[#2782E2] mb-2">
            Paketinformation
          </h2>
          {!editMode ? (
            <>
              <div className="mb-4 text-sm text-gray-700">
                <div><span className="font-semibold">Rutt:</span> {selectedPacket.rutt}</div>
                <div><span className="font-semibold">Sändningsnr:</span> {selectedPacket.sändningsnr}</div>
                <div><span className="font-semibold">Kund:</span> {selectedPacket.kund || "-"}</div>
                <div><span className="font-semibold">Destination:</span> {selectedPacket.destination || "-"}</div>
                <div><span className="font-semibold">Status:</span> {selectedPacket.status.text} ({selectedPacket.status.timestamp})</div>
              </div>
              <div className="flex gap-2 mb-4">
                <button
                  className="bg-[#2782E2] text-white px-3 py-1 rounded hover:bg-[#1861ad] transition"
                  onClick={() => setEditMode(true)}
                >
                  Redigera
                </button>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                  onClick={handleCancelDelivery}
                >
                  Avbryt leverans
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="mb-4 text-sm text-gray-700 flex flex-col gap-2">
                <label>
                  <span className="font-semibold">Rutt:</span>
                  <input
                    className="ml-2 border rounded px-2 py-1"
                    value={editPacket.rutt}
                    onChange={e => setEditPacket({ ...editPacket, rutt: e.target.value })}
                  />
                </label>
                <label>
                  <span className="font-semibold">Kund:</span>
                  <input
                    className="ml-2 border rounded px-2 py-1"
                    value={editPacket.kund || ""}
                    onChange={e => setEditPacket({ ...editPacket, kund: e.target.value })}
                  />
                </label>
                <label>
                  <span className="font-semibold">Destination:</span>
                  <input
                    className="ml-2 border rounded px-2 py-1"
                    value={editPacket.destination || ""}
                    onChange={e => setEditPacket({ ...editPacket, destination: e.target.value })}
                  />
                </label>
                <label>
                  <span className="font-semibold">Status:</span>
                  <select
                    className="ml-2 border rounded px-2 py-1"
                    value={editPacket.status.text}
                    onChange={e =>
                      setEditPacket({
                        ...editPacket,
                        status: { ...editPacket.status, text: e.target.value, timestamp: new Date().toLocaleTimeString().slice(0, 5) },
                      })
                    }
                  >
                    {statusOptions.map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </label>
              </div>
              <div className="flex gap-2 mb-4">
                <button
                  className="bg-[#2782E2] text-white px-3 py-1 rounded hover:bg-[#1861ad] transition"
                  onClick={handleSave}
                >
                  Spara
                </button>
                <button
                  className="bg-gray-300 text-gray-700 px-3 py-1 rounded hover:bg-gray-400 transition"
                  onClick={() => setEditMode(false)}
                >
                  Avbryt
                </button>
              </div>
            </>
          )}
          <h3 className="text-md font-bold text-[#2782E2] mb-2">
            Historik
          </h3>
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
