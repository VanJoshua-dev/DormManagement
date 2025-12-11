import React, { useState } from "react";
import clx from "clsx";
import { FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import EditRoom from "./modals/edit-room-modal";
function RoomsTable() {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const rooms = [
    {
      roomNo: "18",
      roomCapacity: "4",
      roomGender: "Male",
      remainingSlot: "0",
      roomRoster: ["John Doe", "Robert Santos", "Super Man", "Diddy"],
      roomStatus: "Full",
    },
    {
      roomNo: "12",
      roomCapacity: "2",
      roomGender: "Female",
      remainingSlot: "2",
      roomRoster: [],
      roomStatus: "Available",
    },
    {
      roomNo: "4",
      roomCapacity: "1",
      roomGender: "Male",
      remainingSlot: "1",
      roomRoster: [],
      roomStatus: "Maintenance",
    },
  ];
  return (
    <div className="w-full px-5 flex flex-row flex-wrap gap-3 ">
      {/**
       * Card
       */}
      {rooms.map((room, index) => (
        <div
          key={index}
          className="px-3 py-2 pb-11 relative rounded-lg flex flex-col shadow-[0px_0px_20px_1px_#cbd5e0] w-70"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Room no</p>
              <h1 className="text-xl font-bold">{room.roomNo}</h1>
            </div>
            <span
              className={clx(
                "px-2 py-1 rounded-full text-white text-sm font-medium",
                (room.roomStatus === "Full" && "bg-red-500") ||
                  (room.roomStatus === "Available" && "bg-green-500") ||
                  (room.roomStatus === "Maintenance" && "bg-amber-500")
              )}
            >
              {room.roomStatus} {/** Change this to drop down */}
            </span>
          </div>
          <div className="pt-2">
            <p className="font-semibold ">Room details</p>
            <div className="py-2 px-2">
              <div>
                <p className="text-gray-400 text-sm">Capacity</p>
                <h1 className="text-md font-medium px-2">
                  {room.roomCapacity}
                </h1>
              </div>
              <div>
                <p className="text-gray-400 text-medium text-sm">Room Gender</p>
                <h1 className="text-md font-medium px-2">{room.roomGender}</h1>
              </div>
               <div>
                <p className="text-gray-400 text-medium text-sm">Remaining Slot</p>
                <h1 className="text-md font-medium px-2">{room.remainingSlot}</h1>
              </div>
            </div>
          </div>
          <div className="pt-2">
            <p className="font-semibold ">Room Roster</p>
            <div className="py-2 px-2 flex gap-2 flex-wrap">
              {room.roomRoster.length !== 0 ? (
                room.roomRoster.map((tenant, index) => (
                  <div
                    key={index}
                    className="flex px-1 py-1 bg-gray-200 rounded-lg flex-row items-center gap-2"
                  >
                    <h1 className="text-md">{tenant}</h1>
                  </div>
                ))
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
            <button className="py-2 px-2 bg-red-500 text-white rounded-sm cursor-pointer hover:bg-red-600 transition-colors duration-300">
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
