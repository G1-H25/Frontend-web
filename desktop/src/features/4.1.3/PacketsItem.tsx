type PacketProps = {
  rutt: string;
  sändningsnr: string;
  expectedTemp: { min: number; max: number };
  currentTemp: number;
  minTempMeasured: number;
  maxTempMeasured: number;
  timeOutsideRange: number; // minuter
  status: { text: string; timestamp: string };
  onClick?: () => void;
};

const PacketsItem = ({
  rutt,
  sändningsnr,
  expectedTemp,
  currentTemp,
  minTempMeasured,
  maxTempMeasured,
  timeOutsideRange,
  status,
  onClick,
}: PacketProps) => {
  // To be able to adjust the color depending on the status
  let rowClass = "table-row table-row-hover";

  if (currentTemp < expectedTemp.min || currentTemp > expectedTemp.max) {
    rowClass = "table-row-warning table-row-warning:hover"; // Outside range
  } else if (timeOutsideRange > 0) {
    rowClass = "table-row-warning-past table-row-warning-past:hover"; // Previous outside range
  }

  return (
    <tr className={rowClass + " cursor-pointer"} onClick={onClick}>
      <td className="p-2">{rutt}</td>
      <td className="p-2">{sändningsnr}</td>
      <td className="p-2">{`${status.text} (${status.timestamp})`}</td>
      <td className="p-2">{currentTemp.toFixed(1)}°C</td>
      <td className="p-2">{`${expectedTemp.min}–${expectedTemp.max}°C`}</td>
      <td className="p-2">{`${minTempMeasured.toFixed(1)}–${maxTempMeasured.toFixed(1)}°C`}</td>
      <td className="p-2">{timeOutsideRange > 0 ? `${timeOutsideRange} min` : ""}</td>
    </tr>
  );
};

export default PacketsItem;
