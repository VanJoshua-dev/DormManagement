import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TbHomeEdit } from "react-icons/tb";
import { useEditRoom } from "../../../services/room-module-services.js";
function EditRoom({ onSave, onClose, room }) {
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   onSave();
  // };
  console.log(room)
  

  const [room_number, setRoomNumber] = useState(room.roomNumber);
  const [capacity, setRoomCapacity] = useState(room.capacity);
  const [gender, setRoomGender] = useState(room.roomGender);
  const [room_type, setRoomType] = useState(room.roomType);
  const room_id = room.roomId;
  const {loading, handleSubmit} = useEditRoom({room_number, room_type, capacity, gender, room_id}, () => {onClose();})

  return (
    <AnimatePresence>
      <motion.div
        className="absolute z-10 top-0 left-0 bg-black/40 w-screen h-screen flex items-center justify-center"
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
            <TbHomeEdit size={30} />
            <span className="text-xl font-medium">Edit room</span>
          </header>

          <form onSubmit={handleSubmit}>
            <div className="w-full py-2 px-3 flex flex-col gap-2">
              <label className="text-md font-semibold">Room Number</label>
              <input
                type="text"
                value={room_number}
                onChange={(e) => setRoomNumber(e.target.value)}
                className="py-2 px-2 rounded-sm border border-gray-400"
                placeholder="Enter room number"
                required
              />
            </div>

            <p className="text-lg text-gray-400 font-semibold px-3">
              Room Details
            </p>

            <div className="w-full py-2 px-6 flex flex-col gap-2">
              <label className="text-md font-semibold">Room Type</label>
              <select 
              className="py-2 px-2 rounded-sm border border-gray-400"
              value={room_type}
              onChange={(e) => setRoomType(e.target.value)}
              >
                <option value="">- Select Room Type -</option>
                <option value="Single">Single</option>
                <option value="Double">Double</option>
                <option value="Triple">Triple</option>
                <option value="Quad">Quad</option>
              </select>
            </div>

            <div className="w-full py-2 px-6 flex flex-col gap-2">
              <label className="text-md font-semibold">Room Capacity</label>
              <input
                type="number"
                value={capacity}
                onChange={(e) => setRoomCapacity(e.target.value)}
                className="py-2 px-2 rounded-sm border border-gray-400"
                placeholder="Enter room capacity"
                required
              />
            </div>

            <div className="w-full py-2 px-6 flex flex-col gap-2">
              <label className="text-md font-semibold">Gender</label>
              <select
                value={gender}
                onChange={(e) => setRoomGender(e.target.value)}
                className="py-2 px-2 rounded-sm border border-gray-400 cursor-pointer"
                required
              >
                <option value="">- Select Gender -</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
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
                className="py-2 px-4 rounded-full text-md text-white bg-blue-500 hover:bg-blue-600 transition-colors duration-300 cursor-pointer"
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

export default EditRoom;
