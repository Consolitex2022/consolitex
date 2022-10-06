import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Avatar, Button, Tooltip, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { FC, useState, MouseEvent } from 'react';
import Image from 'next/image';

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
    handleCloseUserMenu: (event: MouseEvent<HTMLElement>) => void;
}

const MenuPc: FC<PropsMenuPc> = ({ title, handleOpenNavMenu, anchorElNav, handleCloseNavMenu }) => {
    return (
        <>
            <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }} >
                <Image alt="Logo Consolitex" src="/logo.png" width="80" height="80" />
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
                <Image alt="Logo Consolitex" src="/logo.webp" width="50" height="50" />
            </Box>
            <Typography
                variant="h5"
                noWrap
                component="a"
                href=""
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
    return (
        <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Opciones de usuario">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="Avatar usuario">{"RandomUser".substring(0, 1)}</Avatar>
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
                    <MenuItem key={setting.name} onClick={handleCloseUserMenu}>
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

    // Por ahora el token esta en false, luego se obtendrá desde la cookie y se podrá iniciar sesion y todo eso...
    const token = false;
    const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
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
        <AppBar position="static" elevation={0} color={!transparent ? "neutral" : undefined} sx={{ background: transparent ? "transparent" : '', boxShadow: "none", }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters >
                    <MenuPc {...pcMenuProps} />
                    <MenuMobile {...mobileMenuProps} transparent={transparent} />
                    {
                        token && (<MenuUsuario {...userMenuProps} />)
                    }
                    {
                        !token && (<>
                            <Button color="secondary" variant="text" size="small" sx={{ fontWeight: "bold", boxShadow: "0", textTransform: "none", }}>Regístrate</Button>
                            <Button color="secondary" variant="contained" size="small" sx={{ fontWeight: "bold", boxShadow: "0", textTransform: "none", }}>LogIn</Button>
                        </>
                        )
                    }
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default ResponsiveAppBar;
