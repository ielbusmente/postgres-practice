import { pool } from './db.js';

try {
  const { rows } = await pool.query(
    'SELECT current_database() AS database, current_user AS user, version() AS server_version',
  );
  const connection = rows[0];

  console.log('Connected to PostgreSQL successfully.');
  console.log(`Database: ${connection.database}`);
  console.log(`User: ${connection.user}`);
  console.log(`Server: ${connection.server_version}`);
} catch (error) {
  console.error('Could not connect to PostgreSQL:', error.message);
  process.exitCode = 1;
} finally {
  await pool.end();
}
