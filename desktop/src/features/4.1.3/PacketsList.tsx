import PacketsItem from "./PacketsItem"

const PacketsList = () => {
  const packets = [
    { bil: "Volvo", chauffor: "Anna", paketnr: "123", temp: "5°C", hamtat: "08:30", lamnat: "09:15" },
    { bil: "Scania", chauffor: "Björn", paketnr: "456", temp: "4°C", hamtat: "09:00", lamnat: "09:45" },
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
