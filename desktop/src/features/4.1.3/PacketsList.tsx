import PacketsItem from "./PacketsItem"

const PacketsList = () => {
  const packets = [
  {
    rutt: "Stockholm",
    sändningsnr: "123456",
    expectedTemp: { min: 2, max: 8 },
    currentTemp: 5,
    status: { text: "Order skapad", timestamp: "08:30" },
  },
  {
    rutt: "Göteborg",
    sändningsnr: "654321",
    expectedTemp: { min: 2, max: 8 },
    currentTemp: 9,
    status: { text: "Lastad på bil", timestamp: "09:15" },
  },
  {
    rutt: "Stockholm",
    sändningsnr: "121212",
    expectedTemp: { min: 2, max: 8 },
    currentTemp: 5,
    status: { text: "Levererad", timestamp: "11:30" },
  },
  {
    rutt: "Malmö",
    sändningsnr: "111111",
    expectedTemp: { min: 2, max: 8 },
    currentTemp: 4,
    status: { text: "Order skapad", timestamp: "08:00" },
  },
  {
    rutt: "Umeå",
    sändningsnr: "222222",
    expectedTemp: { min: 2, max: 8 },
    currentTemp: 6,
    status: { text: "Lastad på bil", timestamp: "08:30" },
  },
  {
    rutt: "Örebro",
    sändningsnr: "333333",
    expectedTemp: { min: 2, max: 8 },
    currentTemp: 3,
    status: { text: "Order skapad", timestamp: "09:00" },
  },
  {
    rutt: "Göteborg",
    sändningsnr: "131313",
    expectedTemp: { min: 2, max: 8 },
    currentTemp: 6,
    status: { text: "Levererad", timestamp: "12:00" },
  },
  {
    rutt: "Helsingborg",
    sändningsnr: "444444",
    expectedTemp: { min: 2, max: 8 },
    currentTemp: 7,
    status: { text: "Lastad på bil", timestamp: "09:15" },
  },
  {
    rutt: "Karlstad",
    sändningsnr: "555555",
    expectedTemp: { min: 2, max: 8 },
    currentTemp: 5,
    status: { text: "Order skapad", timestamp: "09:30" },
  },
  {
    rutt: "Linköping",
    sändningsnr: "666666",
    expectedTemp: { min: 2, max: 8 },
    currentTemp: 2,
    status: { text: "Lastad på bil", timestamp: "10:00" },
  },
  {
    rutt: "Jönköping",
    sändningsnr: "777777",
    expectedTemp: { min: 2, max: 8 },
    currentTemp: 8,
    status: { text: "Order skapad", timestamp: "10:15" },
  },
  {
    rutt: "Gävle",
    sändningsnr: "888888",
    expectedTemp: { min: 2, max: 8 },
    currentTemp: 6,
    status: { text: "Lastad på bil", timestamp: "10:30" },
  },
  {
    rutt: "Borås",
    sändningsnr: "999999",
    expectedTemp: { min: 2, max: 8 },
    currentTemp: 10, // utanför intervallet
    status: { text: "Order skapad", timestamp: "10:45" },
  },
  {
    rutt: "Sundsvall",
    sändningsnr: "101010",
    expectedTemp: { min: 2, max: 8 },
    currentTemp: 5,
    status: { text: "Lastad på bil", timestamp: "11:00" },
  },
];




  return (
    <div className="p-4 border border-[#9ACEFE] bg-white">
      <h1 className="text-xl text-center text-[#2782E2] font-bold mb-4">Dagens paket</h1>

      <table className="w-full border-separate border-spacing-y-2">
        <thead>
          <tr>
            <th className="text-center text-[#2782E2] px-4 py-2">Rutt</th>
            <th className="text-center text-[#2782E2] px-4 py-2">Sändningsnr</th>
            <th className="text-center text-[#2782E2] px-4 py-2">Förväntad temp</th>
            <th className="text-center text-[#2782E2] px-4 py-2">Nuvarande temp</th>
            <th className="text-center text-[#2782E2] px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {packets.map((p, index) => (
            <PacketsItem key={index} {...p} />
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default PacketsList


