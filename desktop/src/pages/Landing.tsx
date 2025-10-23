import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../app/store";
import { Package, Search, Briefcase } from "lucide-react";

const Landing = () => {
  const navigate = useNavigate();
  const { token } = useSelector((state: RootState) => state.login);
  const [showModal, setShowModal] = useState(false);
  const [packetId, setPacketId] = useState("");

  const handleProtectedNav = (path: string) => {
    if (token) {
      navigate(path);
    } else {
      navigate("/login");
    }
  };

  const handlePacketSearch = () => {
    if (packetId.trim()) {
      navigate(`/packets/${packetId}`);
      setShowModal(false);
      setPacketId("");
    }
  };

  return (
    <div className="p-45 flex flex-col justify-center items-center bg-[#D9F2FF] rounded-md px-4">
      <div className="p-6 border border-[#9ACEFE] bg-white rounded-md shadow-md text-center">
        <h1 className="text-3xl font-bold mb-8 text-[#00072D]">
          Välkommen till TrackApp
        </h1>

        <p className="text-gray-600 mb-8">
          Spåra och hantera dina leveranser på ett och samma ställe.
        </p>

        {/* Rutorna */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* Alla sändningar */}
          <button
            onClick={() => handleProtectedNav("/packets")}
            className="flex flex-col items-center justify-center bg-[#D01338] hover:bg-[#A91330] text-white rounded-2xl p-8 w-56 h-56 transition shadow-md hover:cursor-pointer"
          >
            <Package size={64} className="mb-4" />
            <span className="text-xl font-semibold">Alla sändningar</span>
          </button>

          {/* Sök sändning */}
          <button
            onClick={() => (token ? setShowModal(true) : navigate("/login"))}
            className="flex flex-col items-center justify-center bg-[#1E40AF] hover:bg-[#1E3A8A] text-white rounded-2xl p-8 w-56 h-56 transition shadow-md hover:cursor-pointer"
          >
            <Search size={64} className="mb-4" />
            <span className="text-xl font-semibold">Sök sändning</span>
          </button>

          {/* Våra tjänster */}
          <button
            onClick={() => navigate("/about")}
            className="flex flex-col items-center justify-center bg-[#15803D] hover:bg-[#166534] text-white rounded-2xl p-8 w-56 h-56 transition shadow-md hover:cursor-pointer"
          >
            <Briefcase size={64} className="mb-4" />
            <span className="text-xl font-semibold">Våra tjänster</span>
          </button>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center">
            <h2 className="text-xl font-semibold mb-4">Sök sändning</h2>
            <input
              type="text"
              placeholder="Ange sändningsnummer"
              value={packetId}
              onChange={(e) => setPacketId(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <div className="flex justify-between">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 transition"
              >
                Avbryt
              </button>
              <button
                onClick={handlePacketSearch}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
              >
                Sök
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Landing;
