import { FC } from 'react'
import { Box, Typography } from '@mui/material';
import { exists, ucfirst } from '../../../utils/functions';
import { CaracteristicaComponent } from './CaracteristicaComponent';
import { styles } from './styles';

interface Props {
    data: any;
}

export const Detalles: FC<Props> = ({ data }) => {
    return (
        <Box sx={{ width: "100%", p: 4, ...styles.gradiantBoxShadow, mb: 1 }}>
            <Typography variant="subtitle1" fontWeight="bold" sx={{ fontFamily: "Oxygen", fontSize: 16, mb: 1 }}>Detalles</Typography>
            {data.banos && (<CaracteristicaComponent title="Baños">{data.banos}</CaracteristicaComponent>)}
            {data.habitaciones && (<CaracteristicaComponent title="Habitaciones">{data.habitaciones}</CaracteristicaComponent>)}
            {data.estacionamiento && (<CaracteristicaComponent title="Puestos de estacionamiento">{data.estacionamiento}</CaracteristicaComponent>)}
            {data.mts2 && (<CaracteristicaComponent title="Metros de construcción" mts>{data.mts2}</CaracteristicaComponent>)}
            {data.mtst && (<CaracteristicaComponent title="Metros de terreno" mts>{data.mtst}</CaracteristicaComponent>)}
            {exists(data.planta) && (<CaracteristicaComponent title="Planta eléctrica">{ucfirst(data.planta.toLowerCase())}</CaracteristicaComponent>)}
            {exists(data.pozo) && (<CaracteristicaComponent title="Pozo profundo">{ucfirst(data.pozo.toLowerCase())}</CaracteristicaComponent>)}
            <Box sx={{ mt: 1 }}>
                <Typography variant="subtitle2" color="text.primary" fontWeight="bold">Descripción</Typography>
                <Typography variant="subtitle2" color="text.secondary">{ucfirst(data.descripcion_web.toLowerCase())}</Typography>
            </Box>
        </Box>
    )
}
