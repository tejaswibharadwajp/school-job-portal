import {
    AppBar,
    Toolbar,
    Typography,
    Box,
    Container
} from '@mui/material';
import LogoutButton from '../LogoutButton/LogoutButton';
import logo from '../../assets/logo_color.png';
import UserMenu from "../UserMenu/UserMenu";
import useAuth from "../../utils/useAuth";
export default function Header() {

    const { isAuthenticated } = useAuth();

    return (
        <AppBar className={'appHeader'} position="sticky" color="transparent">
            <Container maxWidth="lg">
                <Toolbar>
                    <Box display="flex" alignItems="center" sx={{ flexGrow: 1 }}>
                        <img
                            src={logo}
                            alt="College Job Board Logo"
                            style={{ height: 40, marginRight: 12 }}
                        />
                        <Typography variant="h6" component="div">
                            College Job Board
                        </Typography>
                    </Box>
                    {isAuthenticated && <>
                        <UserMenu/>
                        <LogoutButton/>
                    </>}

                </Toolbar>
            </Container>
        </AppBar>
    );
}
