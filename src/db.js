import "dotenv/config";
import pg from "pg";

const { Pool } = pg;

function getPoolConfig() {
    const connectionString = process.env.DATABASE_URL?.trim();

    if (connectionString) {
        return { connectionString };
    }

    const required = [
        "POSTGRES_HOST",
        "POSTGRES_USER",
        "POSTGRES_PASSWORD",
        "POSTGRES_DB",
    ];
    const missing = required.filter((name) => !process.env[name]);

    if (missing.length > 0) {
        throw new Error(`Missing required environment variables: ${missing.join(", ")}`);
    }

    const port = Number(process.env.POSTGRES_PORT || 5432);
    if (!Number.isInteger(port) || port < 1 || port > 65535) {
        throw new Error("POSTGRES_PORT must be a valid port number (1-65535).");
    }

    return {
        host: process.env.POSTGRES_HOST,
        port,
        user: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
        connectionTimeoutMillis: 5000,
    };
}

export const pool = new Pool(getPoolConfig());

pool.on("error", (error) => {
    console.error("Unexpected PostgreSQL pool error:", error.message);
});
