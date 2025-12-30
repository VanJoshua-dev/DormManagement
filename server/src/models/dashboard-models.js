import connect_db from "../config/database-config.js";

const dashboard_model = {
    async get_dashboard_data() {
        const conn = await connect_db();

        try {
            const [
                [totalRooms],
                [totalTenants],
                [availableRooms],
                [pendingApplications],
                [recentApplications],
                [pendingPayments]
            ] = await Promise.all([
                conn.execute(`SELECT COUNT(*) AS count FROM rooms`),
                conn.execute(`SELECT COUNT(*) AS count FROM tenants`),
                conn.execute(`SELECT COUNT(*) AS count FROM rooms WHERE status = 'Available'`),
                conn.execute(`SELECT COUNT(*) AS count FROM applications WHERE status = 'On-Hold'`),

                // Recent applications table
                conn.execute(`
                SELECT
                    student_id_number,
                    first_name,
                    last_name,
                    gender,
                    year_level,
                    status
                FROM applications
                ORDER BY date_applied DESC
                LIMIT 5
            `),

                conn.execute(`
               SELECT
                t.id AS tenantID,
                CONCAT(a.first_name, ' ', a.last_name) AS tenant_name,
                r.room_number,
                t.move_in_date,
                t.next_due_date AS due_date,
                t.payment_status AS status
            FROM tenants t
            JOIN applications a 
                ON t.application_id = a.id
            JOIN room_assignments ra 
                ON ra.tenant_id = t.id
                AND ra.is_active = TRUE
            JOIN rooms r 
                ON ra.room_id = r.id
            WHERE
            t.status = 'Active' AND t.payment_status = 'Overdue'
            ORDER BY due_date DESC;
            `)
            ]);

            return {
                metrics: {
                    total_rooms: totalRooms[0].count,
                    total_tenants: totalTenants[0].count,
                    available_rooms: availableRooms[0].count,
                    pending_applications: pendingApplications[0].count
                },
                tables: {
                    recent_applications: recentApplications,
                    pending_payments: pendingPayments
                }
            };

        } finally {
            //
        }
    }
}

export default dashboard_model;