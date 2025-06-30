import {
    Box,
    Button,
    Card,
    CardContent,
    Container,
    Grid,
    Typography,
    Stack,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import WorkIcon from "@mui/icons-material/Work";
import SchoolIcon from "@mui/icons-material/School";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import logo from '../assets/logo_color.png';

const HomePage = () => {
    return (
        <Box
            sx={{
                minHeight: "100vh",
                backgroundImage: "url('/bg.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundAttachment: "fixed",
                position: "relative",
                color: "#fff",
            }}
        >
            {/* Overlay */}
            <Box
                sx={{
                    position: "absolute",
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    bgcolor: "rgba(0,0,0,0.6)",
                    zIndex: 1,
                }}
            />

            <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2, py: 8 }}>
                {/* Hero Section */}
                <Box textAlign="center" mb={6}>
                    <img
                        src={logo}
                        alt="Opportunity Board Logo"
                        style={{ height: 80, marginBottom: 16 }}
                    />
                    <Typography variant="h3" fontWeight="bold" gutterBottom>
                        Welcome to Opportunity Board
                    </Typography>
                    <Typography variant="h6" maxWidth="md" mx="auto">
                        Your Gateway to Career Opportunities – for students, employers, and staff alike.
                    </Typography>
                </Box>

                {/* Card Section */}
                <Grid container spacing={4} justifyContent="center">
                    <Grid item xs={12} sm={6} md={4}>
                        <Card sx={{ backgroundColor: "rgba(255,255,255,0.1)", color: "#fff" }}>
                            <CardContent>
                                <WorkIcon fontSize="large" />
                                <Typography variant="h5" gutterBottom>
                                    For Employers
                                </Typography>
                                <Typography variant="body1" mb={2}>
                                    Post internships, job shadowing, and connect with student talent.
                                </Typography>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    component={RouterLink}
                                    to="/login"
                                >
                                    Submit a Job
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <Card sx={{ backgroundColor: "rgba(255,255,255,0.1)", color: "#fff" }}>
                            <CardContent>
                                <SchoolIcon fontSize="large" />
                                <Typography variant="h5" gutterBottom>
                                    For Students
                                </Typography>
                                <Typography variant="body1" mb={2}>
                                    Browse jobs, apply easily, and grow your real-world experience.
                                </Typography>
                                <Button
                                    variant="contained"
                                    color="success"
                                    fullWidth
                                    component={RouterLink}
                                    to="/login"
                                >
                                    Browse Jobs
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <Card sx={{ backgroundColor: "rgba(255,255,255,0.1)", color: "#fff" }}>
                            <CardContent>
                                <AdminPanelSettingsIcon fontSize="large" />
                                <Typography variant="h5" gutterBottom>
                                    For Staff
                                </Typography>
                                <Typography variant="body1" mb={2}>
                                    Review and approve job postings submitted by employers.
                                </Typography>
                                <Button
                                    variant="contained"
                                    color="warning"
                                    fullWidth
                                    component={RouterLink}
                                    to="/login"
                                >
                                    Staff Login
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

                {/* Footer */}
                <Box mt={8} textAlign="center">
                    <Typography variant="body2" color="gray">
                        &copy; 2025 School Guidance Department. All rights reserved.
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
};

export default HomePage;
