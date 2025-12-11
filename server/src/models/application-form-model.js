import connect_db from "../config/database-config.js";

const application_form = {
    async post_application_form(student_id, firstname, lastname, yearlevel, email, contactnumber) {
        const conn = await connect_db();

        try {
            const [result] = await conn.execute(
                `INSERT INTO application 
                (student_id_number, first_name, last_name, year_level, email, contact_number) 
                VALUES (?, ?, ?, ?, ?, ?)`,
                [student_id, firstname, lastname, yearlevel, email, contactnumber]
            );

            return result.insertId;

        } finally {
            conn.release?.();
        }
    }
};

export default application_form;
