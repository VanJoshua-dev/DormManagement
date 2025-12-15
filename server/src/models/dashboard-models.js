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
                    a.student_id_number,
                    a.first_name,
                    a.last_name,
                    a.gender,
                    a.year_level,
                    a.status
                FROM applications a
                JOIN tenants t ON t.application_id = a.id
                WHERE a.status = 'On-Hold'
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