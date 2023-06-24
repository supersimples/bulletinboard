const pool = require("../../../db");

const validateDupRegister = async (req, res, next) => { 
  const connection = await pool.getConnection();
  const {email, user_id} = req.body;

  const [rows, fields] = await connection.execute('SELECT email, user_id FROM user');

  if (rows.find(row => row.email === email)) {
    res.status(403).send('duplicate_email');
    return;
  }
  if (rows.find(row => row.user_id === user_id)) {
    res.status(403).send('duplicate_id');
    return;
  }

  next();
  connection.release();
};

module.exports = validateDupRegister;