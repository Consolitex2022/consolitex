import { FC, ReactNode, useContext, useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import Image from 'next/image';

import { useRouter } from 'next/router';
import { Inmueble } from '../../pages';
import { numberWithDots, ucfirst } from '../../utils/functions';
import { BanosIcon, EstacionamientosIcon, HabitacionesIcon, MetrajeIcon, PlantaIcon, PozoIcon, TerrenoIcon } from '../icons';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorderRounded';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareRoundedIcon from '@mui/icons-material/ShareRounded';
import Swal from 'sweetalert2';
import { AuthContext } from '../../context/authcontext';

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
    const [favorite, setFavorite] = useState<boolean>(false);
    const { url_inmueble, data } = inmueble;
    const info = `${ucfirst(data.urbanizacion)}, ${ucfirst(data.municipio)}, ${ucfirst(data.Estado)}`;
    const router = useRouter();
    const userData = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const getLike = async () => {
        if (userData.id === 0) return false;
        const url = `/api/likes?ficha_id0=${data.ficha_id0}&user_id=${userData.id}`;
        const options = {
            method: 'GET',
        }
        try {
            const respuesta = await fetch(url);
            switch (respuesta.status) {
                case 200:
                    setFavorite(true);
                    setIsLoading(false);
                    break;
                case 204:
                    setFavorite(false);
                    setIsLoading(false);
                    break;
                default:
                    console.error("Ocurrio un error al buscar el like del inmueble", respuesta.status, data.ficha_id0);
                    setIsLoading(false);
                    break;
            }
        } catch (error) {
            setIsLoading(false);
            console.log(error);
        }
    }

    useEffect(() => {
        getLike();
    }, [])

    const redirect = (ficha_id: string) => {
        window.open(`/inmueble/${ficha_id}`, '_blank')
    }
    const like = async (ficha_id0: string, id: string | number, action: "like" | "dislike") => {

        const url = `/api/likes/`

        const body = JSON.stringify({
            id,
            ficha_id0,
            action,
            user_id: userData.id
        })
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body
        }

        try {
            const respuesta = await fetch(url, options);
            switch (respuesta.status) {
                case 200:
                    if (action === 'like') {
                        setFavorite(true);
                    } else {
                        setFavorite(false);
                    }
                    break;
                case 400:
                    Swal.fire({
                        title: "Error 1",
                        toast: true,
                        icon: "error",
                        showConfirmButton: false,
                        timer: 2000,
                        timerProgressBar: true,
                        position: "bottom-start"
                    })
                    break;
                case 204:
                    Swal.fire({
                        title: "Error 2",
                        toast: true,
                        icon: "error",
                        showConfirmButton: false,
                        timer: 2000,
                        timerProgressBar: true,
                        position: "bottom-start"
                    })
                default:
                    Swal.fire({
                        title: "Error del servidor",
                        toast: true,
                        icon: "error",
                        showConfirmButton: false,
                        timer: 2000,
                        timerProgressBar: true,
                        position: "bottom-start"
                    })
                    break;
            }
        } catch (error) {
            console.log(error);
            Swal.fire({
                title: "Error de conexion",
                toast: true,
                icon: "error",
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
                position: "bottom-start"
            })
        }

    }


    return (
        <>

            <Box sx={styles.mainContainer} >
                <Grid container flexWrap="wrap" justifyContent="space-between">

                    {/* Contenedor de la imagen del inmueble */}
                    <Grid item xs={12} sm={4}>
                        <Box sx={styles.imageContainer} onClick={() => redirect(data.ficha_id)}>
                            {/* <CustomImage */}
                            <Image alt={data.nombre} src={`https://consolitex.org/newImg.php?nowatermark=1&url=${encodeURI(url_inmueble)}`} layout='fill' loading="lazy" objectFit='cover' />
                        </Box>
                    </Grid>

                    <Grid item xs={12} sm={8} display="flex" flexDirection="column" justifyContent="space-between" sx={{ pb: 1 }}>

                        {/* Contenedor del codigo del inmueble */}
                        <Box sx={styles.codContainer}>
                            <Typography variant="body1" fontWeight="bold">REF {numberWithDots(Number(data.ref))}</Typography>
                            <Chip variant="outlined" color="primary" size="small" label={`${ucfirst(data.inmueble.toLowerCase())} ${data.ficha_id0}`} sx={{ fontSize: 11 }} />
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
                                    {favorite ? (
                                        <IconButton disabled={isLoading} sx={{ mr: 2 }} onClick={() => {
                                            if (userData && userData.id !== 0) {
                                                like(data.ficha_id0, data.key, "dislike")
                                            } else {
                                                Swal.fire({
                                                    title: "Inicia sesion",
                                                    text: "Loageate para poder asignar like al inmueble",
                                                    icon: "warning",
                                                })
                                            }
                                        }}>
                                            <FavoriteIcon color="error" />
                                        </IconButton>
                                    ) : (
                                        <IconButton disabled={isLoading} sx={{ mr: 2 }} onClick={() => {
                                            if (userData && userData.id !== 0) {
                                                like(data.ficha_id0, data.key, "like")
                                            } else {
                                                Swal.fire({
                                                    title: "Inicia sesion",
                                                    text: "Loageate para poder asignar like al inmueble",
                                                    icon: "warning",
                                                })
                                            }
                                        }}>
                                            <FavoriteBorderIcon sx={{ color: "darkgrey !important" }} />
                                        </IconButton>
                                    )}
                                    <IconButton sx={{ mr: 2 }}>
                                        <ShareRoundedIcon />
                                    </IconButton>
                                    <Button size="small" color="primary" variant="contained" sx={{ borderRadius: 5, textTransform: "none" }} disableElevation onClick={() => redirect(data.ficha_id)}>Informacion</Button>
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
        width: "95%",
        margin: "auto",
        mt: 3,
        minHeight: 220,
        borderRadius: 3,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        background: "rgba(255,255,255,0.2)",
        boxShadow: "0 8px 32px rgba(100,100,100,0.1)",
        transition: ".2s ease all",
    },
    imageContainer: {
        width: "100%",
        minHeight: 260,
        height: { xs: "auto", sm: "auto" },
        position: "relative",
        overflow: "hidden",
        cursor: "pointer",
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
        paddingBlock: 1,
        display: "flex",
        flexWrap: "nowrap",
        justifyContent: "left",
        textAlign: "left",
        ml: 4,
        mr: 4,
        mb: 2,
        maxWidth: "100%",
        overflowX: "scroll",
        overflowY: "hidden",
        "&::-webkit-scrollbar": {
            height: 8,
            width: 16
        },
        "&::-webkit-scrollbar-track, &::-webkit-scrollbar-corner": {
            backgroundColor: "transparent",
        },
        "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#e1e1e1",
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
            cursor: "pointer",
            backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' fill='rgb(180,180,180)'><polygon points='50,00 0,50 100,50'/></svg>")`,
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
            cursor: "pointer",
            backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' fill='rgb(180,180,180)'><polygon points='0,0 100,0 50,50'/></svg>")`,
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
            cursor: "pointer",
            backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' fill='rgb(180,180,180)'><polygon points='0,50 50,100 50,0'/></svg>")`,
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
            cursor: "pointer",
            backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' fill='rgb(180,180,180)'><polygon points='0,0 0,100 50,50'/></svg>")`,
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