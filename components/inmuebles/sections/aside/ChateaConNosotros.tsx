import { FC } from 'react'
import WhatsApp from '@mui/icons-material/WhatsApp';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
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
        backgroundColor: "rgba(255,255,255,1)",
        borderRadius: 5,
        display: "flex",
        flexFlow: "row nowrap",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        backdropFilter: "blur(4px)",
        mt: 1,
        "&:hover": {
            "&:before": {
                content: "''",
                zIndex: -1,
                position: "absolute",
                top: "0",
                right: "0",
                bottom: "0",
                left: "0",
                background: "linear-gradient(327deg, rgba(255,226,4,0.8) 0%, rgba(254,249,158,0.8) 73%, rgba(0,255,248,0.8) 100%)",
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
    }
}