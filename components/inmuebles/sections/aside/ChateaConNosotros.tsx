import { WhatsApp } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';
import { FC } from 'react'
import { ucfirst } from '../../../../utils/functions';
import { CustomImage } from '../../../images/CustomImage';

interface Props {
    userLogged: any;
    data: any;
}

export const ChateaConNosotros: FC<Props> = ({ userLogged, data }) => {
    return (
        <Box sx={styles.mainContainer}>
            <CustomImage upperBoxStyles={{ width: "100%", flexGrow: 1 }} src={"/customer_Service.webp"} alt="Customer service - Consolitex" />
            <Box sx={{
                width: "100%",
                display: "flex",
                flexFlow: "column wrap",
                justifyContent: "center",
                alignItems: "center",
            }}>
                <Typography variant="subtitle2" fontWeight="bold" fontSize={{ xs: 16, md: 24 }}>¡Escríbenos al Whatsapp!</Typography>
                <Typography variant="subtitle2"> Te atenderemos inmediatamente...</Typography>
                <Button component="a" target="_blank" sx={{ content: `"Enviar "`, borderRadius: "100%", width: { xs: 50, sm: 100 }, height: { xs: 60, sm: 100 } }} color="success" href={`https://wa.me/5804144029820?text=${encodeURI(`Buen día, estoy interesado en el siguiente inmueble: *Código* ${data.ficha_id0}, *Nombre del inmueble* ${ucfirst(data.nombre.toLowerCase())}, *REF* ${data.ref}, *Hab.* ${data.habitaciones}, *Baños* ${data.banos} ¡Gracias!`)}`}>
                    <WhatsApp sx={{ width: { xs: 40, sm: 80 }, height: { xs: 40, sm: 80 } }} />
                </Button>
            </Box>
        </Box >
    )
}

const styles = {
    mainContainer: {
        width: "100%",
        minHeight: 400,
        backgroundColor: "#FFF",
        borderRadius: 5,
        display: "flex",
        flexFlow: "row nowrap",
        alignItems: "center",
        justifyContent: "center",
        mt: 1
    }
}