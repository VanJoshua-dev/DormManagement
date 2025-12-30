import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TbHomePlus } from "react-icons/tb";
import { LuUserRoundPen } from "react-icons/lu";
import { MdOutlineChangeCircle } from "react-icons/md";
import { useCreateRoom } from "../../../services/room-module-services.js";
import { useFetchAllRooms } from "../../../services/room-module-services.js";
import { useChangeRoom } from "../../../services/tenants-services.js";
import { TopLoader } from "../../../components/lightswind/top-loader.jsx";
function EditTenant({ onClose, selectedTenant }) {
  const [filters, setFilters] = useState({
    search: "",
    status: "Available",
    type: "",
    gender: selectedTenant.Gender,
  });

  const { loading, rooms } = useFetchAllRooms(filters);

  const [roomID, setRoomID] = useState("");
  const tenantID = selectedTenant.tenantID;
  const name = selectedTenant.tenant_name;
  const { loading2, handleSubmit } = useChangeRoom({ roomID, tenantID, name }, () => {onClose();});

  if (loading2) return <TopLoader isLoading={loading2} />;
  return (
    <AnimatePresence>
      <motion.div
        className="absolute z-50 top-0 left-0 bg-black/40 w-screen h-screen flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="w-[40%] rounded-lg bg-white px-4 py-4 flex flex-col gap-3"
          initial={{ scale: 0.8, opacity: 0, y: -20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: -20 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          <header className="flex items-center gap-2">
            <MdOutlineChangeCircle size={30} />
            <span className="text-xl font-medium">Change room</span>
          </header>

          <form onSubmit={handleSubmit}>
            <div className="w-full py-2 px-6 flex flex-col gap-2">
              <label className="text-md font-semibold">
                Current room: {selectedTenant.room_number}{" "}
              </label>
              <select
                value={roomID}
                onChange={(e) => setRoomID(e.target.value)}
                className="py-2 px-2 rounded-sm border border-gray-400"
                required
              >
                <option value="">- Select new room -</option>
                {rooms.map((room, index) => (
                  <option key={index} value={room.roomId}>
                    Room {room.roomNumber} (Remaining slot:{" "}
                    {room.remainingSlots})
                  </option>
                ))}
              </select>
            </div>
            <div className="w-full flex items-center mt-4 justify-end gap-3">
              <button
                onClick={onClose}
                disabled={loading}
                type="button"
                className="py-2 px-4 rounded-full text-md text-white bg-gray-400 hover:bg-gray-600 transition-colors duration-300 cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading}
                className="py-2 px-7 rounded-full text-md text-white bg-blue-500 hover:bg-blue-600 transition-colors duration-300 cursor-pointer"
              >
                Save
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default EditTenant;
