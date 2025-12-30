import express from "express"
// Room Controllers
import { fetch_all_rooms, add_new_room, edit_room, change_room_status, remove_room, view_roster } from "../controllers/room-controller.js";

// Room Middlewares
import { add_new_room_middleware, update_room_middleware, update_room_status_middleware, delete_room_middleware, change_room_middleware, view_roster_middleware } from "../middlewares/room-middlwares.js";

// For change room
import { change_room } from "../controllers/room-assignment-controller.js";
const router = express.Router();

router.get("/get_all_rooms", fetch_all_rooms);
router.get("/room_roster/:roomNumber", view_roster_middleware, view_roster )
router.post("/create_room", add_new_room_middleware, add_new_room);
router.put("/update_room", update_room_middleware, edit_room);
router.put("/change_room", change_room_middleware, change_room)
router.patch("/update_room_status", update_room_status_middleware, change_room_status);
router.delete("/delete_room/:room_id", delete_room_middleware, remove_room);
router.get("/test", (req, res) => {
    res.send("It is working");
});


export default router;
