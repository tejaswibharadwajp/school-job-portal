const express = require('express');
const cors = require('cors');
const app = express();

const corsOptions = {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());

app.use('/auth', require('./routes/auth')); // to check the user credentials
app.use('/jobs', require('./routes/jobs')); // to fetch the job list
app.use('/applications', require('./routes/applicationRoutes'));
app.use('/approval', require('./routes/approval'));
app.use('/resume', require('./routes/resume'));

app.listen(5001, () => console.log('Server running on port 5001'));