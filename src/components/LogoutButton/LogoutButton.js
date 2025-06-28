import {useNavigate} from "react-router-dom";
import {IconButton, Tooltip} from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';

export default function LogoutButton() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('role');
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <Tooltip title="Logout">
            <IconButton color="inherit" onClick={handleLogout}>
                <LogoutIcon />
            </IconButton>
        </Tooltip>
    );
}