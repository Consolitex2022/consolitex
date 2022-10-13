import React from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { exists, ucfirst } from '../../../utils/functions';
import { CaracteristicaComponent } from './CaracteristicaComponent';
import { styles } from './styles';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContactRounded';
interface Props {
    zonasComunes: any;
}
export const ZonasComunes: React.FC<Props> = ({ zonasComunes }) => {
    const [show, setShow] = React.useState<boolean>(false);
    React.useEffect(() => {
        if (!exists(zonasComunes.vigilancia) &&
            !exists(zonasComunes.cant_deascensores) &&
            !exists(zonasComunes.ascensor_tipo) &&
            !exists(zonasComunes.salon_defiesta) &&
            !exists(zonasComunes.sala_dejuego) &&
            !exists(zonasComunes.parque_infantil) &&
            !exists(zonasComunes.gimnasio) &&
            !exists(zonasComunes.sauna) &&
            !exists(zonasComunes.piscina) &&
            !exists(zonasComunes.canchas_deportivas) &&
            !exists(zonasComunes.areas_verdes) &&
            !exists(zonasComunes.telefono) &&
            !exists(zonasComunes.internet) &&
            !exists(zonasComunes.circuito_cerrado) &&
            !exists(zonasComunes.cerco_electrico) &&
            !exists(zonasComunes.arquitectura_inteligente) &&
            !exists(zonasComunes.zona_carga_descarga) &&
            !exists(zonasComunes.vialidad)) {
            setShow(false);
        } else {
            setShow(true);
        }
    }, [zonasComunes])
    return (
        <Box sx={{ display: show ? "block" : "none", width: "100%", p: 4, ...styles.gradiantBoxShadow, mb: 1 }}>
            <Typography variant="subtitle1" fontWeight="bold" sx={{ fontFamily: "Oxygen", fontSize: 16, mb: 1 }}><ConnectWithoutContactIcon sx={{ color: "#a1a1a1" }} /> &nbsp; Zonas comunes</Typography>
            {exists(zonasComunes.vigilancia) && (<CaracteristicaComponent title="Vigilancia">{ucfirst(zonasComunes.vigilancia.toLowerCase())}</CaracteristicaComponent>)}
            {exists(zonasComunes.cant_deascensores) && (<CaracteristicaComponent title="Cantidad de ascensores">{ucfirst(zonasComunes.cant_deascensores.toLowerCase())}</CaracteristicaComponent>)}
            {exists(zonasComunes.ascensor_tipo) && (<CaracteristicaComponent title="Tipo de ascensor">{ucfirst(zonasComunes.ascensor_tipo.toLowerCase())}</CaracteristicaComponent>)}
            {exists(zonasComunes.salon_defiesta) && (<CaracteristicaComponent title="Salón de fiesta">{ucfirst(zonasComunes.salon_defiesta.toLowerCase())}</CaracteristicaComponent>)}
            {exists(zonasComunes.sala_dejuego) && (<CaracteristicaComponent title="Sala de juegos">{ucfirst(zonasComunes.sala_dejuego.toLowerCase())}</CaracteristicaComponent>)}
            {exists(zonasComunes.parque_infantil) && (<CaracteristicaComponent title="Parque infantil">{ucfirst(zonasComunes.parque_infantil.toLowerCase())}</CaracteristicaComponent>)}
            {exists(zonasComunes.gimnasio) && (<CaracteristicaComponent title="Gimnasio">{ucfirst(zonasComunes.gimnasio.toLowerCase())}</CaracteristicaComponent>)}
            {exists(zonasComunes.sauna) && (<CaracteristicaComponent title="Sauna">{ucfirst(zonasComunes.sauna.toLowerCase())}</CaracteristicaComponent>)}
            {exists(zonasComunes.piscina) && (<CaracteristicaComponent title="Piscina">{ucfirst(zonasComunes.piscina.toLowerCase())}</CaracteristicaComponent>)}
            {exists(zonasComunes.canchas_deportivas) && (<CaracteristicaComponent title="Canchas deportivas">{ucfirst(zonasComunes.canchas_deportivas.toLowerCase())}</CaracteristicaComponent>)}
            {exists(zonasComunes.areas_verdes) && (<CaracteristicaComponent title="Areas verdes">{ucfirst(zonasComunes.areas_verdes.toLowerCase())}</CaracteristicaComponent>)}
            {exists(zonasComunes.telefono) && (<CaracteristicaComponent title="Telefono">{ucfirst(zonasComunes.telefono.toLowerCase())}</CaracteristicaComponent>)}
            {exists(zonasComunes.internet) && (<CaracteristicaComponent title="Internet">{ucfirst(zonasComunes.internet.toLowerCase())}</CaracteristicaComponent>)}
            {exists(zonasComunes.circuito_cerrado) && (<CaracteristicaComponent title="Circuito cerrado">{ucfirst(zonasComunes.circuito_cerrado.toLowerCase())}</CaracteristicaComponent>)}
            {exists(zonasComunes.cerco_electrico) && (<CaracteristicaComponent title="Cerco electrico">{ucfirst(zonasComunes.cerco_electrico.toLowerCase())}</CaracteristicaComponent>)}
            {exists(zonasComunes.arquitectura_inteligente) && (<CaracteristicaComponent title="Arquitectura inteligente">{ucfirst(zonasComunes.arquitectura_inteligente.toLowerCase())}</CaracteristicaComponent>)}
            {exists(zonasComunes.zona_carga_descarga) && (<CaracteristicaComponent title="Zona carga-descarga">{ucfirst(zonasComunes.zona_carga_descarga.toLowerCase())}</CaracteristicaComponent>)}
            {exists(zonasComunes.vialidad) && (<CaracteristicaComponent title="Vialidad">{ucfirst(zonasComunes.vialidad.toLowerCase())}</CaracteristicaComponent>)}
        </Box>
    )
}
