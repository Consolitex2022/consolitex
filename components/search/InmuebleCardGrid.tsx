import { FC } from 'react'
import { Box, Grid, Typography, Chip } from '@mui/material';
import { Inmueble } from '../../pages';
import Image from "next/image";
import { numberWithDots, ucfirst } from '../../utils/functions';
import { BanosIcon, HabitacionesIcon, MetrajeIcon, TerrenoIcon, EstacionamientosIcon, PlantaIcon, PozoIcon } from '../icons';
import { CaracteristicaContainer, tieneCaracteristica } from './InmuebleCard';
interface Props {
    inmueble: Inmueble;
}
export const InmuebleCardGrid: FC<Props> = ({ inmueble }) => {
    const { url_inmueble, data } = inmueble;
    const info = `${ucfirst(data.urbanizacion)}, ${ucfirst(data.municipio)}, ${ucfirst(data.Estado)}`;

    return (
        <Box sx={styles.mainContainer}>
            <Grid container flexWrap="wrap" justifyContent="space-between">

                {/* Contenedor de la imagen del inmueble */}
                <Grid item xs={12} sm={4}>
                    <Box sx={styles.imageContainer}>
                        <Image src={`https://consolitex.org/img_sinmosca.php?i=${encodeURI(url_inmueble)}`} layout='fill'
                            objectFit='cover' />
                    </Box>
                </Grid>
                <Grid item xs={12}>

                    {/* Precio y codigo */}
                    <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
                        <Typography variant="subtitle1" fontWeight="bold">
                            REF {numberWithDots(Number(data.ref))}
                        </Typography>
                        <Chip variant="outlined" color="primary" size="small" label={`${data.ficha_id0}`} sx={{ mr: 1 }} />
                    </Box>

                    {/* Localidad */}
                    <Typography variant="subtitle2" fontWeight="bold" color="text.secondary">
                        {info.length > 31 ? info.substring(0, 30) + "..." : info}
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
        </Box>
    )
}
const styles = {
    mainContainer: {
        width: 200,
        height: 220,
        mb: 12,
        mr: 2
    },
    imageContainer: {
        width: 200,
        minHeight: 200,
        height: { xs: "auto", sm: "auto" },
        position: "relative",
        borderRadius: 3,
        overflow: "hidden"
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
        display: "flex", flexWrap: "nowrap", justifyContent: "left", textAlign: "left", mr: 4, mb: 2, maxWidth: "100%", overflowX: "scroll",
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