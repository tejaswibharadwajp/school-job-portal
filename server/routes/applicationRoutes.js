const express = require('express');
const multer = require('multer');
const path = require('path');
const db = require('../db');
const router = express.Router();

const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => {
        cb(null, Date.now() + '_' + file.originalname);
    }
});

const upload = multer({ storage });

router.post('/submit', upload.single('resume'), async (req, res) => {
    const {
        firstName,
        lastName,
        address,
        email,
        phone,
        skills,
        experience,
        educationStatus
    } = req.body;

    const resume_filename = req.file?.filename || null;

    try {
        const result = await db.execute(
            `INSERT INTO job_applications 
      (first_name, last_name, address, email, phone, skills, experience, education_status, resume_filename) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [firstName, lastName, address, email, phone, skills, experience, educationStatus, resume_filename]
        );

        res.status(201).json({ success: true, id: result.insertId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Application submission failed' });
    }
});

router.get('/all', async (req, res) => {
    try {
        const [rows] = await db.execute(`
      SELECT a.*, j.job_title
      FROM job_applications a
      LEFT JOIN jobs j ON a.job_id = j.id
      ORDER BY a.submitted_at DESC
    `);
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch applications' });
    }
});

router.get('/resume/:filename', (req, res) => {
    const file = path.join(__dirname, '../uploads', req.params.filename);
    res.download(file);
});

module.exports = router;
