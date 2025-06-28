const express = require('express');
const cors = require('cors');
const app = express();

const corsOptions = {
    origin: 'http://localhost:3000', // your frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true
};

// ✅ Global middleware
app.use(cors(corsOptions));
app.use(express.json());

app.use('/auth', require('./routes/auth'));
app.use('/jobs', require('./routes/jobs'));
app.use('/approval', require('./routes/approval'));

app.listen(5001, () => console.log('Server running on port 5001'));