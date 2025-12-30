import connect_db from "../config/database-config.js";

const rooms_model = {
    async get_all_rooms(search = "", status = "", type = "", gender = "") {
        const conn = await connect_db();

        const query = `
                SELECT
                r.id AS roomId,
                r.room_number AS roomNumber,
                r.room_type AS roomType,
                r.capacity,
                r.gender AS roomGender,

                COUNT(t.id) AS assignedTenants,
                r.capacity - COUNT(t.id) AS remainingSlots,

                CASE
                    WHEN r.status = 'Maintenance' THEN 'Maintenance'
                    WHEN r.capacity - COUNT(t.id) = 0 THEN 'Full'
                    ELSE 'Available'
                END AS roomStatus

            FROM rooms r
            LEFT JOIN room_assignments ra
                ON ra.room_id = r.id
                AND ra.is_active = TRUE
            LEFT JOIN tenants t
                ON t.id = ra.tenant_id
                AND t.status = 'Active'

            WHERE
                r.room_number LIKE CONCAT('%', ?, '%')
                AND (? = '' OR r.gender = ?)
                AND (? = '' OR r.room_type = ?)

            GROUP BY
                r.id,
                r.room_number,
                r.room_type,
                r.capacity,
                r.gender,
                r.status

            HAVING
                ? = ''
                OR (? = 'Maintenance' AND r.status = 'Maintenance')
                OR (? = 'Full' AND r.status != 'Maintenance' AND COUNT(t.id) = r.capacity)
                OR (? = 'Available' AND r.status != 'Maintenance' AND COUNT(t.id) < r.capacity)

            ORDER BY r.room_number;
        `;

        const params = [search, gender, gender, type, type, status, status, status, status];

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
    },

    async get_room_for_assignment(gender) {
        const conn = await connect_db();

        const [rows] = await conn.execute(`
        SELECT
            r.id,
            r.room_number,
            r.capacity,
            COUNT(ra.id) AS current_occupants,
            (r.capacity - COUNT(ra.id)) AS remaining_slots
        FROM rooms r
        LEFT JOIN room_assignments ra
            ON ra.room_id = r.id
            AND ra.is_active = TRUE
        LEFT JOIN tenants t
            ON ra.tenant_id = t.id
            AND t.status = 'Active'
        WHERE
            r.status = 'Available'
            AND r.gender = ?
        GROUP BY r.id
        HAVING remaining_slots > 0
        ORDER BY
            -- Priority 1: partially filled rooms
            (current_occupants > 0) DESC,
            -- Random within priority
            RAND()
        LIMIT 1
    `, [gender]);

        return rows[0]; // return single best room
    },

    async view_roster(roomNumber) {
        const conn = await connect_db();

        const [result] = await conn.execute(`
                    SELECT
            CONCAT(a.first_name, ' ', a.last_name) AS tenant_name,
            t.move_in_date,
            t.payment_status
        FROM room_assignments ra
        JOIN tenants t
            ON ra.tenant_id = t.id
            AND t.status = 'Active'
        JOIN applications a
            ON t.application_id = a.id
        JOIN rooms r
            ON ra.room_id = r.id
        WHERE
            ra.is_active = TRUE
            AND r.room_number = ?;
                    `, [roomNumber]);

        return result;
    }
}


export default rooms_model;