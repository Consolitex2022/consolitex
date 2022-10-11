import { FC, useState, MouseEvent } from 'react'

import Image from "next/image";
import { useRouter } from "next/router";

import { Box, Grid, Typography, Chip, IconButton, Button, Popper } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorderRounded';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareRoundedIcon from '@mui/icons-material/ShareRounded';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';

import { CaracteristicaContainer, tieneCaracteristica } from './InmuebleCard';

import { Inmueble } from '../../pages';

import { BanosIcon, HabitacionesIcon, MetrajeIcon, TerrenoIcon, EstacionamientosIcon, PlantaIcon, PozoIcon } from '../icons';
import { numberWithDots, ucfirst } from '../../utils/functions';

interface Props {
    inmueble: Inmueble;
}
export const InmuebleCardGrid: FC<Props> = ({ inmueble }) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const [favorite, setFavorite] = useState<boolean>(false);

    const handleFav = () => {
        setFavorite(prev => !prev);
    }

    const togglePopup = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    }
    const router = useRouter();
    const { url_inmueble, data } = inmueble;
    const info = `${ucfirst(data.urbanizacion)}, ${ucfirst(data.municipio)}, ${ucfirst(data.Estado)}`;


    const redirect = (ficha_id: string) => {
        window.open(`/inmueble/${ficha_id}`, '_blank')
    }
    return (
        <Box sx={styles.mainContainer} >
            <Grid container flexWrap="wrap" justifyContent="space-between" sx={{ background: "#FFF", overflow: "hidden", borderRadius: 5, "&:hover": { boxShadow: "0 0 5px rgba(0,0,0,0.3)" } }}>

                {/* Contenedor de la imagen del inmueble */}
                <Grid item xs={12} sm={4}>
                    <Box sx={styles.imageContainer} onClick={() => redirect(data.ficha_id)}>
                        <Image alt={data.nombre} src={`https://consolitex.org/newImg.php?url=${encodeURI(url_inmueble)}`} layout='fill'
                            objectFit='cover' />
                    </Box>
                </Grid>
                <Grid item xs={12} sx={{ p: 1 }}>

                    {/* Precio y codigo */}
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mt: 1, position: "relative", overflow: "hidden" }}>

                        <IconButton disableRipple onClick={togglePopup} size="small" sx={{ borderRadius: "10px", color: "grey", ml: -1.5, "&:hover": { background: "none" } }}>
                            <MoreVertRoundedIcon />
                        </IconButton>
                        <Typography variant="subtitle1" fontWeight="bold">
                            REF {numberWithDots(Number(data.ref))}
                        </Typography>
                        <Chip variant="outlined" color="primary" size="small" label={`${data.ficha_id0}`} sx={{ mr: 1 }} />
                    </Box>

                    {/* Localidad */}
                    <Typography variant="subtitle2" fontWeight="bold" color="text.secondary">
                        {info.length > 25 ? info.substring(0, 25) + "..." : info}
                    </Typography>
                    {/* Contenedor scrolleable de las caracteristicas */}
                    <Box sx={styles.scrollableContainer}>
                        <CaracteristicaContainer icon={<BanosIcon />} conditionalText={`${data.banos} ${Number(data.banos) !== 1 ? 'Baños' : 'Baño'}`} />
                        <CaracteristicaContainer icon={<HabitacionesIcon />} conditionalText={`${data.habitaciones} ${Number(data.habitaciones) !== 1 ? 'Habitaciones' : 'Habitación'}`} />

                        {
                            Number(data.mts2) > 0 && (<CaracteristicaContainer icon={<MetrajeIcon />} conditionalText={`${data.mts2} m2`} />)
                        }
                        {
                            Number(data.mtst) > 0 && (<CaracteristicaContainer icon={<TerrenoIcon />} conditionalText={`${data.mtst} m2 de terreno`} />)
                        }
                        {
                            Number(data.estacionamiento) > 0 && (<CaracteristicaContainer icon={<EstacionamientosIcon />} conditionalText={`${data.estacionamiento} ${Number(data.estacionamiento) !== 1 ? 'Puestos' : 'Puesto'}`} />)
                        }
                        {
                            (tieneCaracteristica(String(data.planta))) && (<CaracteristicaContainer icon={<PlantaIcon />} conditionalText={`Planta electrica ${ucfirst(data.planta.toLowerCase())}`} />)
                        }
                        {
                            (tieneCaracteristica(String(data.pozo))) && (<CaracteristicaContainer icon={<PozoIcon />} conditionalText={`Pozo profundo `} />)
                        }
                    </Box>
                </Grid>
            </Grid>
            {/* Popup de like y compartir */}
            <Popper open={Boolean(anchorEl)} anchorEl={anchorEl} placement="top-start">
                <Box sx={{ bgcolor: 'background.paper', display: "flex", flexDirection: "column", ml: 1, p: 1, border: "1px solid rgba(0,0,0,0.1)", borderRadius: 4, width: 50, }}>
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                        <Button fullWidth onClick={handleFav} color="error" variant="text" sx={{ "&:hover": { background: "none" } }}>
                            {favorite ? (<FavoriteIcon color="error" />) : (<FavoriteBorderIcon sx={{ color: "darkgrey !important" }} />)}
                        </Button>
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                        <Button fullWidth sx={{ "&:hover": { background: "none" } }}>
                            <ShareRoundedIcon />
                        </Button>
                    </Box>
                </Box>
            </Popper>
        </Box >
    )
}
const styles = {
    mainContainer: {
        width: 200,
        height: 220,
        mb: 16,
        mr: 2,
    },
    imageContainer: {
        width: 200,
        minHeight: 200,
        height: { xs: "auto", sm: "auto" },
        position: "relative",
        overflow: "hidden",
        cursor: "pointer"
    },
    codContainer: {
        display: "flex",
        justifyContent: "space-between",
        ml: 2,
        mr: 2,
        p: 2,
        alignItems: "center"
    },
    scrollableContainer: {
        display: "flex",
        flexWrap: "nowrap",
        justifyContent: "left",
        textAlign: "left",
        mr: 4,
        mb: 2,
        width: "96%",
        maxWidth: "100%",
        overflowX: "scroll",
        "&::-webkit-scrollbar": {
            height: 8,
            width: 16
        },
        "&::-webkit-scrollbar-track, &::-webkit-scrollbar-corner": {
            backgroundColor: "transparent",
        },
        "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#E1E1E1",
            borderRadius: 10,
            backgroundClip: "padding-box",
            border: "2px solid transparent",
        },
        "&::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "#d2d7ff",

        },
        "&::-webkit-scrollbar-button:single-button:vertical:decrement": {
            height: "12px",
            width: "16px",
            backgroundPosition: "center 4px",
            backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' fill='rgb(200,200,200)'><polygon points='50,00 0,50 100,50'/></svg>")`,
        },

        "&::-webkit-scrollbar-button:single-button:vertical:decrement:hover": {
            backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' fill='rgb(112, 112, 112)'><polygon points='50,00 0,50 100,50'/></svg>")`,
        },
        "&::-webkit-scrollbar-button:single-button:vertical:decrement:active": {
            backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' fill='rgb(128, 128, 128)'><polygon points='50,00 0,50 100,50'/></svg>")`,
        },
        /* Down */
        "&::-webkit-scrollbar-button:single-button:vertical:increment": {
            height: "12px",
            width: "16px",
            backgroundPosition: "center 2px",
            backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' fill='rgb(200,200,200)'><polygon points='0,0 100,0 50,50'/></svg>")`,
        },
        "&::-webkit-scrollbar-button:single-button:vertical:increment:hover": {
            backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' fill='rgb(112, 112, 112)'><polygon points='0,0 100,0 50,50'/></svg>")`,
        },
        "&::-webkit-scrollbar-button:single-button:vertical:increment:active": {
            backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' fill='rgb(128, 128, 128)'><polygon points='0,0 100,0 50,50'/></svg>")`,
        },
        "&::-webkit-scrollbar-button:single-button": {
            backgroundColor: "transparent",
            display: "block",
            backgroundSize: "5px",
            backgroundRepeat: "no-repeat",
        },
        "&::-webkit-scrollbar-button:single-button:horizontal:decrement": {
            height: "12px",
            width: "12px",
            backgroundPosition: "center center",
            backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' fill='rgb(200,200,200)'><polygon points='0,50 50,100 50,0'/></svg>")`,
        },
        "&::-webkit-scrollbar-button:single-button:horizontal:decrement:hover": {
            backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' fill='rgb(112, 112, 112)'><polygon points='0,50 50,100 50,0'/></svg>")`,
        },
        "&::-webkit-scrollbar-button:single-button:horizontal:decrement:active": {
            backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' fill='rgb(128, 128, 128)'><polygon points='0,50 50,100 50,0'/></svg>")`,
        },
        "&::-webkit-scrollbar-button:single-button:horizontal:increment": {
            height: "12px",
            width: "12px",
            backgroundPosition: "center center",
            backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' fill='rgb(200,200,200)'><polygon points='0,0 0,100 50,50'/></svg>")`,
        },
        "&::-webkit-scrollbar-button:single-button:horizontal:increment:hover": {
            backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' fill='rgb(112, 112, 112)'><polygon points='0,0 0,100 50,50'/></svg>")`,
        },
        "&::-webkit-scrollbar-button:single-button:horizontal:increment:active": {
            backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' fill='rgb(128, 128, 128)'><polygon points='0,0 0,100 50,50'/></svg>")`,
        }
    }
}