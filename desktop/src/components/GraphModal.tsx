import { X } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
} from "recharts";

type GraphModalProps = {
  title: string;
  data: { timestamp: string; value: number | string }[]; // kan vara string från backend
  min: number | string;
  max: number | string;
  unit: string;
  onClose: () => void;
};

export default function GraphModal({
  title,
  data,
  min,
  max,
  unit,
  onClose,
}: GraphModalProps) {
  // Konvertera min/max till nummer
  const minVal = Number(min);
  const maxVal = Number(max);

  // Konvertera datavärden till nummer
  const chartData = data.map((d) => ({
    timestamp: d.timestamp,
    value: Number(d.value),
  }));

  // Beräkna Y-axis med ±5 buffer, men utöka om data ligger utanför
  const allValues = chartData.map((d) => d.value);
  const minY = Math.min(minVal - 5, ...allValues);
  const maxY = Math.max(maxVal + 5, ...allValues);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 shadow-lg w-full max-w-3xl relative">
        {/* Stäng-knapp */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
        >
          <X size={20} />
        </button>

        <h2 className="text-xl font-semibold mb-4">{title}</h2>

        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="timestamp"
              tickFormatter={(v: string | number) =>
                new Date(v).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              }
            />
            <YAxis domain={[minY, maxY]} unit={unit} />
            <Tooltip
              labelFormatter={(v) => new Date(v).toLocaleString()}
              formatter={(val: number) => [`${val}${unit}`, "Värde"]}
            />
            {/* Reference lines för min och max */}
            <ReferenceLine y={minVal} stroke="red" strokeDasharray="4 4" label="Min" />
            <ReferenceLine y={maxVal} stroke="red" strokeDasharray="4 4" label="Max" />

            <Line type="monotone" dataKey="value" stroke="#2782E2" dot />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
