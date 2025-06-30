import { useState } from 'react';
import ErrorSnackbar from '../components/ErrorSnackbar';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [error, setError] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const login = async () => {
    try {
      const res = await axios.post(
          'http://localhost:5001/auth/login',
          { username, password },
          { withCredentials: true }
      );

      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', res.data.role);

      if (res.data.role === 'staff') navigate('/approve');
      else if (res.data.role === 'company') navigate('/new');
      else navigate('/jobs');
    } catch (error) {
  setError('Login failed'); setSnackbarOpen(true);
    }
  };

  return (
      <>
      <ErrorSnackbar open={snackbarOpen} onClose={() => setSnackbarOpen(false)} message={error} />
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ mt: 8, p: 4 }}>
          <Typography variant="h5" align="center" gutterBottom>
            Login
          </Typography>

          <Box component="form" noValidate autoComplete="off">
            <TextField
                fullWidth
                margin="normal"
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />

            <TextField
                fullWidth
                margin="normal"
                type="password"
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <Button
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 3 }}
                onClick={login}
            >
              Login
            </Button>
          </Box>
        </Paper>
      </Container>
      </>

  );
}
