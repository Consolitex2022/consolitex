import { FC, useContext } from 'react';

import Box from '@mui/material/Box';
import { AppBar } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';

import { MenuMobile, MenuUser } from '.';
import { Pages } from "../../interfaces/pages-type";
import { AuthContext } from '../../context/authcontext';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { CustomImage } from '../images/CustomImage';

const notLoggedPages: Pages[] = [
    {
        name: "Log In",
        path: "/auth/login",
    },
    {
        name: "Registrarse",
        path: "/auth/register"
    }
]

interface Props {
    title: string;
    transparent?: boolean;
}

export const AppBarComponent: FC<Props> = ({ title, transparent = false }) => {

    const user = useContext(AuthContext)

    // Router
    const router = useRouter();

    const currentPath = router.pathname;

    // Render
    return (
        <AppBar position="sticky" color={!transparent ? "neutral" : 'primary'} elevation={0} sx={{ background: transparent ? "transparent" : '#FFF', boxShadow: "none" }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    {user.id !== 0 && (
                        <>
                            <MenuMobile />
                            <MenuUser />
                        </>
                    )}
                    {user.id === 0 && (<>
                        <Box sx={{ width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                            <CustomImage src='/logo.png' upperBoxStyles={{ width: { xs: 120, sm: 120, md: 120, xl: 120 }, height: { xs: 120, sm: 120, md: 120, lg: 120 }, }} alt='Logo Consolitex' />
                            {/* <Button onClick={() => router.push("/auth/login")} color="primary" disableElevation sx={{ borderRadius: 10, textTransform: "none" }} variant="contained">
                                Iniciar sesion
                            </Button> */}
                        </Box>
                    </>
                    )}
                </Toolbar>
            </Container>
        </AppBar >
    );
};
