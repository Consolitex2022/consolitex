import { FC } from 'react';
import { WhatsApp, Instagram, Facebook, Twitter } from '@mui/icons-material';
import { Box, Typography, IconButton } from '@mui/material';
import { CustomImage } from '../../../images/CustomImage';
import { styles } from '../styles';

interface Props {

}

export const Compartir: FC<Props> = () => {
    return (
        <Box sx={{ ...styles.contentBox, height: "100%" }}>
            <Box sx={{ ...styles.gradientBoxSizes, ...styles.gradiantBoxShadow, height: "100%" }}>
                <CustomImage upperBoxStyles={{ borderRadius: 5, overflow: "hidden" }} src="/sharing_image_11zon.webp" alt="imagen_de_compartir_redes" />
                <Typography fontWeight="bold" variant="h6" sx={{ fontFamily: "Oxygen", textAlign: "center", fontSize: 16 }}>¡Comparte este inmueble en redes sociales!</Typography>
                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <IconButton color="primary" sx={{ width: 60, height: 60, fontSize: 16, }}>
                        <WhatsApp style={{
                        }} />
                    </IconButton>
                    <IconButton color="primary" sx={{ width: 60, height: 60, fontSize: 16 }}>
                        <Instagram />
                    </IconButton>
                    <IconButton color="primary" sx={{ width: 60, height: 60, fontSize: 16 }}>
                        <Facebook />
                    </IconButton>
                    <IconButton color="primary" sx={{ width: 60, height: 60, fontSize: 16 }}>
                        <Twitter />
                    </IconButton>
                </Box>
            </Box>
        </Box>
    )
}
