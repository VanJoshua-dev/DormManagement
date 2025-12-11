import rooms_model from "../models/rooms-model.js";


export const fetch_all_rooms = async (req, res) => {
    const search = req.query.search || "";
    const status = req.query.status || "";
    const type = req.query.type || "";
    const gender = req.query.gender || "";
    try {
        const rooms = await rooms_model.get_all_rooms(search, status, type, gender);

        return res.status(200).json({success: true, error: false, message: "Rooms Successfully fetched.", rooms: rooms});
    } catch (error) {
        console.error("fetch_all_rooms controller error: ", error);
        return res.status(403).json({success: false, error: true, message: "Failed to fetch rooms"});
    }
}