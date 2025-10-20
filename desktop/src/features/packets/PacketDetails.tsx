// features/packets/PacketDetails.tsx
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchPacketDetail, selectPacketDetail, clearPacketDetail } from "./packetDetailSlice";
import type { AppDispatch } from "../../app/store";
import { ArrowLeft } from "lucide-react";

const PacketDetails = () => {
  const { packetId } = useParams<{ packetId: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { packet, loading, error } = useSelector(selectPacketDetail);
  const navigate = useNavigate();

  useEffect(() => {
    if (packetId) {
      dispatch(fetchPacketDetail(packetId));
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

      <button
        onClick={() => navigate("/packets")}
        className="mb-4 flex items-center text-blue-600 hover:text-blue-800 transition hover:cursor-pointer"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Tillbaka till alla ordrar
      </button>

      <h1 className="text-2xl font-bold mb-4 text-center">Order {packet.sändningsnr}</h1>
      
      <div className="mb-6 grid grid-cols-3 gap-8">
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Rutt & Transport</h2>
          <p><strong>Rutt:</strong> {packet.rutt}</p>
          <p><strong>Transport:</strong> {packet.transport.name}</p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Avsändare</h2>
          <p>{packet.sender.name}</p>
          <p>{packet.sender.address}, {packet.sender.postcode} {packet.sender.city}</p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Mottagare</h2>
          <p>{packet.recipient.name}</p>
          <p>{packet.recipient.address}, {packet.recipient.postcode} {packet.recipient.city}</p>
        </section>
      </div>
      
      <div className="mb-6 grid grid-cols-3 gap-8">
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Statushistorik</h2>
          <ul className="list-disc list-inside">
            {packet.status.map((s, idx) => (
              <li key={idx}>
                {s.text} – {new Date(s.timestamp).toLocaleString()}
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Förväntad temperatur & luftfuktighet</h2>
          <p><strong>{packet.expectedTemp.name}:</strong> {packet.expectedTemp.min}–{packet.expectedTemp.max}°C</p>
          <p><strong>{packet.expectedHumidity.name}:</strong> {packet.expectedHumidity.min}–{packet.expectedHumidity.max}%</p>
        </section>

        <section className="mb-6">
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

      <section>
        <h2 className="text-xl font-semibold mb-2">Mätvärden</h2>
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
                <td className="border px-3 py-1">{new Date(m.timestamp).toLocaleString()}</td>
                <td className="border px-3 py-1">{m.temp}</td>
                <td className="border px-3 py-1">{m.humidity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default PacketDetails;
