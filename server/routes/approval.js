const express = require('express');
const db = require('../db');
const auth = require('../middleware/auth');
const router = express.Router();
const cors = require('cors');
const corsOptions = {
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
};

router.use(cors(corsOptions));
router.use(express.json());

router.get('/', auth(['staff']), (req, res) => {
  db.query('SELECT * FROM jobs WHERE approved = 0', (err, results) => {
    if (err) return res.sendStatus(500);
    res.json(results);
  });
});

router.post('/:id/approve', auth(['staff']), (req, res) => {
  db.query('UPDATE jobs SET approved = 1 WHERE id = ?', [req.params.id], (err) => {
    if (err) return res.sendStatus(500);
    res.sendStatus(200);
  });
});

module.exports = router;