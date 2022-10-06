import { Box, Typography } from '@mui/material';
import React, { FC } from 'react'
import { exists, ucfirst } from '../../../utils/functions';
import { CaracteristicaComponent } from './CaracteristicaComponent';
import { styles } from './styles';
interface Props {
    zonasComunes: any;
}
export const ZonasComunes: FC<Props> = ({ zonasComunes }) => {
    return (
        <Box sx={{ width: "100%", p: 4, ...styles.gradiantBoxShadow, mb: 1 }}>
            <Typography variant="subtitle1" fontWeight="bold" sx={{ fontFamily: "Oxygen", fontSize: 16, mb: 1 }}>Zonas comunes</Typography>
            {zonasComunes.hasOwnProperty('data') && exists(zonasComunes.data.vigilancia) && (<CaracteristicaComponent title="Vigilancia">{ucfirst(zonasComunes.data.vigilancia.toLowerCase())}</CaracteristicaComponent>)}
            {zonasComunes.hasOwnProperty('data') && exists(zonasComunes.data.cant_deascensores) && (<CaracteristicaComponent title="Cantidad de ascensores">{ucfirst(zonasComunes.data.cant_deascensores.toLowerCase())}</CaracteristicaComponent>)}
            {zonasComunes.hasOwnProperty('data') && exists(zonasComunes.data.ascensor_tipo) && (<CaracteristicaComponent title="Tipo de ascensor">{ucfirst(zonasComunes.data.ascensor_tipo.toLowerCase())}</CaracteristicaComponent>)}
            {zonasComunes.hasOwnProperty('data') && exists(zonasComunes.data.salon_defiesta) && (<CaracteristicaComponent title="Salón de fiesta">{ucfirst(zonasComunes.data.salon_defiesta.toLowerCase())}</CaracteristicaComponent>)}
            {zonasComunes.hasOwnProperty('data') && exists(zonasComunes.data.sala_dejuego) && (<CaracteristicaComponent title="Sala de juegos">{ucfirst(zonasComunes.data.sala_dejuego.toLowerCase())}</CaracteristicaComponent>)}
            {zonasComunes.hasOwnProperty('data') && exists(zonasComunes.data.parque_infantil) && (<CaracteristicaComponent title="Parque infantil">{ucfirst(zonasComunes.data.parque_infantil.toLowerCase())}</CaracteristicaComponent>)}
            {zonasComunes.hasOwnProperty('data') && exists(zonasComunes.data.gimnasio) && (<CaracteristicaComponent title="Gimnasio">{ucfirst(zonasComunes.data.gimnasio.toLowerCase())}</CaracteristicaComponent>)}
            {zonasComunes.hasOwnProperty('data') && exists(zonasComunes.data.sauna) && (<CaracteristicaComponent title="Sauna">{ucfirst(zonasComunes.data.sauna.toLowerCase())}</CaracteristicaComponent>)}
            {zonasComunes.hasOwnProperty('data') && exists(zonasComunes.data.piscina) && (<CaracteristicaComponent title="Piscina">{ucfirst(zonasComunes.data.piscina.toLowerCase())}</CaracteristicaComponent>)}
            {zonasComunes.hasOwnProperty('data') && exists(zonasComunes.data.canchas_deportivas) && (<CaracteristicaComponent title="Canchas deportivas">{ucfirst(zonasComunes.data.canchas_deportivas.toLowerCase())}</CaracteristicaComponent>)}
            {zonasComunes.hasOwnProperty('data') && exists(zonasComunes.data.areas_verdes) && (<CaracteristicaComponent title="Areas verdes">{ucfirst(zonasComunes.data.areas_verdes.toLowerCase())}</CaracteristicaComponent>)}
            {zonasComunes.hasOwnProperty('data') && exists(zonasComunes.data.telefono) && (<CaracteristicaComponent title="Telefono">{ucfirst(zonasComunes.data.telefono.toLowerCase())}</CaracteristicaComponent>)}
            {zonasComunes.hasOwnProperty('data') && exists(zonasComunes.data.internet) && (<CaracteristicaComponent title="Internet">{ucfirst(zonasComunes.data.internet.toLowerCase())}</CaracteristicaComponent>)}
            {zonasComunes.hasOwnProperty('data') && exists(zonasComunes.data.circuito_cerrado) && (<CaracteristicaComponent title="Circuito cerrado">{ucfirst(zonasComunes.data.circuito_cerrado.toLowerCase())}</CaracteristicaComponent>)}
            {zonasComunes.hasOwnProperty('data') && exists(zonasComunes.data.cerco_electrico) && (<CaracteristicaComponent title="Cerco electrico">{ucfirst(zonasComunes.data.cerco_electrico.toLowerCase())}</CaracteristicaComponent>)}
            {zonasComunes.hasOwnProperty('data') && exists(zonasComunes.data.arquitectura_inteligente) && (<CaracteristicaComponent title="Arquitectura inteligente">{ucfirst(zonasComunes.data.arquitectura_inteligente.toLowerCase())}</CaracteristicaComponent>)}
            {zonasComunes.hasOwnProperty('data') && exists(zonasComunes.data.zona_carga_descarga) && (<CaracteristicaComponent title="Zona carga-descarga">{ucfirst(zonasComunes.data.zona_carga_descarga.toLowerCase())}</CaracteristicaComponent>)}
            {zonasComunes.hasOwnProperty('data') && exists(zonasComunes.data.vialidad) && (<CaracteristicaComponent title="Vialidad">{ucfirst(zonasComunes.data.vialidad.toLowerCase())}</CaracteristicaComponent>)}
        </Box>
    )
}
