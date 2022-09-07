import { Box, Typography, useTheme } from '@mui/material';
import Image from 'next/image';
import { FC } from 'react'
import { Inmueble } from '../../pages/index';
import { numberWithDots, ucfirst, utf8_encode } from '../../utils/functions';
import { BanosIcon, HabitacionesIcon, MetrajeIcon, TerrenoIcon } from '../icons';
interface Props {
    inmueble: Inmueble;
}

export const InmuebleCard: FC<Props> = ({ inmueble }) => {
    const { data, imagenes, url_inmueble } = inmueble;
    const theme = useTheme();
    console.log(theme);
    const info = `${ucfirst(data.urbanizacion)}, ${ucfirst(data.municipio)}, ${ucfirst(data.Estado)}`;
    return (<>
        <Box sx={{ width: "280px", height: "380", borderRadius: "12px", border: "1px solid #cbd6dc", overflow: "hidden", cursor: "pointer" }}>
            {/* Img */}
            <Box sx={{ maxWidth: "100%", minWidth: "280px", minHeight: "250px", maxHeight: "250px" }}>
                <Box component="img" src={`https://consolitex.org/img.php?i=${encodeURIComponent(url_inmueble)}`} width={"100%"} height={250}></Box>
            </Box>
            {/* Content */}
            <Box sx={{ pt: 2, pr: 2, pl: 2, pb: 0 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography fontWeight="Bold" sx={{ display: "flex", alignItems: "end" }}>REF {numberWithDots(Number(data.ref))}, <sub>00</sub></Typography>
                    <Typography color="text.secondary" fontWeight="Bold" sx={{ display: "flex", alignItems: "end" }}>{data.ficha_id0}</Typography>
                </Box>


                {/* Nombre del inmueble */}
                <Typography variant="subtitle1" color="text.primary" sx={{
                    "&:before": {
                        content: `'${data.nombre.length > 30 ? ucfirst(data.nombre.toLocaleLowerCase()).substring(0, 30) + "..." : ucfirst(data.nombre.toLocaleLowerCase())}'`
                    },
                    "&:hover:before": {
                        content: `'${ucfirst(data.nombre.toLocaleLowerCase())}'`
                    }
                }}></Typography>

                {/* Urbanizacion */}
                <Typography fontWeight="bold" variant="subtitle2" color="text.primary">{ucfirst(data.urbanizacion)}</Typography>

                {/* Urbanizacion, municipio, estado */}
                <Typography fontWeight="bold" variant="subtitle2" component="p" color="text.secondary" sx={{
                    textOverflow: "ellipsis", "&:before": {
                        content: `'${info.length > 30 ? info.substring(0, 30) + "..." : info}'`
                    }, "&:hover:before": {
                        content: `'${info}'`
                    }
                }} ></Typography>
            </Box>
            {/* Footer */}
            <Box sx={{ p: 2, display: "flex", justifyContent: "center", flexWrap: "wrap", flexDirection: "row", alignItems: "center" }}>
                <Box sx={{ display: "flex", alignItems: "center", mr: 1 }}>
                    {/* <MetrajeIcon color={theme.palette.neutral.main} /> */}
                    {
                        Number(data.mts2) < 1 ? (
                            <>
                                <TerrenoIcon />
                                <Typography variant="subtitle2" sx={{ ml: 0.5 }}>{data.mtst} mts<sup>2</sup></Typography>
                            </>
                        ) : (
                            <>
                                <MetrajeIcon />
                                <Typography variant="subtitle2" sx={{ ml: 0.5 }}>{data.mts2} mts<sup>2</sup></Typography>
                            </>
                        )
                    }
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", mr: 1 }}>
                    <BanosIcon />
                    <Typography variant="subtitle2" sx={{ ml: 0.5 }}>{data.banos} {Number(data.banos) > 1 || Number(data.banos) < 1 ? " baños" : " baño"}</Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", mr: 1 }}>
                    <HabitacionesIcon />
                    <Typography variant="subtitle2" sx={{ ml: 0.5 }}>{data.habitaciones} Hab.</Typography>
                </Box>
            </Box>
        </Box>
    </>
    )
}
