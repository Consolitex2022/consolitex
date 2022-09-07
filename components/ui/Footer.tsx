import { FC } from 'react'
import { Box, Divider, Grid, IconButton, List, ListItemButton, ListItemIcon, ListItemText, ListSubheader, Typography, useTheme } from '@mui/material'
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import AdjustIcon from '@mui/icons-material/Adjust';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import LocalPhoneRoundedIcon from '@mui/icons-material/LocalPhoneRounded';
import { useRouter } from 'next/router';
import Image from 'next/image';

/**
 * Componente con informacion de la empresa
 * @returns Informacion de la empresa
 */
const Empresa = () => {
    return (
        <>
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'start' }}>
                <Image src='./logo.webp' alt='Logo Consolitex - Footer' width='80' height='80' />
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography component='h5' variant='overline' fontSize={16} fontWeight='bold' sx={{ fontFamily: 'Hind' }}>Consolitex®</Typography>
                    <Typography variant='subtitle2' fontWeight='100' sx={{ fontFamily: 'Hind', }}>Bienes Raíces</Typography>
                </Box>
            </Box>
            <Typography component='p' sx={{ textAlign: 'justify', fontFamily: 'Hind', }}>Somos tu mejor opción a la hora de buscar un inmueble en el estado Carabobo. Siempre estamos para servirte, ¡Consolitex te da más! RIF: J-29820228-9</Typography>
        </>
    )
}

/**
 * Componente con la informacion de contacto de la empresa
 * @returns Informacion de contacto de la empresa
 */
const Contacto = () => {
    return (
        <>
            <Typography variant='overline' fontSize={16} fontWeight='bold' sx={{ fontFamily: 'Hind' }}>Contacto</Typography>
            <Box>
                <Typography component='p' sx={{ display: 'flex', alignItems: 'start', textAlign: 'justify', fontFamily: 'Hind', }}>
                    <HomeRoundedIcon /> Av. Prolongación Michelena, Centro Comercial &apos;ARA&apos;, Nave &apos;E&apos;, Local 80-A-52. Estado, Valencia, Carabobo</Typography>
            </Box>
            <Box>
                <Typography component='p' sx={{ display: 'flex', alignItems: 'start', fontFamily: 'Hind', textAlign: 'justify' }}><LocalPhoneRoundedIcon />  0241-8134800</Typography>
            </Box>
        </>
    )
}

/**
 * Componente de menú con links internos de la empresa
 * @param theme Tema del MUI
 * @returns Lista de links
 */
const Menu = () => {

    // Router
    const router = useRouter();

    return (
        <List
            sx={{ width: '100%', maxWidth: 250, fontFamily: 'Hind', }}
            component='nav'
            aria-labelledby='links-internos-subheader'
            subheader={
                <ListSubheader component='div' sx={{ background: 'none', textAlign: { xs: 'center', md: 'start' }, color: '#FFF' }} id='links-internos-subheader'>
                    <Typography variant='overline' fontSize={16} fontWeight='bold' sx={{ fontFamily: 'Hind' }}>Links internos</Typography>
                </ListSubheader>
            }
        >
            <ListItemButton onClick={() => router.push('/')}>
                <ListItemIcon>
                    <AdjustIcon color='secondary' />
                </ListItemIcon>
                <ListItemText sx={{ fontFamily: 'Hind', }} primary='Inicio' />
            </ListItemButton>
            <ListItemButton onClick={() => router.push('/access')}>
                <ListItemIcon>
                    <AdjustIcon color='secondary' />
                </ListItemIcon>
                <ListItemText sx={{ fontFamily: 'Hind', }} primary='Acceso Ejecutivo' />
            </ListItemButton>
            <ListItemButton onClick={() => router.push('/condominios')}>
                <ListItemIcon>
                    <AdjustIcon color='secondary' />
                </ListItemIcon>
                <ListItemText sx={{ fontFamily: 'Hind', }} primary='Condominios' />
            </ListItemButton>
        </List>
    )
}

/**
 * Compoennte con links de redes sociales de la empresa
 * @returns Menu de iconos con redes
 */
const Redes = () => {
    return (
        <>
            <Typography variant='subtitle1' fontWeight='100' sx={{ fontFamily: 'Hind', }}>¡Conéctate a nuestras redes sociales!</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap' }}>
                <a rel='noreferrer' target='_blank' href='https://facebook.com/consolitex'>
                    <IconButton color='neutral'><FacebookIcon /></IconButton>
                </a>
                <a rel='noreferrer' target='_blank' href='https://instagram.com/consolitex'>
                    <IconButton color='neutral'><InstagramIcon /></IconButton>
                </a>
                <a rel='noreferrer' target='_blank' href='https://twitter.com/consolitex'>
                    <IconButton color='neutral'><TwitterIcon /></IconButton>
                </a>
                <a rel='noreferrer' target='_blank' href='https://wa.me/5804144029820'>
                    <IconButton color='neutral'><WhatsAppIcon /></IconButton>
                </a>
            </Box>
        </>
    )
}

// Functional Component
export const Footer: FC = () => {
    // Tema
    const theme = useTheme();

    // Render
    return (<>
        <Box sx={{ fontFamily: 'Hind', background: '#01579b', width: '100%', height: '100%', m: '20px auto auto auto', display: 'flex', flexDirection: 'column', flexWrap: 'wrap', position: 'relative' }}>
            <Box sx={{ zIndex: '900', width: '100%', m: 'auto', color: theme.palette.primary.contrastText, p: 2, display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: { xs: 'center', md: 'space-between' }, alignItems: 'center' }}>
                <Redes />
            </Box>
            <Divider sx={{ zIndex: '900', bgcolor: 'common.white' }} />
            <Grid container spacing={1} sx={{
                zIndex: '900',
                width: '100%', m: 'auto', color: theme.palette.primary.contrastText, p: 4, display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: { xs: 'center', md: 'space-between' }, alignItems: { xs: 'center', md: 'start' }
            }}>
                <Grid item xs={12} sm={4} sx={{ p: 5 }} display='flex' flexDirection='column' alignItems='center' justifyContent='center'>
                    <Empresa />
                </Grid>
                <Grid item xs={12} sm={4} sx={{ p: 5 }} display='flex' flexDirection='column' alignItems='center' justifyContent='center'>
                    <Menu />
                </Grid>
                <Grid item xs={12} sm={4} sx={{ p: 5 }} display='flex' flexDirection='column' alignItems='center' justifyContent='center'>
                    <Contacto />
                </Grid>
            </Grid>
            <Box sx={{ background: 'rgba(0,0,0,0.4)', padding: 1, width: '100%', textAlign: 'center', color: theme.palette.primary.contrastText }}>Desarrollado por Linz Web Dev</Box>
            <Box sx={{
                background: { xs: 'url(./shape4.png)', md: 'url(./shape2.png)' },
                backgroundSize: { xs: 'cover', md: 'cover' },
                opacity: { xs: 0.1, md: 0.1 },
                filter: { xs: 'brightness(0.20)', md: 'brightness(0.20)' },
                backgroundPosition: { xs: 'center', md: 'center' },
                backgroundAttachment: { xs: 'scroll', md: 'scroll' },
                backgroundRepeat: { xs: 'no-repeat', md: 'no-repeat' },
                position: { xs: 'absolute', md: 'absolute' },
                top: { xs: '0', md: '0' }, left: { xs: '0', md: '0' },
                width: { xs: '100%', md: '100%' },
                height: { xs: '100%', md: '100%' },
                transform: { xs: 'scale(-1, -1)', md: 'scale(-1,-1)' }
            }}></Box>
        </Box >
    </>
    )
}