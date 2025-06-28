import { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Card,
    CardContent,
    CardMedia,
    Container,
    Grid,
    Typography,
    Chip,
    Box
} from '@mui/material';


export default function JobList() {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5001/jobs/all')
            .then(res => setJobs(res.data))
            .catch(() => alert("Failed to fetch jobs"));
    }, []);

    return (
        <Container sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>
                Approved Job Listings
            </Typography>

            <Grid container spacing={3}>
                {jobs.map((job) => (
                    <Grid item xs={12} md={6} lg={4} key={job.id}>
                        <Card sx={{ height: '100%' }}>
                            {job.company_logo && (
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={job.company_logo}
                                    alt={`${job.company_name} logo`}
                                />
                            )}
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    {job.job_title}
                                </Typography>
                                <Typography variant="subtitle1" color="text.secondary">
                                    {job.company_name}
                                </Typography>

                                <Box sx={{ mt: 1, mb: 1 }}>
                                    <Chip label={job.job_type} sx={{ mr: 1 }} />
                                    <Chip label={job.paid} sx={{ mr: 1 }} />
                                    <Chip label={job.location_type} />
                                </Box>

                                <Typography variant="body2" sx={{ mb: 1 }}>
                                    {job.description.length > 150
                                        ? job.description.slice(0, 150) + '...'
                                        : job.description}
                                </Typography>

                                <Typography variant="caption" color="text.secondary">
                                    Posted on: {new Date(job.posted_date).toLocaleDateString()}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}
