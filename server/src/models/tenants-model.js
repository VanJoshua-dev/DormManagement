import connect_db from "../config/database-config.js";

const tenants_model = {
    async get_all_tenants(search, status, move_in_date) {
        const conn = await connect_db();

        try {
            const query = `SELECT
                t.id AS tenantID,
                CONCAT(a.first_name, ' ', a.last_name) AS tenant_name,
                a.gender AS Gender,
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
            //  Nothings
        }
    },

    async insert_tenant(application_id) {
        const conn = await connect_db();

        const [result] = await conn.execute(
            `
            INSERT INTO tenants 
            (application_id, payment_status, next_due_date, move_in_date, status)
            VALUES (?, 'Paid', DATE_ADD(CURDATE(), INTERVAL 4 MONTH), CURDATE(), 'Active')
            `,
            [application_id]
        );

        return result.insertId;
    },

    async update_payment_status(tenantID, status) {
        const conn = await connect_db();

        let query;
        let params = [];

        if (status === "Paid") {
            query = `
            UPDATE tenants 
            SET 
                payment_status = ?, 
                next_due_date = DATE_ADD(next_due_date, INTERVAL 4 MONTH)
            WHERE id = ?;
        `;
            params = [status, tenantID];
        }
        else if (status === "Overdue") {
            query = `
            UPDATE tenants 
            SET payment_status = ?
            WHERE id = ?;
        `;
            params = [status, tenantID];
        }
        else {
            throw new Error("Invalid payment status");
        }

        const [result] = await conn.execute(query, params);
        return result.affectedRows;
    },

    async update_tenant_info() {

    },

    async remove_tenant(tenantID) {
        const conn = await connect_db();

        const [result] = await conn.execute(
            "UPDATE tenants SET move_out_date = CURDATE(), status = 'Inactive' WHERE id = ?;",
            [tenantID]
        )

        return result.affectedRows
    },

    async deactivate_assignment(tenantID) {
        const conn = await connect_db();

        const [result] = await conn.execute(`UPDATE room_assignments
            SET is_active = FALSE
            WHERE tenant_id = ?
            AND is_active = TRUE;`, [tenantID])


        return result.affectedRows;
    },

    


}

export default tenants_model;