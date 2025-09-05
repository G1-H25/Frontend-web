type PacketProps = {
  rutt: string;
  sändningsnr: string;
  expectedTemp: { min: number; max: number };
  currentTemp: number;
  status: { text: string; timestamp: string };
};


const PacketsItem = ({ rutt, sändningsnr, expectedTemp, currentTemp, status }: PacketProps) => {
  const isTempOutOfRange = currentTemp < expectedTemp.min || currentTemp > expectedTemp.max;

  return (
    <tr className={isTempOutOfRange ? "table-row-warning table-row-warning:hover" : "table-row table-row-hover"}>
      <td className="p-2">{rutt}</td>
      <td className="p-2">{sändningsnr}</td>
      <td className="p-2">{`${expectedTemp.min}–${expectedTemp.max}°C`}</td>
      <td className="p-2">{currentTemp}°C</td>
      <td className="p-2">{`${status.text} (${status.timestamp})`}</td>
    </tr>
  );
};


export default PacketsItem


