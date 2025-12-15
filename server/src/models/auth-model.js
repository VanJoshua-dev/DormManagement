import connect_db from "../config/database-config.js";

const auth_model = {
    async find_admin(username, password) {
        const conn = await connect_db();

        const [rows] = await conn.execute("SELECT * FROM admin WHERE username = ? AND password_hash = ?", [username, password]);

        return rows;
    }
}


export default auth_model;