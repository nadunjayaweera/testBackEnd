const pool = require('../database/db');

const getUserByEmailAndPassword = async (email, password) => {
  const query = {
    text: 'SELECT * FROM users WHERE email = $1 AND password = $2',
    values: [email, password],
  };
  const { rows } = await pool.query(query);
  return rows[0];
};

export default getUserByEmailAndPassword;