import { useNavigate } from "react-router-dom";

type PacketProps = {
  rutt: string;
  sändningsnr: string;
  expectedTemp: { min: number; max: number };
  currentTemp: number;
  minTempMeasured: number;
  maxTempMeasured: number;
  expectedHumidity: { min: number; max: number };
  currentHumidity: number;                       
  minHumidityMeasured: number;                   
  maxHumidityMeasured: number;                   
  timeOutsideRange: number; // minuter
  status: { text: string; timestamp: string };
  sender: string;
  transport: string;
};

const PacketsItem = ({ 
  rutt,
  sändningsnr,
  expectedTemp,
  currentTemp,
  minTempMeasured,
  maxTempMeasured,
  expectedHumidity,
  currentHumidity,
  minHumidityMeasured,
  maxHumidityMeasured,
  timeOutsideRange,
  status,
  sender,
  transport
}: PacketProps) => {
  // To be able to adjust the color depending on the status
  let rowClass = "table-row table-row-hover";

  const outOfTemp = currentTemp < expectedTemp.min || currentTemp > expectedTemp.max;
  const outOfHumidity = currentHumidity < expectedHumidity.min || currentHumidity > expectedHumidity.max;

  if (outOfTemp || outOfHumidity) {
    rowClass = "table-row-warning table-row-warning:hover"; // Outside range
  } else if (timeOutsideRange > 0) {
    rowClass = "table-row-warning-past table-row-warning-past:hover"; // Previous outside range
  }

  const navigate = useNavigate();


  return (
    <tr onClick={() => navigate(`/packets/${sändningsnr}`)} className={rowClass}>
      <td className="p-2">{sender}</td>
      <td className="p-2">{transport}</td>
      <td className="p-2">{rutt}</td>
      <td className="p-2">{sändningsnr}</td>
      <td className="p-2">{status.text} ({new Date(status.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })})</td>
      <td className="p-2">{currentTemp.toFixed(1)}°C</td>
      <td className="p-2">{`${expectedTemp.min}–${expectedTemp.max}°C`}</td>
      <td className="p-2">{`${minTempMeasured.toFixed(1)}–${maxTempMeasured.toFixed(1)}°C`}</td>
      <td className="p-2">{currentHumidity}%</td>
      <td className="p-2">{`${expectedHumidity.min}–${expectedHumidity.max}%`}</td>
      <td className="p-2">{`${minHumidityMeasured}–${maxHumidityMeasured}%`}</td>
      <td className="p-2">{timeOutsideRange > 0 ? `${timeOutsideRange} min` : ""}</td>
    </tr>
  );
};

export default PacketsItem
