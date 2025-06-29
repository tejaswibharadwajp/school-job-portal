import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Box,
  Chip,
  Button,
  Stack
} from '@mui/material';

export default function ApproveJobs() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetchUnapprovedJobs();
  }, []);

  const fetchUnapprovedJobs = () => {
    axios.get('http://localhost:5001/approval', {headers: {Authorization: 'Bearer ' + localStorage.getItem('token')}})
        .then((res) => setJobs(res.data))
        .catch(() => alert('Failed to load unapproved jobs.'));
  };

  const handleApprove = async (jobId) => {
    try {
      await axios.post(`http://localhost:5001/approval/${jobId}/approve`, {}, {headers: {Authorization: 'Bearer ' + localStorage.getItem('token')}});
      fetchUnapprovedJobs();
    } catch (err) {
      alert('Approval failed');
    }
  };

  return (
      <Container sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Approve Job Postings
        </Typography>

        <Grid container spacing={3}>
          {jobs.map((job) => (
              <Grid item xs={12} md={6} lg={4} key={job.id}>
                <Card>
                  {job.company_logo && (
                      <CardMedia
                          component="img"
                          height="140"
                          image={job.company_logo}
                          alt={`${job.company_name} logo`}
                      />
                  )}
                  <CardContent>
                    <Typography variant="h6">{job.job_title}</Typography>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                      {job.company_name}
                    </Typography>

                    <Box sx={{ my: 1 }}>
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

                    <Stack direction="row" justifyContent="flex-end" sx={{ mt: 2 }}>
                      <Button
                          variant="contained"
                          size="small"
                          onClick={() => handleApprove(job.id)}
                      >
                        Approve
                      </Button>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
          ))}
        </Grid>
      </Container>
  );
}
