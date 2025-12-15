import React, { useState } from "react";
import clx from "clsx";
import { FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import EditRoom from "./modals/edit-room-modal";
import noResult from "../../assets/search-cross-svgrepo-com.svg";
import EmptyState from "../../assets/folder-open-svgrepo-com.svg";
import { TopLoader } from "../../components/lightswind/top-loader.jsx";
import { useDeleteRoom } from "../../services/room-module-services.js";
import { useChangeRoomStatus } from "../../services/room-module-services.js";
function RoomsTable({ rooms, isFiltered }) {
  const [selectedRoom, setSelectedRoom] = useState(null);
  // const handleChangeStatus = async (new_status, room_number) => {
  //   console.log(new_status);
  //   console.log(room_number);
  // };

  const { loading, handleStatusChange } = useChangeRoomStatus();

  const { handleDelete } = useDeleteRoom();

  if (loading) return <TopLoader isLoading={loading} />;
  if (!rooms || rooms.length === 0) {
    return (
      <div className="w-full flex flex-col items-center justify-center py-20 text-center">
        <img
          src={isFiltered ? noResult : EmptyState}
          alt="No rooms"
          className="w-40 opacity-70 mb-5"
        />
        <h1 className="text-xl font-semibold text-gray-600">
          {isFiltered
            ? "No rooms match your filter"
            : "No rooms have been added yet"}
        </h1>
        <p className="text-gray-500 mt-1">
          {isFiltered ? (
            "Try adjusting your filter settings."
          ) : (
            <span>Once you add rooms, they will appear here.</span>
          )}
        </p>
      </div>
    );
  }

  return (
    <div className="w-full px-5 py-5 flex justify-center flex-row flex-wrap gap-3 h-135 overflow-y-auto scrollbar-hidden">
      {/**
       * Card
       */}
      {rooms.map((room, index) => (
        <div
          key={index}
          className="px-3 py-2 pb-11 relative rounded-lg h-110 flex flex-col shadow-[0px_0px_20px_1px_#cbd5e0] w-77"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Room no</p>
              <h1 className="text-xl font-bold">{room.roomNumber}</h1>
            </div>
            <span
              className={clx(
                " rounded-full text-white text-sm font-medium",
                (room.roomStatus === "Full" && "bg-red-500") ||
                  (room.roomStatus === "Available" && "bg-green-500") ||
                  (room.roomStatus === "Maintenance" && "bg-amber-500")
              )}
            >
              <select
                className="cursor-pointer px-2 py-1 h-full w-full rounded-full"
                value={room.roomStatus}
                onChange={(e) =>
                  handleStatusChange(e.target.value, room.roomNumber)
                }
              >
                <option value="Available" className="text-black hover:bg-green-500">
                  Available
                </option>
                <option value="Full" className="text-black">
                  Full
                </option>
                <option value="Maintenance" className="text-black">
                  Maintenance
                </option>
              </select>
            </span>
          </div>
          <div className="pt-2">
            <p className="font-semibold ">Room details</p>
            <div className="py-2 px-2">
              <div>
                <p className="text-gray-400 text-sm">Room Type</p>
                <h1 className="text-md font-medium px-2">{room.roomType}</h1>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Capacity</p>
                <h1 className="text-md font-medium px-2">{room.capacity}</h1>
              </div>
              <div>
                <p className="text-gray-400 text-medium text-sm">Room Gender</p>
                <h1 className="text-md font-medium px-2">{room.roomGender}</h1>
              </div>
              <div>
                <p className="text-gray-400 text-medium text-sm">
                  Remaining Slot
                </p>
                <h1 className="text-md font-medium px-2">
                  {room.remainingSlots}
                </h1>
              </div>
            </div>
          </div>
          <div className="pt-2">
            <p className="font-semibold ">Room Roster</p>
            <div className="py-2 px-2 flex gap-2 flex-wrap">
              {room.assignedTenants != 0 ? (
                <>
                <button
                className="px-4 py-2 bg-blue-500 rounded-full text-white hover:bg-blue-600 cursor-pointer transition-colors duration-300" 
                >View roster ({room.assignedTenants})</button>
                </>
              ) : (
                <h1 className="text-gray-500 text-sm">No tenants in here</h1>
              )}
            </div>
          </div>
          <div className="absolute w-full flex items-center justify-center gap-2 bottom-2">
            <button
              onClick={() => setSelectedRoom(room)}
              className="py-2 px-2 bg-green-500 text-white rounded-sm cursor-pointer hover:bg-green-600 transition-colors duration-300"
            >
              <FaEdit size={20} />
            </button>
            <button
              onClick={() => handleDelete(room.roomId, room.roomNumber)}
              className="py-2 px-2 bg-red-500 text-white rounded-sm cursor-pointer hover:bg-red-600 transition-colors duration-300"
            >
              <MdDeleteOutline size={20} />
            </button>
          </div>
        </div>
      ))}

      {selectedRoom && (
        <EditRoom onClose={() => setSelectedRoom(null)} room={selectedRoom} />
      )}
    </div>
  );
}

export default RoomsTable;
