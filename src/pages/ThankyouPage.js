import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Paper } from '@mui/material';

export default function ThankYouPage() {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/jobs');
        }, 3000);
        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <Container maxWidth="sm">
            <Paper sx={{ p: 4, mt: 8, textAlign: 'center' }}>
                <Typography variant="h4" gutterBottom>
                    🎉 Thank You!
                </Typography>
                <Typography variant="body1">
                    Your application has been submitted successfully.
                </Typography>
                <Typography variant="body2" sx={{ mt: 2 }}>
                    Redirecting to job listings...
                </Typography>
            </Paper>
        </Container>
    );
}
