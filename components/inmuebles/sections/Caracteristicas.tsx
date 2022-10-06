import { FC } from 'react'
import { Box, Typography } from '@mui/material';
import { exists, ucfirst } from '../../../utils/functions';
import { CaracteristicaComponent } from './CaracteristicaComponent';
import { styles } from './styles';

interface Props {
    caracteristicas: any;
}

export const Caracteristicas: FC<Props> = ({ caracteristicas }) => {
    return (
        <Box sx={{ width: "100%", p: 4, ...styles.gradiantBoxShadow, mb: 1 }}>
            <Typography variant="subtitle1" fontWeight="bold" sx={{ fontFamily: "Oxygen", fontSize: 16, mb: 1 }}>Caracteristicas del inmueble</Typography>
            {caracteristicas.hasOwnProperty('data') && exists(caracteristicas.data.privado) && (<CaracteristicaComponent title="Privado">{ucfirst(caracteristicas.data.privado.toLowerCase())}</CaracteristicaComponent>)}
            {caracteristicas.hasOwnProperty('data') && exists(caracteristicas.data.antiguedad) && (<CaracteristicaComponent title="Antigüedad">{ucfirst(caracteristicas.data.antiguedad.toLowerCase())}</CaracteristicaComponent>)}
            {caracteristicas.hasOwnProperty('data') && exists(caracteristicas.data.E_tipo) && (<CaracteristicaComponent title="Tipo de estacionamiento">{ucfirst(caracteristicas.data.E_tipo.toLowerCase())}</CaracteristicaComponent>)}
            {caracteristicas.hasOwnProperty('data') && exists(caracteristicas.data.E_nivel) && (<CaracteristicaComponent title="Nivel de estacionamiento">{ucfirst(caracteristicas.data.E_nivel.toLowerCase())}</CaracteristicaComponent>)}
            {caracteristicas.hasOwnProperty('data') && exists(caracteristicas.data.maletero) && (<CaracteristicaComponent title="Maletero">{ucfirst(caracteristicas.data.maletero.toLowerCase())}</CaracteristicaComponent>)}
            {caracteristicas.hasOwnProperty('data') && exists(caracteristicas.data.aexcepcionde) && (<CaracteristicaComponent title="Excepciones">{ucfirst(caracteristicas.data.aexcepcionde.toLowerCase())}</CaracteristicaComponent>)}
            {caracteristicas.hasOwnProperty('data') && exists(caracteristicas.data.salon) && (<CaracteristicaComponent title="Salon">{ucfirst(caracteristicas.data.salon.toLowerCase())}</CaracteristicaComponent>)}
            {caracteristicas.hasOwnProperty('data') && exists(caracteristicas.data.estar) && (<CaracteristicaComponent title="Sala de estar">{ucfirst(caracteristicas.data.estar.toLowerCase())}</CaracteristicaComponent>)}
            {caracteristicas.hasOwnProperty('data') && exists(caracteristicas.data.estudio) && (<CaracteristicaComponent title="Estudio">{ucfirst(caracteristicas.data.estudio.toLowerCase())}</CaracteristicaComponent>)}
            {caracteristicas.hasOwnProperty('data') && exists(caracteristicas.data.cocina) && (<CaracteristicaComponent title="Cocina">{ucfirst(caracteristicas.data.cocina.toLowerCase())}</CaracteristicaComponent>)}
            {caracteristicas.hasOwnProperty('data') && exists(caracteristicas.data.marca_cocina) && (<CaracteristicaComponent title="Marca de cocina">{ucfirst(caracteristicas.data.marca_cocina.toLowerCase())}</CaracteristicaComponent>)}
            {caracteristicas.hasOwnProperty('data') && exists(caracteristicas.data.lavandero) && (<CaracteristicaComponent title="Lavandero">{ucfirst(caracteristicas.data.lavandero.toLowerCase())}</CaracteristicaComponent>)}
            {caracteristicas.hasOwnProperty('data') && exists(caracteristicas.data.entrada_deservicio) && (<CaracteristicaComponent title="Entrada de servicio">{ucfirst(caracteristicas.data.entrada_deservicio.toLowerCase())}</CaracteristicaComponent>)}
            {caracteristicas.hasOwnProperty('data') && exists(caracteristicas.data.vestier) && (<CaracteristicaComponent title="Vestier">{ucfirst(caracteristicas.data.vestier.toLowerCase())}</CaracteristicaComponent>)}
            {caracteristicas.hasOwnProperty('data') && exists(caracteristicas.data.jacuzzi) && (<CaracteristicaComponent title="Jacuzzi">{ucfirst(caracteristicas.data.jacuzzi.toLowerCase())}</CaracteristicaComponent>)}
            {caracteristicas.hasOwnProperty('data') && exists(caracteristicas.data.balcon) && (<CaracteristicaComponent title="Balcon">{ucfirst(caracteristicas.data.balcon.toLowerCase())}</CaracteristicaComponent>)}
            {caracteristicas.hasOwnProperty('data') && exists(caracteristicas.data.tipo_aire_acondicionado) && (<CaracteristicaComponent title="Aire acondicionado">{ucfirst(caracteristicas.data.tipo_aire_acondicionado.toLowerCase())}</CaracteristicaComponent>)}
            {caracteristicas.hasOwnProperty('data') && exists(caracteristicas.data.tipo_piso) && (<CaracteristicaComponent title="Tipo de piso">{ucfirst(caracteristicas.data.tipo_piso.toLowerCase())}</CaracteristicaComponent>)}
        </Box>
    )
}
