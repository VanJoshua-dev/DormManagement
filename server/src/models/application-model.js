import connect_db from "../config/database-config.js";

const application_model = {

    async get_applications(search, status, date_applied) {
        const conn = await connect_db();
        try {
            const query = `SELECT
                    a.id AS applicationId,
                    a.student_id_number AS studentIdNumber,
                    a.first_name AS firstName,
                    a.last_name AS lastName,
                    a.gender AS gender,
                    a.year_level AS yearLevel,
                    a.email AS email,
                    a.contact_number AS contactNumber,
                    a.status AS status,
                    a.date_applied AS dateApplied
                FROM applications a
                WHERE
                    (
                        a.student_id_number LIKE CONCAT('%', ?, '%')
                        OR CONCAT(a.first_name, ' ', a.last_name) LIKE CONCAT('%', ?, '%')
                    )

                    AND (
                        ? = '' OR a.status = ?
                    )

                    AND (
                        ? = '' OR DATE(a.date_applied) >= ?
                    )

                    AND (
                        ? = '' OR DATE(a.date_applied) <= ?
                    )

                ORDER BY a.date_applied DESC;
                `

            const params = [search, search, status, status, date_applied, date_applied, date_applied, date_applied];

            const [rows] = await conn.execute(query, params);

            return rows;
        } finally {
            // conn.release?.();
        }
    },

    async check_application() {
        const conn = await connect_db();
        const [result] = await conn.execute(`SELECT * FROM applications WHERE status = "Approved" OR status = "On-Hold";`);
        return result;
    },

    async post_application_form(student_id, first_name, last_name, gender, year_level, email, contact_number) {
        const conn = await connect_db();

        try {
            const [result] = await conn.execute(
                `INSERT INTO applications 
                (student_id_number, first_name, last_name, gender, year_level, email, contact_number) 
                VALUES (?, ?, ?, ?, ?, ?, ?)`,
                [student_id, first_name, last_name, gender, year_level, email, contact_number]
            );

            return result.insertId;

        } finally {
            // conn.release?.();
        }
    },
    async application_accessibility(){
        const conn = await connect_db();

        const [rows] = await conn.execute("SELECT isOpen FROM application_form_accessibility;");

        return rows;
    },
    async update_application_accessibility(status){
        const conn = await connect_db();

        const [rows] = await conn.execute("update application_form_accessibility set isOpen = ? where id = 1;", [status]);

        return rows.affectedRows;
    }
}

export default application_model;