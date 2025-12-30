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
import roadBlock from "../../assets/road-block.png";
import RoomRoster from "./modals/room-roster-modal.jsx";
function RoomsTable({ rooms, isFiltered }) {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [showRoster, setShowRoster] = useState(null);

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
      {rooms.map((room, index) => {
        const isMaintenance = room.roomStatus === "Maintenance";
        const isFull = !isMaintenance && room.remainingSlots === 0;
        const isAvailable = !isMaintenance && room.remainingSlots > 0;

        return (
          <div
            key={index}
            className="relative rounded-lg h-[430px] flex flex-col shadow-[0px_0px_20px_1px_#cbd5e0] w-[310px] bg-white"
          >
            {isMaintenance && (
              <div className="absolute w-full h-full top-0 left-0 bg-black/60  rounded-lg flex flex-col items-center justify-center">
                <img src={roadBlock} alt="" className="w-20" />
                <h1 className="text-white text-3xl text-center font-medium">
                  This room is under maintenance
                </h1>
                <button
                onClick={() => handleStatusChange("Available", room.roomNumber)}
                 className="px-2 py-2 text-white font-medium bg-blue-500 hover:bg-blue-600 transition-colors duration-300 cursor-pointer rounded-lg mt-5">
                  Set to available
                </button>
              </div>
            )}
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3">
              <div>
                <p className="text-gray-400 text-sm">Room no</p>
                <h1 className="text-xl font-bold">{room.roomNumber}</h1>
              </div>

              <span
                className={clx(
                  "px-3 py-1 rounded-full text-white text-sm font-medium",
                  isMaintenance && "bg-amber-500",
                  isFull && "bg-red-500",
                  isAvailable && "bg-green-500"
                )}
              >
                {isMaintenance && "Maintenance"}
                {isFull && "Full"}
                {isAvailable && "Available"}
              </span>
            </div>

            {/* Details */}
            <div className="px-4">
              <p className="font-semibold mb-2">Room details</p>
              <div className="space-y-2 text-sm">
                <div>
                  <p className="text-gray-400">Room Type</p>
                  <p className="font-medium">{room.roomType}</p>
                </div>
                <div>
                  <p className="text-gray-400">Capacity</p>
                  <p className="font-medium">{room.capacity}</p>
                </div>
                <div>
                  <p className="text-gray-400">Room Gender</p>
                  <p className="font-medium">{room.roomGender}</p>
                </div>
                <div>
                  <p className="text-gray-400">Remaining Slots</p>
                  <p className="font-medium">{room.remainingSlots}</p>
                </div>
              </div>
            </div>

            {/* Roster */}
            <div className="px-4">
              <p className="font-semibold mb-2">Room Roster</p>
              {room.assignedTenants > 0 ? (
                <button
                  onClick={() => setShowRoster(room)}
                  className="px-4 py-2 bg-blue-500 rounded-full text-white text-sm hover:bg-blue-600 transition"
                >
                  View roster ({room.assignedTenants})
                </button>
              ) : (
                <p className="text-gray-500 text-sm">No tenants assigned</p>
              )}
            </div>

            {/* Actions */}
            <div className="mt-auto flex gap-2 px-4 py-3 border-t">
              <button
                onClick={() => setSelectedRoom(room)}
                className="flex-1 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
              >
                <FaEdit size={20} className="mx-auto" />
              </button>

              <button
                onClick={() => handleDelete(room.roomId, room.roomNumber)}
                className="flex-1 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
              >
                <MdDeleteOutline size={20} className="mx-auto" />
              </button>

              <button
                onClick={() => handleStatusChange("Maintenance", room.roomNumber)}
                className="flex-1 py-2 px-2 bg-amber-500 text-white rounded hover:bg-amber-600 transition"
              >
                Maintenance
              </button>
            </div>
          </div>
        );
      })}

      {selectedRoom && (
        <EditRoom onClose={() => setSelectedRoom(null)} room={selectedRoom} />
      )}

      {showRoster && (
        <RoomRoster onClose={() => setShowRoster(null)} room={showRoster} />
      )}
    </div>
  );
}

export default RoomsTable;
