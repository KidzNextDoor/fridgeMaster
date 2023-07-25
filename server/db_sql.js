const { Pool } = require("pg");
const connectionString = process.env.CONNECTION_STRING;

const pool = new Pool({
  connectionString: connectionString,
});

// every time we make a query to the database, this function will fire
async function query() {
  const client = await pool.connect()
  try {
    const result = await client.query('SELECT * from Users')
    // release the client so that it doesn't take up memory
    client.release()
  } catch (error) {

  }
}

module.exports = pool;