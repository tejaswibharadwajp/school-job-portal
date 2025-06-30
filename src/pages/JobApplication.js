import { useEffect, useState } from 'react';
import ErrorSnackbar from '../components/ErrorSnackbar';
import {
    Container,
    Typography,
    Paper,
    TextField,
    Grid,
    Button,
    MenuItem,
    Box
} from '@mui/material';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function ApplyPage() {
  const [error, setError] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
    const { jobId } = useParams();

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        address: '',
        email: '',
        phone: '',
        skills: '',
        experience: '',
        educationStatus: '',
    });
    const [resumeFile, setResumeFile] = useState(null);
    const [jobTitle, setJobTitle] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (jobId) {
            axios.get(`http://localhost:5001/jobs/${jobId}`)
                .then(res => {
                    setJobTitle(res.data.job_title || '');
                })
                .catch(() => {
                    setJobTitle('');
                });
        }
    }, [jobId]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setResumeFile(file);

        const data = new FormData();
        data.append('resume', file);

        try {
            const res = await axios.post('http://localhost:5001/resume/parse', data, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            const parsed = res.data;
            setFormData((prev) => ({
                ...prev,
                firstName: parsed.firstName || '',
                lastName: parsed.lastName || '',
                address: parsed.address || '',
                email: parsed.email || '',
                phone: parsed.phone || '',
                skills: (parsed.skills || []).join(', '),
                experience: parsed.experience || '',
                educationStatus: parsed.educationStatus || '',
            }));
        } catch (err) {
  setError('Resume parsing failed'); setSnackbarOpen(true);
        }
    };

    const handleSubmit = async () => {
  setError('Please upload a resume'); setSnackbarOpen(true);

        const submission = new FormData();
        Object.entries(formData).forEach(([key, value]) => submission.append(key, value));
        submission.append('resume', resumeFile);
        submission.append('jobId', jobId);

        try {
            await axios.post('http://localhost:5001/applications/submit', submission, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            navigate('/thank-you');
        } catch (err) {
  setError('Submission failed'); setSnackbarOpen(true);
        }
    };

    return (
        <>
      <ErrorSnackbar open={snackbarOpen} onClose={() => setSnackbarOpen(false)} message={error} />
        <Container maxWidth="md">
            <Paper sx={{ p: 4, mt: 5 }}>
                <Typography variant="h5" gutterBottom>
                    Apply for: {jobTitle || `Job ID #${jobId}`}
                </Typography>

                <Box component="form" noValidate>
                    <Grid spacing={2} gridColumn={1} gridRow={4}>
                        <Grid item xs={12}>
                            <Button variant="outlined" component="label" fullWidth>
                                Upload Resume (PDF)
                                <input
                                    type="file"
                                    hidden
                                    accept=".pdf"
                                    onChange={handleFileUpload}
                                />
                            </Button>
                            {resumeFile && (
                                <Typography variant="caption" sx={{ mt: 1, display: 'block' }}>
                                    Uploaded: {resumeFile.name}
                                </Typography>
                            )}
                        </Grid>

                        <Grid item xs={6}>
                            <TextField label="First Name" name="firstName" fullWidth value={formData.firstName} onChange={handleChange} />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField label="Last Name" name="lastName" fullWidth value={formData.lastName} onChange={handleChange} />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField label="Address" name="address" fullWidth value={formData.address} onChange={handleChange} />
                        </Grid>

                        <Grid item xs={6}>
                            <TextField label="Email" name="email" type="email" fullWidth value={formData.email} onChange={handleChange} />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField label="Phone" name="phone" fullWidth value={formData.phone} onChange={handleChange} />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField label="Skills (comma separated)" name="skills" fullWidth value={formData.skills} onChange={handleChange} />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                label="Past Experience"
                                name="experience"
                                multiline
                                rows={3}
                                fullWidth
                                value={formData.experience}
                                onChange={handleChange}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                select
                                label="Education Status"
                                name="educationStatus"
                                fullWidth
                                value={formData.educationStatus}
                                onChange={handleChange}
                            >
                                <MenuItem value="graduate">Graduate</MenuItem>
                                <MenuItem value="currently_graduating">Currently Graduating</MenuItem>
                            </TextField>
                        </Grid>

                        <Grid item xs={12}>
                            <Button variant="contained" fullWidth onClick={handleSubmit}>
                                Submit Application
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
        </Container>
        </>
    );
}
