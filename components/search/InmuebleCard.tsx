import { Box, Grid, Typography, IconButton, Tooltip, Chip, Button } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { FC, ReactNode } from 'react';
import { Inmueble } from '../../pages';
import { numberWithDots, ucfirst } from '../../utils/functions';
import { BanosIcon, EstacionamientosIcon, HabitacionesIcon, MetrajeIcon, PlantaIcon, PozoIcon, TerrenoIcon } from '../icons';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import ShareRoundedIcon from '@mui/icons-material/ShareRounded';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';

interface Props {
    inmueble: Inmueble;
}
interface IconContainer {
    icon: ReactNode;
    conditionalText: string;
}
export const CaracteristicaContainer: FC<IconContainer> = ({ icon, conditionalText }) => {
    return (
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-around", mr: 2 }}>
            {(icon)}
            <Typography color="text.primary" variant="subtitle2" sx={{ ml: 1, whiteSpace: "nowrap" }}>{conditionalText}</Typography>
        </Box>
    )
}
export const tieneCaracteristica = (caracteristica: string) => {
    if (!caracteristica) return false;

    switch (String(caracteristica.toLowerCase())) {
        case 'n':
            return false;
        case 'no':
            return false;
        case 'no tiene':
            return false;
        case 'no posee':
            return false;
        case 'noposee':
            return false;
        case 'notiene':
            return false;
        case '0':
            return false;
        default:
            return true
    }
}
export const InmuebleCard: FC<Props> = ({ inmueble }) => {

    const { url_inmueble, data } = inmueble;
    const info = `${ucfirst(data.urbanizacion)}, ${ucfirst(data.municipio)}, ${ucfirst(data.Estado)}`;
    const router = useRouter();
    const redirect = (ficha_id: string) => {
        window.open(`/inmueble/${ficha_id}`, '_blank')
    }
    return (
        <>

            <Box sx={styles.mainContainer} >
                <Grid container flexWrap="wrap" justifyContent="space-between">

                    {/* Contenedor de la imagen del inmueble */}
                    <Grid item xs={12} sm={4}>
                        <Box sx={styles.imageContainer} onClick={() => redirect(data.ficha_id)}>
                            <Image alt={data.nombre} src={`https://consolitex.org/newImg.php?nowatermark=1&url=${encodeURI(url_inmueble)}`} layout='fill' loading="lazy" objectFit='cover' />
                        </Box>
                    </Grid>

                    <Grid item xs={12} sm={8} display="flex" flexDirection="column" justifyContent="space-between" sx={{ pb: 1 }}>

                        {/* Contenedor del codigo del inmueble */}
                        <Box sx={styles.codContainer}>
                            <Typography variant="body1" fontWeight="bold">REF {numberWithDots(Number(data.ref))}</Typography>
                            <Chip variant="outlined" color="primary" size="small" label={`${ucfirst(data.inmueble.toLowerCase())} ${data.ficha_id0}`} sx={{}} />
                        </Box>
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
                        {/* <Divider /> */}
                        <Box sx={{ pl: 4 }}>

                            <Typography variant="body1" fontWeight="bold" color="text.secondary" sx={{ textAlign: "justify" }}>{info}</Typography>
                        </Box>
                        {/* Contenedor de la descripcion web */}
                        <Box sx={styles.descriptionContainer}>
                            <Tooltip title={ucfirst(data.descripcion_web.toLowerCase())}>
                                <Typography variant="body1" sx={{ textAlign: "justify" }}>
                                    {data.descripcion_web.length > 90
                                        ? ucfirst((data.descripcion_web.toLowerCase().substring(0, 90))) + "..."
                                        : ucfirst(data.descripcion_web.toLowerCase())}
                                </Typography>
                            </Tooltip>
                        </Box>


                        {/* <Divider /> */}
                        <Box sx={styles.actionsContainer}>
                            <Box sx={{ display: "flex", justifyContent: "space-between" }}>

                                <Box sx={{ display: "flex", flexWrap: "nowrap" }}>
                                    <IconButton sx={{ mr: 2 }}>
                                        <FavoriteBorderRoundedIcon />
                                    </IconButton>
                                    <IconButton sx={{ mr: 2 }}>
                                        <ShareRoundedIcon />
                                    </IconButton>
                                    <Button size="small" color="primary" variant="contained" sx={{ borderRadius: 2, boxShadow: 0 }}>Info</Button>
                                </Box>
                            </Box>
                        </Box>
                    </Grid>

                </Grid>
            </Box>
        </>
    )
}


const styles = {
    mainContainer: {
        width: "100%",
        minHeight: 220,
        background: "none",
        border: "1px solid rgba(10, 10, 10, 0.1)",
        mb: 2,
        borderRadius: 3,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        "&:hover": {
            boxShadow: "0 0 5px rgba(0,0,0,0.3)"
        }
    },
    imageContainer: {
        width: "100%",
        minHeight: 260,
        height: { xs: "auto", sm: "auto" },
        position: "relative",
        overflow: "hidden"
    },
    codContainer: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        ml: 2,
        mr: 2,
        p: 2,
        alignItems: "center"
    },
    descriptionContainer: {
        display: "flex",
        justifyContent: "space-between",
        m: 0,
        ml: 2,
        mr: 2,
        pl: 2,
        pr: 2,
        pb: 1,
        pt: 1,
    },
    actionsContainer: {
        display: "flex",
        textAlign: "right",
        justifyContent: "flex-end",
        alignItems: "center",
        pr: 4
    },
    scrollableContainer: {
        display: "flex", flexWrap: "nowrap", justifyContent: "left", textAlign: "left", ml: 4, mr: 4, mb: 2, maxWidth: "100%", overflowX: "scroll",
        "&::-webkit-scrollbar": {
            height: 8,
            width: 16
        },
        "&::-webkit-scrollbar-track, &::-webkit-scrollbar-corner": {
            backgroundColor: "transparent",
        },
        "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#edf5ff",
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
            backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' fill='rgb(210, 215, 255)'><polygon points='50,00 0,50 100,50'/></svg>")`,
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
            backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' fill='rgb(210, 215, 255)'><polygon points='0,0 100,0 50,50'/></svg>")`,
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
            backgroundPosition: "1.45px 1.45px",
            backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' fill='rgb(210, 215, 255)'><polygon points='0,50 50,100 50,0'/></svg>")`,
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
            backgroundPosition: "1.45px 1.45px",
            backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' fill='rgb(210, 215, 255)'><polygon points='0,0 0,100 50,50'/></svg>")`,
        },
        "&::-webkit-scrollbar-button:single-button:horizontal:increment:hover": {
            backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' fill='rgb(112, 112, 112)'><polygon points='0,0 0,100 50,50'/></svg>")`,
        },
        "&::-webkit-scrollbar-button:single-button:horizontal:increment:active": {
            backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' fill='rgb(128, 128, 128)'><polygon points='0,0 0,100 50,50'/></svg>")`,
        }
    }
}

// banesco
// 12037072
// 04143409494

// 0416 645 8190