import PacketsItem from "./PacketsItem"

const PacketsList = () => {
  const packets = [
  { bil: "Volvo", chauffor: "Anna", paketnr: "123", temp: "5°C", hamtat: "08:30", lamnat: "09:15" },
  { bil: "Scania", chauffor: "Björn", paketnr: "456", temp: "4°C", hamtat: "09:00", lamnat: "09:45" },
  { bil: "Mercedes", chauffor: "Clara", paketnr: "789", temp: "6°C", hamtat: "08:45", lamnat: "09:30" },
  { bil: "Volvo", chauffor: "David", paketnr: "321", temp: "5°C", hamtat: "09:15", lamnat: "10:00" },
  { bil: "Scania", chauffor: "Emma", paketnr: "654", temp: "3°C", hamtat: "09:30", lamnat: "10:15" },
  { bil: "MAN", chauffor: "Fredrik", paketnr: "987", temp: "4°C", hamtat: "10:00", lamnat: "10:45" },
  { bil: "Volvo", chauffor: "Greta", paketnr: "147", temp: "5°C", hamtat: "10:15", lamnat: "11:00" },
  { bil: "Scania", chauffor: "Hanna", paketnr: "258", temp: "6°C", hamtat: "10:30", lamnat: "11:15" },
  { bil: "Mercedes", chauffor: "Isak", paketnr: "369", temp: "4°C", hamtat: "10:45", lamnat: "11:30" },
  { bil: "MAN", chauffor: "Johanna", paketnr: "741", temp: "5°C", hamtat: "11:00", lamnat: "11:45" },
]


  return (
    <div className="p-4 border border-[#9ACEFE] bg-white">
      <h1 className="text-xl text-center text-[#2782E2] font-bold mb-4">Dagens paket</h1>

      <table className="w-full border-separate border-spacing-y-2">
        <thead>
          <tr>
            <th className="text-center text-[#2782E2] px-4 py-2">Bil</th>
            <th className="text-center text-[#2782E2] px-4 py-2">Chaufför</th>
            <th className="text-center text-[#2782E2] px-4 py-2">Paketnr</th>
            <th className="text-center text-[#2782E2] px-4 py-2">Temp</th>
            <th className="text-center text-[#2782E2] px-4 py-2">Hämtat kl</th>
            <th className="text-center text-[#2782E2] px-4 py-2">Lämnat kl</th>
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
