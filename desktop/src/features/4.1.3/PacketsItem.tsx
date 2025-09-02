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
    <tr className="bg-[#D9F2FF]">
      <td className="text-[#2782E2] text-center p-2">{bil}</td>
      <td className="text-[#2782E2] text-center p-2">{chauffor}</td>
      <td className="text-[#2782E2] text-center p-2">{paketnr}</td>
      <td className="text-[#2782E2] text-center p-2">{temp}</td>
      <td className="text-[#2782E2] text-center p-2">{hamtat}</td>
      <td className="text-[#2782E2] text-center p-2">{lamnat}</td>
    </tr>
  )
}

export default PacketsItem
