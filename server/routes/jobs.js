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

// ✅ Apply CORS to this router
router.use(cors(corsOptions));
router.use(express.json());

// GET all jobs
router.get('/all', async (req, res) => {
    try {
        db.query('SELECT * FROM jobs WHERE approved = true ORDER BY posted_date DESC', (err, results) => {
            if (err) return res.sendStatus(500);
            res.json(results);
        });
    } catch (err) {
        res.status(500).json({ error: 'DB Fetch Failed' });
    }
});

router.post('/', auth(['company']), async (req, res) => {
    const {
        company_logo,
        company_name,
        job_title,
        job_type,
        description,
        paid,
        location_type,
        posted_date = new Date()
    } = req.body;

    try {
        const result = await db.execute(
            `INSERT INTO jobs (
        company_logo, company_name, job_title, job_type, description,
        paid, location_type, posted_date
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [company_logo, company_name, job_title, job_type, description, paid, location_type, posted_date]
        );
        res.status(201).json({ id: result.insertId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'DB Insert Failed' });
    }
});

module.exports = router;