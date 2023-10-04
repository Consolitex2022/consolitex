import { Box, Typography, useTheme } from '@mui/material';
import { FC } from 'react'
import { Inmueble } from '../../pages/index';
import { numberWithDots, ucfirst } from '../../utils/functions';
import { BanosIcon, HabitacionesIcon, MetrajeIcon, TerrenoIcon } from '../icons';
interface Props {
    inmueble: Inmueble;
}

export const InmuebleCard: FC<Props> = ({ inmueble }) => {
    const { data, imagenes, url_inmueble } = inmueble;
    const info = `${ucfirst(data.urbanizacion)}, ${ucfirst(data.municipio)}, ${ucfirst(data.Estado)}`;

    const redirect = (ficha_id: string) => {
        window.open(`/inmueble/${ficha_id}`, '_blank')
    }
    return (<>
        <Box sx={{ mt: 2, width: "280px", height: "380", borderRadius: 5, background: "rgba(255,255,255,0.8)", overflow: "hidden", cursor: "pointer", boxShadow: { xs: "0 0 10px rgba(0,0,0,0.1)", md: "0 8px 32px 0 rgba(0,0,0,0.3)" } }} onClick={() => redirect(data.ficha_id)}>
            {/* Img */}
            <Box sx={{ maxWidth: "100%", minWidth: "280px", minHeight: "250px", maxHeight: "250px" }}>
                <Box component="img" src={`https://images.consolitex.org/newImg.php?url=${encodeURIComponent(url_inmueble)}`} width={"100%"} height={250}></Box>
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

                {/* Urbanizacion, municipio, estado */}
                <Typography variant="subtitle2" component="p" color="text.secondary" sx={{
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
