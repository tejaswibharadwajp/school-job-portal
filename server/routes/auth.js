const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db');
const router = express.Router();
const cors = require('cors');
const corsOptions = {
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
};

// ✅ Apply CORS to this router
router.use(cors(corsOptions));
router.use(express.json());


router.post('/login', (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);
  db.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
    if (err || !results.length) return res.sendStatus(401);
    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);
    console.log(password, user.password);
    if (!isMatch) return res.sendStatus(401);
    const token = jwt.sign({ id: user.id, role: user.role }, 'secret');
    res.json({ token, role: user.role });
  });
});

module.exports = router;