import React from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { exists, ucfirst } from '../../../utils/functions';
import { CaracteristicaComponent } from './';
import { styles } from './styles';
import ApartmentIcon from '@mui/icons-material/Apartment';

interface Props {
    caracteristicas: any;
}

export const Caracteristicas: React.FC<Props> = ({ caracteristicas }) => {
    const [show, setShow] = React.useState<boolean>(false);
    React.useEffect(() => {
        if (!exists(caracteristicas.privado) &&
            !exists(caracteristicas.antiguedad) &&
            !exists(caracteristicas.E_tipo) &&
            !exists(caracteristicas.E_nivel) &&
            !exists(caracteristicas.maletero) &&
            !exists(caracteristicas.aexcepcionde) &&
            !exists(caracteristicas.salon) &&
            !exists(caracteristicas.estar) &&
            !exists(caracteristicas.estudio) &&
            !exists(caracteristicas.cocina) &&
            !exists(caracteristicas.marca_cocina) &&
            !exists(caracteristicas.lavandero) &&
            !exists(caracteristicas.entrada_deservicio) &&
            !exists(caracteristicas.vestier) &&
            !exists(caracteristicas.jacuzzi) &&
            !exists(caracteristicas.balcon) &&
            !exists(caracteristicas.tipo_aire_acondicionado) &&
            !exists(caracteristicas.tipo_piso)) {
            setShow(false);
        } else {
            setShow(true);
        }
    }, [caracteristicas])
    return (
        <Box sx={{ display: show ? "block" : "none", width: "100%", p: 4, ...styles.gradiantBoxShadow, mb: 1 }}>
            <Typography variant="subtitle1" fontWeight="bold" sx={{ fontFamily: "Oxygen", fontSize: 16, mb: 1 }}><ApartmentIcon sx={{ color: "#a1a1a1" }} />&nbsp;Caracteristicas del inmueble</Typography>
            {exists(caracteristicas.privado) && (<CaracteristicaComponent title="Privado">{ucfirst(caracteristicas.privado.toLowerCase())}</CaracteristicaComponent>)}
            {exists(caracteristicas.antiguedad) && (<CaracteristicaComponent title="Antigüedad">{ucfirst(caracteristicas.antiguedad.toLowerCase())}</CaracteristicaComponent>)}
            {exists(caracteristicas.E_tipo) && (<CaracteristicaComponent title="Tipo de estacionamiento">{ucfirst(caracteristicas.E_tipo.toLowerCase())}</CaracteristicaComponent>)}
            {exists(caracteristicas.E_nivel) && (<CaracteristicaComponent title="Nivel de estacionamiento">{ucfirst(caracteristicas.E_nivel.toLowerCase())}</CaracteristicaComponent>)}
            {exists(caracteristicas.maletero) && (<CaracteristicaComponent title="Maletero">{ucfirst(caracteristicas.maletero.toLowerCase())}</CaracteristicaComponent>)}
            {exists(caracteristicas.aexcepcionde) && (<CaracteristicaComponent title="Excepciones">{ucfirst(caracteristicas.aexcepcionde.toLowerCase())}</CaracteristicaComponent>)}
            {exists(caracteristicas.salon) && (<CaracteristicaComponent title="Salon">{ucfirst(caracteristicas.salon.toLowerCase())}</CaracteristicaComponent>)}
            {exists(caracteristicas.estar) && (<CaracteristicaComponent title="Sala de estar">{ucfirst(caracteristicas.estar.toLowerCase())}</CaracteristicaComponent>)}
            {exists(caracteristicas.estudio) && (<CaracteristicaComponent title="Estudio">{ucfirst(caracteristicas.estudio.toLowerCase())}</CaracteristicaComponent>)}
            {exists(caracteristicas.cocina) && (<CaracteristicaComponent title="Cocina">{ucfirst(caracteristicas.cocina.toLowerCase())}</CaracteristicaComponent>)}
            {exists(caracteristicas.marca_cocina) && (<CaracteristicaComponent title="Marca de cocina">{ucfirst(caracteristicas.marca_cocina.toLowerCase())}</CaracteristicaComponent>)}
            {exists(caracteristicas.lavandero) && (<CaracteristicaComponent title="Lavandero">{ucfirst(caracteristicas.lavandero.toLowerCase())}</CaracteristicaComponent>)}
            {exists(caracteristicas.entrada_deservicio) && (<CaracteristicaComponent title="Entrada de servicio">{ucfirst(caracteristicas.entrada_deservicio.toLowerCase())}</CaracteristicaComponent>)}
            {exists(caracteristicas.vestier) && (<CaracteristicaComponent title="Vestier">{ucfirst(caracteristicas.vestier.toLowerCase())}</CaracteristicaComponent>)}
            {exists(caracteristicas.jacuzzi) && (<CaracteristicaComponent title="Jacuzzi">{ucfirst(caracteristicas.jacuzzi.toLowerCase())}</CaracteristicaComponent>)}
            {exists(caracteristicas.balcon) && (<CaracteristicaComponent title="Balcon">{ucfirst(caracteristicas.balcon.toLowerCase())}</CaracteristicaComponent>)}
            {exists(caracteristicas.tipo_aire_acondicionado) && (<CaracteristicaComponent title="Aire acondicionado">{ucfirst(caracteristicas.tipo_aire_acondicionado.toLowerCase())}</CaracteristicaComponent>)}
            {exists(caracteristicas.tipo_piso) && (<CaracteristicaComponent title="Tipo de piso">{ucfirst(caracteristicas.tipo_piso.toLowerCase())}</CaracteristicaComponent>)}
        </Box>
    )
}
