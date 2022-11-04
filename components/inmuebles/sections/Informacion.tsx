import { FC } from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { ucfirst, numberWithDots } from '../../../utils/functions';
import DescriptionIcon from '@mui/icons-material/Description';
interface Props {
    data: any;
}
export const Informacion: FC<Props> = ({ data }) => {
    return (
        <Box sx={{ width: "100%", p: 4, ...styles.gradiantBoxShadow, mb: 1 }}>
            <Typography variant="subtitle1" fontWeight="bold" sx={{ fontFamily: "Oxygen", fontSize: 16, mb: 1 }}><DescriptionIcon sx={{ color: "#a1a1a1" }} /> &nbsp;Información</Typography>
            <Box>
                <Typography variant="subtitle1" color="text.primary" fontWeight="bold">Código del inmueble</Typography>
                <Typography variant="subtitle2" color="text.secondary" fontWeight="bold">{`${data.ficha_id} - ${data.ficha_id0}`}</Typography>
            </Box>
            <Box>
                <Typography variant="subtitle1" color="text.primary" fontWeight="bold">{data.inmueble} en {ucfirst(data.negocio.toLowerCase())}</Typography>
                <Typography variant="subtitle2" color="text.secondary" fontWeight="bold">{`${data.urbanizacion}, ${data.municipio}, ${data.Estado}`}</Typography>
            </Box>
            <Box>
                <Typography variant="subtitle1" color="text.primary" fontWeight="bold">Precio de {ucfirst(data.negocio.toLowerCase())}</Typography>
                <Typography variant="subtitle2" color="text.secondary" fontWeight="bold">{numberWithDots(data.ref)},00</Typography>
            </Box>
        </Box>
    )
}
const styles = {
    gradiantBoxShadow: {
        background: "#FFF",
        position: "relative",
        borderRadius: 5,
        "&:hover": {
            "&:before": {
                content: "''",
                zIndex: -1,
                position: "absolute",
                top: "0",
                right: "0",
                bottom: "0",
                left: "0",
                background: "linear-gradient(327deg, rgba(100,100,100,0.1) 0%, rgba(150,150,150,0.1) 73%, rgba(50,50,50,0.1) 100%)",
                transform: "translate3d(0px, 20px, 0) scale(0.95)",
                filter: "blur(34px)",
                opacity: "var(0.47)",
                transition: "opacity 0.3s",
                borderRadius: "inherit",
            },

            /* 
            * Prevents issues when the parent creates a 
            * stacking context. (For example, using the transform
            * property )
            */
            "&:after": {
                content: "''",
                zIndex: -1,
                position: "absolute",
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
                background: "inherit",
                borderRadius: "inherit",
            },
        },
    },
}