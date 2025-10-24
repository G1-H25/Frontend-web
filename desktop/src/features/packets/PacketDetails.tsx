// features/packets/PacketDetails.tsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPacketDetail,
  selectPacketDetail,
  clearPacketDetail,
} from "./packetDetailSlice";
import type { AppDispatch } from "../../app/store";
import { ArrowLeft, Thermometer, Droplets, Printer, Download } from "lucide-react";
import GraphModal from "../../components/GraphModal";

const PacketDetails = () => {
  const { packetId } = useParams<{ packetId: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { packet, loading, error } = useSelector(selectPacketDetail);
  const navigate = useNavigate();

  // Modaler
  const [showTempModal, setShowTempModal] = useState(false);
  const [showHumidityModal, setShowHumidityModal] = useState(false);

  // 🧠 Hämta paket och rensa vid unmount
  useEffect(() => {
  if (packetId) {
    const id = Number(packetId);
    if (!isNaN(id)) {
      dispatch(fetchPacketDetail(id));
    }
  }

  return () => {
    dispatch(clearPacketDetail());
  };
}, [dispatch, packetId]);


  if (loading) return <p className="text-gray-500">Laddar paket...</p>;
  if (error) return <p className="text-red-500">Fel: {error}</p>;
  if (!packet) return <p className="text-gray-400">Ingen data att visa</p>;

  return (
    <div className="p-6 bg-white shadow rounded-md">
      {/* Tillbaka-knapp */}
      <button
        onClick={() => navigate("/packets")}
        className="mb-4 flex items-center text-[#00072D] hover:text-blue-700 transition hover:cursor-pointer"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Tillbaka till alla sändningar
      </button>

      <h1 className="text-2xl font-bold mb-4 text-center">
        Sändning {packet.id}
      </h1>

      {/* Grundinfo */}
      <div className="mb-6 grid grid-cols-3 gap-8">
        <section>
          <h2 className="text-xl font-semibold mb-2">Rutt & Transport</h2>
          <p>
            <strong>Rutt:</strong> {packet.rutt}
          </p>
          <p>
            <strong>Transport:</strong> {packet.transport.name}
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">Avsändare</h2>
          <p>{packet.sender.name}</p>
          <p>{packet.sender.address}</p>
          <p>
            {packet.sender.postcode} {packet.sender.city}
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">Mottagare</h2>
          <p>{packet.recipient.name}</p>
          <p>{packet.recipient.address}</p>
          <p>
            {packet.recipient.postcode} {packet.recipient.city}
          </p>
        </section>
      </div>

      {/* Status, förväntningar, avvikelser */}
      <div className="mb-6 grid grid-cols-3 gap-8">
        <section>
          <h2 className="text-xl font-semibold mb-2">Statushistorik</h2>
          <ul className="list-disc list-inside">
            {packet.status.map((s, idx) => (
              <li key={idx}>
                {s.text} – {new Date(s.timestamp).toLocaleString()}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">
            Förväntad temperatur & luftfuktighet
          </h2>
          <p>
            <strong>{packet.expectedTemp.name}:</strong>{" "}
            {packet.expectedTemp.min}–{packet.expectedTemp.max}°C
          </p>
          <p>
            <strong>{packet.expectedHumidity.name}:</strong>{" "}
            {packet.expectedHumidity.min}–{packet.expectedHumidity.max}%
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">Avvikelser</h2>
          {packet.timeOutsideRange === 0 ? (
            <p>Inga avvikelser i denna leverans</p>
          ) : (
            <p>
              <strong>Tid utanför range:</strong> {packet.timeOutsideRange} min
            </p>
          )}
        </section>
      </div>

      {/* Mätvärden + knappar */}
      <section>
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-semibold">Mätvärden</h2>

          <div className="flex gap-16 items-center">
            {/* Graf-knappar */}
            <div className="flex gap-4 items-center">
              <button
                onClick={() => setShowTempModal(true)}
                className="flex items-center gap-2 text-[#D01338] border border-gray-400 rounded-lg px-4 py-2 h-10 hover:cursor-pointer shadow-lg hover:bg-gray-200 transition transform active:scale-95"
              >
                <Thermometer size={18} />
                Visa temperaturgraf
              </button>

              {/* Skrivut-knappar temperatur */}
              <button
                onClick={() => console.log("Print temperatur")}
                className="text-black border border-gray-400 rounded-lg p-2 shadow-lg hover:bg-gray-200 hover:cursor-pointer transition transform active:scale-95"
                title="Skriv ut temperaturgraf"
              >
                <Printer size={18} />
              </button>
              <button
                onClick={() => console.log("Export temperatur")}
                className="text-black border border-gray-400 rounded-lg p-2 shadow-lg hover:bg-gray-200 hover:cursor-pointer transition transform active:scale-95"
                title="Exportera temperaturgraf"
              >
                <Download size={18} />
              </button>
            </div>

            <div className="flex gap-4 items-center">
              <button
                onClick={() => setShowHumidityModal(true)}
                className="flex items-center gap-2 text-[#D01338] border border-gray-400 rounded-lg px-4 py-2 h-10 shadow-lg hover:cursor-pointer hover:bg-gray-200 transition transform active:scale-95"
              >
                <Droplets size={18} />
                Visa luftfuktighetsgraf
              </button>

              {/* Skrivut-knappar luftfuktighet */}
              <button
                onClick={() => console.log("Print luftfuktighet")}
                className="text-black border border-gray-400 rounded-lg p-2 shadow-lg hover:cursor-pointer hover:bg-gray-200 transition transform active:scale-95"
                title="Skriv ut luftfuktighetsgraf"
              >
                <Printer size={18} />
              </button>
              <button
                onClick={() => console.log("Export luftfuktighet")}
                className="text-black border border-gray-400 rounded-lg p-2 shadow-lg hover:cursor-pointer hover:bg-gray-200 transition transform active:scale-95"
                title="Exportera luftfuktighetsgraf"
              >
                <Download size={18} />
              </button>
            </div>
          </div>


        </div>

        <table className="min-w-full table-auto border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-3 py-1">Tid</th>
              <th className="border px-3 py-1">Temperatur (°C)</th>
              <th className="border px-3 py-1">Luftfuktighet (%)</th>
            </tr>
          </thead>
          <tbody>
            {packet.measurements.map((m, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="border px-3 py-1">
                  {new Date(m.timestamp).toLocaleString()}
                </td>
                <td className="border px-3 py-1">{m.temp}</td>
                <td className="border px-3 py-1">{m.humidity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Temperaturmodal */}
      {showTempModal && (
        <GraphModal
          title={`Temperatur över tid (${packet.expectedTemp.name})`}
          data={packet.measurements.map((m) => ({
            value: Number(m.temp),
            timestamp: m.timestamp,
          }))}
          min={packet.expectedTemp.min}
          max={packet.expectedTemp.max}
          unit="°C"
          onClose={() => setShowTempModal(false)}
        />
      )}

      {/* Luftfuktighetsmodal */}
      {showHumidityModal && (
        <GraphModal
          title={`Luftfuktighet över tid (${packet.expectedHumidity.name})`}
          data={packet.measurements.map((m) => ({
            value: Number(m.humidity),
            timestamp: m.timestamp,
          }))}
          min={packet.expectedHumidity.min}
          max={packet.expectedHumidity.max}
          unit="%"
          onClose={() => setShowHumidityModal(false)}
        />
      )}
    </div>
  );
};

export default PacketDetails;
