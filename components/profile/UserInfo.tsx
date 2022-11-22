import { Box, Typography } from "@mui/material";
import { FC, useContext } from "react";
import { CaracteristicaProfile } from ".";
import { AuthContext } from "../../context/authcontext";

export const UserInfo: FC = () => {
    const { nombres, apellidos, telefono, email } = useContext(AuthContext)
    return (
        <Box sx={{ p: 2, mb: 2 }}>
            <Typography variant="overline" fontWeight="bold">Tu información de usuario</Typography>
            <CaracteristicaProfile title="Nombre">{nombres}</CaracteristicaProfile>
            <CaracteristicaProfile title="Apellidos">{apellidos}</CaracteristicaProfile>
            <CaracteristicaProfile title="Email">{email}</CaracteristicaProfile>
            <CaracteristicaProfile title="Teléfono">{telefono}</CaracteristicaProfile>
        </Box>
    )
}