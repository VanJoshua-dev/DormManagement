import connect_db from "../config/database-config.js";

const rooms_model = {
    async get_all_rooms(search = "", status = "", type = "", gender = "") {
        const conn = await connect_db();

        const query = `
        SELECT
    r.id AS roomId,
    r.room_number AS roomNumber,
    r.room_type AS roomType,
    r.capacity AS capacity,
    r.gender AS roomGender,
    r.status AS roomStatus,

    COUNT(ra.id) AS assignedTenants, 

    r.capacity - COUNT(ra.id) AS remainingSlots

FROM rooms r
LEFT JOIN room_assignments ra 
    ON ra.room_id = r.id
    AND ra.is_active = TRUE
LEFT JOIN tenants t 
    ON ra.tenant_id = t.id
    AND t.status = 'Active'


WHERE 
    r.room_number LIKE CONCAT('%', ?, '%')

    AND (
        ? = '' OR 
        r.status = ?
    )

    AND (
        ? = '' OR 
        r.gender = ?
    )

    AND (
        ? = '' OR 
        r.room_type = ?
    )

GROUP BY 
    r.id, r.room_number, r.room_type, r.capacity, r.gender, r.status

ORDER BY 
    r.room_number;


        `;

        const params = [search, status, status, gender, gender, type, type];

        const [rows] = await conn.execute(query, params);

        return rows;
    },

    async create_room(room_number, room_type, capacity, gender) {
        const conn = await connect_db();

        const [result] = await conn.execute(`INSERT INTO rooms (room_number, room_type, capacity, gender) VALUES (?, ?, ?, ?)`, [room_number, room_type, capacity, gender]);

        return result.insertId;
    },

    async update_room(room_number, room_type, capacity, gender, room_id) {
        const conn = await connect_db();

        const [result] = await conn.execute(`UPDATE rooms SET room_number = ?, room_type = ?, capacity = ?, gender = ? WHERE id = ?`, [room_number, room_type, capacity, gender, room_id]);

        return result.affectedRows;
    },

    async update_room_status(new_status, room_number) {
        const conn = await connect_db();

        const [result] = await conn.execute(`UPDATE rooms SET status = ? WHERE room_number = ?`, [new_status, room_number]);

        return result.affectedRows;
    },

    async delete_room(room_id) {
        const conn = await connect_db();

        const [result] = await conn.execute(`DELETE FROM rooms WHERE id = ?`, [room_id]);

        return result.affectedRows;
    }
}


export default rooms_model;