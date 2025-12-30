



export const add_new_room_middleware = (req, res, next) => {
    const { room_number, room_type, capacity, gender } = req.body;

    if (!room_number || !room_type || !capacity || !gender) {
        return res.status(400).json({ success: false, error: true, message: "Missing room information" });
    }

    next();
}

export const update_room_middleware = (req, res, next) => {
    const { room_number, room_type, capacity, gender, room_id } = req.body;

    if (!room_number || !room_type || !capacity || !gender || !room_id) {
        return res.status(400).json({ success: false, error: true, message: "Missing room information" });
    }

    next();
}

export const update_room_status_middleware = (req, res, next) => {
    const { new_status, room_number } = req.body;

    if (!room_number || !new_status) {
        return res.status(400).json({ success: false, error: true, message: "Missing room information" });
    }

    next();
}

export const delete_room_middleware = (req, res, next) => {
    const { room_id } = req.params;
    console.log(room_id)
    if (!room_id) {
        return res.status(400).json({ success: false, error: true, message: "Missing room ID" });
    }

    next();
}

export const change_room_middleware = async (req, res, next) => {
    const { roomID, tenantID } = req.body;

    if (!roomID || !tenantID) {
        return res.status(400).json({ success: false, error: true, message: "Missing ID's" })
    }

    next();
}

export const view_roster_middleware = async (req, res, next) => {
    const {roomNumber} = req.params;

    if(!roomNumber){
        return res.status(400).json({success: false, error: true, message: "Missing room number"})
    }

    next();
}