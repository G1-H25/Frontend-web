import PacketsItem from "./PacketsItem"
import useTempAlarmNotification from "../../hooks/useTempAlarmNotification";

const PacketsList = () => {
  const packets = [
  {
    rutt: "STO",
    sändningsnr: "123456",
    expectedTemp: { min: 2, max: 8 },
    currentTemp: 5.0,
    minTempMeasured: 4.8,
    maxTempMeasured: 6.1,
    expectedHumidity: { min: 30, max: 70 },
    currentHumidity: 55,
    minHumidityMeasured: 50,
    maxHumidityMeasured: 60,
    timeOutsideRange: 0,
    status: { text: "Skapad", timestamp: "08:30" },
  },
  {
    rutt: "GOT",
    sändningsnr: "654321",
    expectedTemp: { min: 2, max: 8 },
    currentTemp: 9.1,
    minTempMeasured: 4.2,
    maxTempMeasured: 9.1,
    expectedHumidity: { min: 30, max: 70 },
    currentHumidity: 75,
    minHumidityMeasured: 40,
    maxHumidityMeasured: 75,
    timeOutsideRange: 12,
    status: { text: "Lastad", timestamp: "09:15" },
  },
  {
    rutt: "STO",
    sändningsnr: "121212",
    expectedTemp: { min: 2, max: 8 },
    currentTemp: 5.0,
    minTempMeasured: 4.7,
    maxTempMeasured: 6.3,
    expectedHumidity: { min: 30, max: 70 },
    currentHumidity: 60,
    minHumidityMeasured: 55,
    maxHumidityMeasured: 65,
    timeOutsideRange: 0,
    status: { text: "Levererad", timestamp: "11:30" },
  },
  {
    rutt: "MMA",
    sändningsnr: "111111",
    expectedTemp: { min: 2, max: 8 },
    currentTemp: 4.0,
    minTempMeasured: 3.2,
    maxTempMeasured: 5.1,
    expectedHumidity: { min: 30, max: 70 },
    currentHumidity: 45,
    minHumidityMeasured: 42,
    maxHumidityMeasured: 55,
    timeOutsideRange: 0,
    status: { text: "Skapad", timestamp: "08:00" },
  },
  {
    rutt: "UME",
    sändningsnr: "222222",
    expectedTemp: { min: 2, max: 8 },
    currentTemp: 6.4,
    minTempMeasured: 5.0,
    maxTempMeasured: 7.2,
    expectedHumidity: { min: 30, max: 70 },
    currentHumidity: 62,
    minHumidityMeasured: 50,
    maxHumidityMeasured: 68,
    timeOutsideRange: 0,
    status: { text: "Lastad", timestamp: "08:30" },
  },
  {
    rutt: "ORB",
    sändningsnr: "333333",
    expectedTemp: { min: 2, max: 8 },
    currentTemp: 3.2,
    minTempMeasured: 2.8,
    maxTempMeasured: 5.4,
    expectedHumidity: { min: 30, max: 70 },
    currentHumidity: 38,
    minHumidityMeasured: 35,
    maxHumidityMeasured: 50,
    timeOutsideRange: 0,
    status: { text: "Skapad", timestamp: "09:00" },
  },
  {
    rutt: "GOT",
    sändningsnr: "131313",
    expectedTemp: { min: 2, max: 8 },
    currentTemp: 6.8,
    minTempMeasured: 4.9,
    maxTempMeasured: 7.4,
    expectedHumidity: { min: 30, max: 70 },
    currentHumidity: 59,
    minHumidityMeasured: 52,
    maxHumidityMeasured: 65,
    timeOutsideRange: 0,
    status: { text: "Levererad", timestamp: "12:00" },
  },
  {
    rutt: "HEL",
    sändningsnr: "444444",
    expectedTemp: { min: 2, max: 8 },
    currentTemp: 7.3,
    minTempMeasured: 5.5,
    maxTempMeasured: 7.9,
    expectedHumidity: { min: 30, max: 70 },
    currentHumidity: 70,
    minHumidityMeasured: 60,
    maxHumidityMeasured: 70,
    timeOutsideRange: 0,
    status: { text: "Lastad", timestamp: "09:15" },
  },
  {
    rutt: "KSD",
    sändningsnr: "555555",
    expectedTemp: { min: 2, max: 8 },
    currentTemp: 5.0,
    minTempMeasured: 3.9,
    maxTempMeasured: 5.8,
    expectedHumidity: { min: 30, max: 70 },
    currentHumidity: 48,
    minHumidityMeasured: 40,
    maxHumidityMeasured: 55,
    timeOutsideRange: 0,
    status: { text: "Skapad", timestamp: "09:30" },
  },
  {
    rutt: "LPI",
    sändningsnr: "666666",
    expectedTemp: { min: 2, max: 8 },
    currentTemp: 2.0,
    minTempMeasured: 2.0,
    maxTempMeasured: 2.5,
    expectedHumidity: { min: 30, max: 70 },
    currentHumidity: 33,
    minHumidityMeasured: 30,
    maxHumidityMeasured: 40,
    timeOutsideRange: 0,
    status: { text: "Lastad", timestamp: "10:00" },
  },
  {
    rutt: "JKP",
    sändningsnr: "777777",
    expectedTemp: { min: 2, max: 8 },
    currentTemp: 8.0,
    minTempMeasured: 6.2,
    maxTempMeasured: 8.0,
    expectedHumidity: { min: 30, max: 70 },
    currentHumidity: 69,
    minHumidityMeasured: 55,
    maxHumidityMeasured: 69,
    timeOutsideRange: 0,
    status: { text: "Skapad", timestamp: "10:15" },
  },
  {
    rutt: "GOT",
    sändningsnr: "202020",
    expectedTemp: { min: 2, max: 8 },
    currentTemp: 3.2,
    minTempMeasured: -1.0,
    maxTempMeasured: 6.5,
    expectedHumidity: { min: 30, max: 70 },
    currentHumidity: 72,
    minHumidityMeasured: 28,
    maxHumidityMeasured: 72,
    timeOutsideRange: 12,
    status: { text: "Åter", timestamp: "12:15" },
  },
  {
    rutt: "GVX",
    sändningsnr: "888888",
    expectedTemp: { min: 2, max: 8 },
    currentTemp: 6.0,
    minTempMeasured: 5.1,
    maxTempMeasured: 6.7,
    expectedHumidity: { min: 30, max: 70 },
    currentHumidity: 61,
    minHumidityMeasured: 55,
    maxHumidityMeasured: 66,
    timeOutsideRange: 0,
    status: { text: "Lastad", timestamp: "10:30" },
  },
  {
    rutt: "BOR",
    sändningsnr: "999999",
    expectedTemp: { min: 2, max: 8 },
    currentTemp: 9.0,
    minTempMeasured: 4.6,
    maxTempMeasured: 10.2,
    expectedHumidity: { min: 30, max: 70 },
    currentHumidity: 80,
    minHumidityMeasured: 45,
    maxHumidityMeasured: 80,
    timeOutsideRange: 25,
    status: { text: "Skapad", timestamp: "10:45" },
  },
  {
    rutt: "SDL",
    sändningsnr: "101010",
    expectedTemp: { min: 2, max: 8 },
    currentTemp: 5.5,
    minTempMeasured: 3.9,
    maxTempMeasured: 6.7,
    expectedHumidity: { min: 30, max: 70 },
    currentHumidity: 50,
    minHumidityMeasured: 45,
    maxHumidityMeasured: 55,
    timeOutsideRange: 0,
    status: { text: "Lastad", timestamp: "11:00" },
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

  useTempAlarmNotification(
    packets.map((p) => ({
      sändningsnr: p.sändningsnr,
      currentTemp: p.currentTemp,
      expectedMin: p.expectedTemp.min,
      expectedMax: p.expectedTemp.max,
    }))
  );

  return (
    <div className="p-4 border border-[#9ACEFE] bg-white">
      <h1 className="text-xl text-center text-[#2782E2] font-bold mb-4">Dagens paket</h1>

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
  )
}

export default PacketsList
