import React, {useState} from 'react';
import {
    Box,
    Button,
    Container,
    Grid,
    MenuItem,
    Paper,
    TextField,
    Typography
} from '@mui/material';
import axios from 'axios';

const jobTypes = ['Job', 'Internship', 'Opportunity'];
const paidOptions = ['Paid', 'Unpaid'];
const locationOptions = ['Remote', 'Hybrid', 'On-site'];

export default function JobPostForm() {
    const [formData, setFormData] = useState({
        company_logo: '',
        company_name: '',
        job_title: '',
        job_type: '',
        description: '',
        paid: '',
        location_type: '',
        posted_date: new Date().toISOString().split('T')[0],
    });

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async () => {
        try {
            await axios.post('http://localhost:5001/jobs', formData, {headers: {Authorization: 'Bearer ' + localStorage.getItem('token')}});
            alert('Job posted successfully!');
        } catch (error) {
            console.error(error);
            alert('Error posting job');
        }
    };

    return (
        <Container maxWidth="md">
            <Paper elevation={3} sx={{padding: 4, mt: 5}}>
                <Typography variant="h5" gutterBottom>
                    Post a Job Opportunity
                </Typography>

                <Box component="form" noValidate autoComplete="off" sx={{mt: 3}}>
                    <Grid container spacing={3}>
                        {/* Company Details */}
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Company Name"
                                name="company_name"
                                value={formData.company_name}
                                onChange={handleChange}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Company Logo URL"
                                name="company_logo"
                                value={formData.company_logo}
                                onChange={handleChange}
                            />
                        </Grid>

                        {/* Job Information */}
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Job Title"
                                name="job_title"
                                value={formData.job_title}
                                onChange={handleChange}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                select
                                label="Job/Opportunity Type"
                                name="job_type"
                                value={formData.job_type}
                                onChange={handleChange}
                            >
                                {jobTypes.map((type) => (
                                    <MenuItem key={type} value={type}>
                                        {type}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>

                        {/* Job Settings */}
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                select
                                label="Paid or Unpaid"
                                name="paid"
                                value={formData.paid}
                                onChange={handleChange}
                            >
                                {paidOptions.map((option) => (
                                    <MenuItem key={option} value={option}>
                                        {option}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                select
                                label="Remote / Hybrid / On-site"
                                name="location_type"
                                value={formData.location_type}
                                onChange={handleChange}
                            >
                                {locationOptions.map((loc) => (
                                    <MenuItem key={loc} value={loc}>
                                        {loc}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>

                        {/* Description */}
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                multiline
                                minRows={4}
                                label="Job Description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                            />
                        </Grid>

                        {/* Posted Date (optional field) */}
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                type="date"
                                label="Posted Date"
                                name="posted_date"
                                value={formData.posted_date}
                                onChange={handleChange}
                                InputLabelProps={{shrink: true}}
                            />
                        </Grid>

                        {/* Submit */}
                        <Grid item xs={12}>
                            <Button variant="contained" fullWidth onClick={handleSubmit}>
                                Submit Job
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
        </Container>
    );
}
