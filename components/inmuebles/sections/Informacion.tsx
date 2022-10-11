import { FC } from 'react'
import { Box, Typography } from '@mui/material';
import { ucfirst, numberWithDots } from '../../../utils/functions';
import { styles } from './styles';
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
