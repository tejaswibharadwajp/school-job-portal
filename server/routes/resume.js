const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const pdfParse = require('pdf-parse');

const upload = multer({ dest: 'uploads/' });

router.post('/parse', upload.single('resume'), async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

        const filePath = path.resolve(req.file.path);
        const dataBuffer = await fs.promises.readFile(filePath);
        const pdf = await pdfParse(dataBuffer);
        const text = pdf.text;

        const response = {
            firstName: getData(text, /Name[:\-]?\s*(\w+)/i),
            lastName: getData(text, /Last\s*Name[:\-]?\s*(\w+)/i),
            email: getData(text, /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]+)/),
            phone: getData(text, /(\+?\d[\d\s\-\(\)]{7,})/),
            address: getData(text, /Address[:\-]?\s*(.*)/i),
            skills: extractSkills(text),
            experience: extractExperience(text),
            educationStatus: text.includes('Currently studying') || text.includes('Pursuing')
                ? 'currently_graduating'
                : 'graduate'
        };

        res.json(response);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Resume parsing failed' });
    }
});

function getData(text, regex) {
    const match = text.match(regex);
    return match ? match[1].trim() : '';
}

function extractSkills(text) {
    const skillsMatch = text.match(/Skills\s*[:\-]?\s*(.*)/i);
    if (skillsMatch) {
        return skillsMatch[1].split(/[,•\n]/).map(s => s.trim()).filter(Boolean);
    }
    return [];
}

function extractExperience(text) {
    const expMatch = text.match(/Experience\s*[:\-]?\s*((.|\n){30,300})/i);
    return expMatch ? expMatch[1].split('\n')[0].trim() : '';
}

module.exports = router;
