import PacketsItem from "./PacketsItem"

const PacketsList = () => {
  const packets = [
    { bil: "Volvo", chauffor: "Anna", paketnr: "123", temp: "5°C", hamtat: "08:30", lamnat: "09:15" },
    { bil: "Scania", chauffor: "Björn", paketnr: "456", temp: "4°C", hamtat: "09:00", lamnat: "09:45" },
  ]

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Dagens paket</h1>

      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full border-collapse">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-2 border-b">Bil</th>
              <th className="p-2 border-b">Chaufför</th>
              <th className="p-2 border-b">Paketnr</th>
              <th className="p-2 border-b">Temp</th>
              <th className="p-2 border-b">Hämtat kl</th>
              <th className="p-2 border-b">Lämnat kl</th>
            </tr>
          </thead>
          <tbody>
            {packets.map((p, index) => (
              <PacketsItem key={index} {...p} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default PacketsList
