import express from "express"

import { fetch_all_rooms } from "../controllers/room-controller.js";

const router = express.Router();

router.get("/get_all_rooms", fetch_all_rooms);

router.get("/test", (req, res) => {
    res.send("It is working");
});


export default router;
