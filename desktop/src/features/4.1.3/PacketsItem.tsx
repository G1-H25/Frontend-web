type PacketProps = {
  bil: string
  chauffor: string
  paketnr: string
  temp: string
  hamtat: string
  lamnat: string
}

const PacketsItem = ({ bil, chauffor, paketnr, temp, hamtat, lamnat }: PacketProps) => {
  return (
    <tr className="hover:bg-gray-50">
      <td className="p-2 border-b">{bil}</td>
      <td className="p-2 border-b">{chauffor}</td>
      <td className="p-2 border-b">{paketnr}</td>
      <td className="p-2 border-b">{temp}</td>
      <td className="p-2 border-b">{hamtat}</td>
      <td className="p-2 border-b">{lamnat}</td>
    </tr>
  )
}

export default PacketsItem
