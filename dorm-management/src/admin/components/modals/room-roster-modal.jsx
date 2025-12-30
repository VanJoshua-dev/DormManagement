import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useViewRoster } from "../../../services/room-module-services";
import { TopLoader } from "../../../components/lightswind/top-loader";
function RoomRoster({ onClose, room }) {
  const { loading, roster } = useViewRoster(room.roomNumber);
  if(loading) return <TopLoader isLoading={loading} />
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="w-[90%] max-w-2xl h-[60%] bg-white rounded-lg shadow-lg flex flex-col"
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 30 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="px-4 py-3 border-b">
            <h1 className="text-xl font-semibold">
              Tenants in Room {room.roomNumber}
            </h1>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4">
            <motion.div
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
              initial="hidden"
              animate="show"
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: { staggerChildren: 0.06 },
                },
              }}
            >
              {/* Example tenant card */}
              {roster.map((tenant, index) => (
                <motion.div
                key={index}
                  variants={{
                    hidden: { opacity: 0, scale: 0.9 },
                    show: { opacity: 1, scale: 1 },
                  }}
                  className="flex flex-col items-center gap-2 p-3 border rounded-md hover:shadow transition"
                >
                  <FaUserCircle size={36} className="text-gray-400" />
                  <span className="text-sm font-medium text-center">
                    {tenant.tenant_name}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Footer */}
          <div className="px-4 py-3 border-t flex justify-end">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className="px-4 py-2 rounded-md bg-gray-600 text-white hover:bg-gray-700 transition"
            >
              Close
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default RoomRoster;
