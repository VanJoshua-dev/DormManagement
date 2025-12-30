import dotenv from "dotenv";
import mysql from "mysql2/promise";

dotenv.config();

// Validate required environment variables
const requiredEnvVars = ['DB_HOST', 'DB_USER', 'DB_PASSWORD', 'DB_NAME', 'DB_PORT'];
for (const varName of requiredEnvVars) {
  if (!process.env[varName]) {
    throw new Error(`Environment variable ${varName} is required but not set.`);
  }
}

let pool;

async function connect_db() {
  if (!pool) {
    try {
      pool = mysql.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: parseInt(process.env.DB_PORT, 10),
        ssl: process.env.NODE_ENV === 'production' 
          ? { rejectUnauthorized: true } // Use proper SSL in production
          : { rejectUnauthorized: false }, // Allow self-signed in dev (but consider improving)
        waitForConnections: true,
        connectionLimit: 10, // Adjust based on your needs
        queueLimit: 0,
        acquireTimeout: 10000,
        timeout: 60000,
      });

      // Test the connection
      const connection = await pool.getConnection();
      console.log("Server is connected to database.");
      connection.release(); // Release the test connection back to the pool

    } catch (err) {
      console.error("Database connection failed:", err);
      throw err;
    }
  }

  return pool;
}



export default connect_db;
