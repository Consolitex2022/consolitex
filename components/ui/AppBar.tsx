import { FC, useContext, useState, MouseEvent } from 'react';
import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Avatar, Button, Tooltip, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { AuthContext } from '../../context/authcontext';
import { getCookieValue } from '../../utils/functions';
import blue from '@mui/material/colors/blue';

interface Props {
    title: string;
    transparent?: boolean;
}
type Pages = {
    name: string;
    path: string
}
type Settings = {
    name: string;
    path: string
}

const pages: Pages[] = [
    { name: 'Buscar inmueble', path: "/search" }
];
const settings: Settings[] = [
    { name: 'Mi perfil', path: "/profile" },
    { name: 'Mis likes', path: "/likes" },
    { name: 'Cerrar sesión', path: "/end" }
];
/* const adminSettings: Settings[] = [
    { name: "Administrar usuarios", path: "/admin" },
    { name: "Cerrar sesión", path: "/end" },
]
const notLoggedPages: Pages[] = [
    {
        name: "Log In",
        path: "/",
    },
    {
        name: "Registrarse",
        path: "/register"
    }
]
 */
interface PropsMenuPc {
    title: string;
    handleOpenNavMenu: (event: MouseEvent<HTMLElement>) => void;
    anchorElNav: null | HTMLElement;
    handleCloseNavMenu: (event: MouseEvent<HTMLElement>) => void;
}
interface PropsMobile {
    title: string;
    handleCloseNavMenu: (event: MouseEvent<HTMLElement>) => void;
    transparent?: boolean;
}

interface PropsMenuUser {
    anchorElUser: null | HTMLElement;
    handleOpenUserMenu: (event: MouseEvent<HTMLElement>) => void;
    handleCloseUserMenu: (event: MouseEvent<HTMLElement>, path: string) => void;
}

const MenuPc: FC<PropsMenuPc> = ({ title, handleOpenNavMenu, anchorElNav, handleCloseNavMenu }) => {
    return (
        <>
            <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }} >
                <Image alt="Logo Consolitex" src="/logo.png" width="100" height="100" loading="lazy" />
            </Box>
            <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={{
                    mr: 2,
                    display: { xs: 'none', md: 'flex' },
                    fontWeight: 500,
                    color: 'inherit',
                    textDecoration: 'none',
                }}
            >
                Consolitex®
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                    size="large"
                    aria-label="Menu de navegacion"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleOpenNavMenu}
                    color="inherit"
                >
                    <MenuIcon />
                </IconButton>
                <Menu
                    id="menu-appbar"
                    anchorEl={anchorElNav}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    open={Boolean(anchorElNav)}
                    onClose={handleCloseNavMenu}
                    sx={{
                        display: { xs: 'block', md: 'none' },
                    }}
                >
                    {pages.map((page) => (
                        <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                            <Typography textAlign="center" color="text.primary">{page.name}</Typography>
                        </MenuItem>
                    ))}
                </Menu>
            </Box>
        </>
    )
}

const MenuMobile: FC<PropsMobile> = ({ title = "Consolitex", handleCloseNavMenu, transparent = false }) => {
    return (
        <>
            <Box sx={{ display: { xs: "flex", md: "none" }, alignItems: "center" }} >
                <Image alt="Logo Consolitex" src="/logo.webp" width="50" height="50" loading='lazy' />
            </Box>
            <Typography
                variant="h5"
                sx={{
                    mr: 2,
                    display: { xs: 'flex', md: 'none' },
                    flexGrow: 1,
                    fontWeight: 600,
                    color: 'inherit',
                    textDecoration: 'none',
                }}
            >
                Consolitex®
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                {pages.map((page) => (
                    <Button
                        key={page.name}
                        onClick={handleCloseNavMenu}
                        color="neutral"
                        sx={{ my: 2, color: !transparent ? "neutral.contrastText" : "white", display: 'block' }}
                    >
                        {page.name}
                    </Button>
                ))}
            </Box>


        </>
    )
}

const MenuUsuario: FC<PropsMenuUser> = ({ handleOpenUserMenu, anchorElUser, handleCloseUserMenu }) => {
    const userData = useContext(AuthContext);
    return (
        <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Opciones de usuario">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar sx={{ background: userData.color ? userData.color : blue[700] }} alt={userData.id !== 0 ? `${userData.nombres.substring(0, 1).toUpperCase()}${userData.apellidos.substring(0, 1).toUpperCase()}` : "C"}>{userData.id !== 0 ? `${userData.nombres.substring(0, 1).toUpperCase()}${userData.apellidos.substring(0, 1).toUpperCase()}` : "C"}</Avatar>
                </IconButton>
            </Tooltip>
            <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
            >
                {settings.map((setting) => (
                    <MenuItem key={setting.name} onClick={(e: MouseEvent<HTMLElement>) => handleCloseUserMenu(e, setting.path)}>
                        <Typography textAlign="center" sx={{ fontFamily: "Hind" }}>{setting.name}</Typography>
                    </MenuItem>
                ))}
            </Menu>
        </Box>
    )
}
const ResponsiveAppBar: FC<Props> = ({ title = "Consolitex", transparent = false }) => {
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
    const userData = useContext(AuthContext)
    const { token, email, id } = useContext(AuthContext);
    const router = useRouter()
    const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = (e: MouseEvent<HTMLElement>, path: string) => {
        setAnchorElUser(null);
        router.push(path)
    };

    /**
     * Props del menu de PC
     */
    const pcMenuProps = { title, handleOpenNavMenu, anchorElNav, handleCloseNavMenu };

    /**
     * Props del menu de Mobile
     */
    const mobileMenuProps = { title, handleCloseNavMenu };

    /**
     * Props del menu de usuario
     */
    const userMenuProps = { handleOpenUserMenu, anchorElUser, handleCloseUserMenu };
    return (
        <AppBar position="static" elevation={0} color={!transparent ? "neutral" : undefined} sx={{ background: transparent ? "transparent" : '#FFF', boxShadow: "none", }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters >
                    <MenuPc {...pcMenuProps} />
                    <MenuMobile {...mobileMenuProps} transparent={transparent} />

                    {
                        id !== 0 && (<MenuUsuario {...userMenuProps} />)
                    }
                    {
                        id === 0 && (<>
                            <Button color="secondary" onClick={() => router.push("/auth/register")} variant="text" size="small" sx={{ fontWeight: "bold", boxShadow: "0", textTransform: "none", }}>Regístrate</Button>
                            <Button color="secondary" onClick={() => router.push("/auth/login")} variant="contained" size="small" sx={{ fontWeight: "bold", boxShadow: "0", textTransform: "none", }}>LogIn</Button>
                        </>
                        )
                    }
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default ResponsiveAppBar;
