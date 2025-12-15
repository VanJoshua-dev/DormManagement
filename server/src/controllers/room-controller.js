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

export const add_new_room = async (req, res) => {
    const {room_number, room_type, capacity, gender} = req.body;

    try {
        const addRoom = await rooms_model.create_room(room_number, room_type, capacity, gender);

        return res.status(200).json({success: true, error: false, message: "You've successfully added a new room.", insertId: addRoom})
    } catch (error) {
        console.error("add_new_room controller error: ", error);
        return res.status(403).json({success: false, error: true, message: "Failed to add new room"});
    }

}

export const edit_room = async (req, res) => {
    const {room_number, room_type, capacity, gender, room_id} = req.body;

    try {
        const editRoom = await rooms_model.update_room(room_number, room_type, capacity, gender, room_id);

        return res.status(200).json({success: true, error: false, message: "You've successfully updated room.", affectedRows: editRoom})
    } catch (error) {
        console.error("edit_room controller error: ", error);
        return res.status(403).json({success: false, error: true, message: "Failed to update room"});
    }
}

export const change_room_status = async (req, res) => {
    const {new_status, room_number} = req.body;

    try {
        const changeStatus = await rooms_model.update_room_status(new_status, room_number);

        return res.status(200).json({success: true, error: false, message: `You've updated room ${room_number} status to ${new_status}.`, affectedRows: changeStatus})
    } catch (error) {
        console.error("change_room_status controller error: ", error);
        return res.status(403).json({success: false, error: true, message: "Failed to change room status."});
    }
}

export const remove_room = async (req, res) => {
    const {room_id} = req.params;

    try {
        const deleteRoom = await rooms_model.delete_room(room_id);

        return res.status(200).json({success: true, error: false, message: `You've deleted a room.`, affectedRows: deleteRoom})
    } catch (error) {
        console.error("remove_room controller error: ", error);
        return res.status(403).json({success: false, error: true, message: "Failed to delete room."});
    }
}