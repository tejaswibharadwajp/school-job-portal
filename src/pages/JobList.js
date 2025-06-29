import { useEffect, useState } from 'react';
import {
    Card,
    CardContent,
    CardMedia,
    Container,
    Grid,
    Typography,
    Chip,
    Box,
    Button
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function JobList() {
    const [jobs, setJobs] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:5001/jobs/all')
            .then(res => setJobs(res.data))
            .catch(() => alert("Failed to fetch jobs"));
    }, []);

    const handleApply = (jobId) => {
        navigate(`/apply/${jobId}`);
    };

    return (
        <Container sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>
                Approved Job Listings
            </Typography>

            <Grid container spacing={3}>
                {jobs.map((job) => (
                    <Grid item xs={12} md={6} lg={4} key={job.id}>
                        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                            {job.company_logo && (
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={job.company_logo}
                                    alt={`${job.company_name} logo`}
                                />
                            )}
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography variant="h6">{job.job_title}</Typography>
                                <Typography variant="subtitle2" color="text.secondary">
                                    {job.company_name}
                                </Typography>

                                <Box sx={{ mt: 1, mb: 1 }}>
                                    <Chip label={job.job_type} sx={{ mr: 1 }} />
                                    <Chip label={job.paid} sx={{ mr: 1 }} />
                                    <Chip label={job.location_type} />
                                </Box>

                                <Typography variant="body2" sx={{ mb: 2 }}>
                                    {job.description.length > 150
                                        ? job.description.slice(0, 150) + '...'
                                        : job.description}
                                </Typography>

                                <Typography variant="caption" color="text.secondary">
                                    Posted on: {new Date(job.posted_date).toLocaleDateString()}
                                </Typography>
                            </CardContent>

                            <Box sx={{ p: 2 }}>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    onClick={() => handleApply(job.id)}
                                >
                                    Apply
                                </Button>
                            </Box>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}
