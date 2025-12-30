import application_model from "../models/application-model.js";
import rooms_model from "../models/rooms-model.js";
import tenants_model from "../models/tenants-model.js";
export const room_assignment = async (req, res) => {
    const { name, application_id, gender } = req.body;

    try {
        // 1. Approve application
        await application_model.update_application_status("Approved", application_id);

        // 2. Insert tenant
        const tenantId = await tenants_model.insert_tenant(application_id);

        // 3. Get best room (already prioritized)
        const room = await rooms_model.get_room_for_assignment(gender);

        if (!room) {
            return res.status(400).json({
                success: false,
                message: "No available rooms found"
            });
        }

        // 4. Assign tenant
        await application_model.room_assignment(room.id, tenantId);

        return res.status(200).json({
            success: true,
            message: `${name} has been assigned to room ${room.room_number}`
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong..."
        });
    }
};

export const change_room = async (req, res) => {
    const { roomID, tenantID } = req.body;

    try {
        // Deactivate the current assignment
        await tenants_model.deactivate_assignment(tenantID);

        // Insert into new room
        await application_model.room_assignment(roomID, tenantID)

        return res.status(200).json({ success: true, error: false, message: "Successfully change room" });
    } catch (error) {
        console.log(error);

        return res.status(500).json({ success: false, error: true, message: "Failed change room" })
    }
}

