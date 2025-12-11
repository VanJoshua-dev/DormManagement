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

            r.capacity - COUNT(ra.id) AS remainingSlots,

            GROUP_CONCAT(
                CONCAT(a.first_name, ' ', a.last_name)
                SEPARATOR ', '
            ) AS roster

        FROM rooms r
        LEFT JOIN room_assignments ra 
            ON ra.room_id = r.id
            AND ra.is_active = TRUE
        LEFT JOIN tenants t 
            ON ra.tenant_id = t.id
            AND t.status = 'Active'
        LEFT JOIN applications a 
            ON t.application_id = a.id

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

    async add_new_room(){
        
    }
}


export default rooms_model;