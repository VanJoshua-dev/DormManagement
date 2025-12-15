import connect_db from "../config/database-config.js";

const tenants_model = {
    async get_all_tenants(search, status, move_in_date) {
        const conn = await connect_db();

        try {
            const query = `SELECT
                t.id AS tenantID,
                CONCAT(a.first_name, ' ', a.last_name) AS tenant_name,
                r.room_number,
                t.move_in_date,
                t.next_due_date AS due_date,
                t.payment_status
            FROM tenants t
            JOIN applications a 
                ON t.application_id = a.id
            JOIN room_assignments ra 
                ON ra.tenant_id = t.id
                AND ra.is_active = TRUE
            JOIN rooms r 
                ON ra.room_id = r.id
            WHERE
                t.status = 'Active'

                AND (
                    CONCAT(a.first_name, ' ', a.last_name) LIKE CONCAT('%', ?, '%')
                    OR r.room_number LIKE CONCAT('%', ?, '%')
                )

                AND (
                    ? = ''
                    OR t.payment_status = ?
                )

                AND (
                    ? = '' 
                    OR DATE(t.move_in_date) >= ?
                )

                AND (
                    ? = '' 
                    OR DATE(t.move_in_date) <= ?
                )
            ORDER BY t.move_in_date DESC;`;

            const params = [search, search, status, status, move_in_date, move_in_date, move_in_date, move_in_date]

            const [rows] = await conn.execute(query, params);

            return rows;
        } finally {
            //Do nothing -_-
        }
    }
}

export default tenants_model;