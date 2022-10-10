import { FC } from 'react';
import { WhatsApp, Instagram, Facebook, Twitter, Mail } from '@mui/icons-material';
import { Box, Typography, IconButton, Button } from '@mui/material';
import { CustomImage } from '../../../images/CustomImage';
import { styles } from '../styles';
import { ucfirst } from '../../../../utils/functions';

interface Props {
    data: any;
}

export const Compartir: FC<Props> = ({ data }) => {
    return (
        <Box sx={{ ...styles.contentBox, height: "100%" }}>
            <Box sx={{ ...styles.gradientBoxSizes, ...styles.gradiantBoxShadow, height: "100%" }}>
                <CustomImage upperBoxStyles={{ borderRadius: 5, overflow: "hidden" }} src="/sharing_image_11zon.webp" alt="imagen_de_compartir_redes" />
                <Typography fontWeight="bold" variant="h6" sx={{ fontFamily: "Oxygen", textAlign: "center", fontSize: 16 }}>¡Comparte este inmueble en redes sociales!</Typography>

                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Button component="a" target="_blank" href={`https://api.whatsapp.com/send?text=${ucfirst(data.descripcion_web.toLowerCase())}...%0AConsolitex%20%7C%20Bienes%20Raices%20https://consolitex.org/inmueble?id=${data.ficha_id}`} color="success" sx={{ width: 60, height: 60, fontSize: 16, borderRadius: "100%" }}>
                        <WhatsApp style={{
                        }} />
                    </Button>
                    <Button component="a" target="_blank" href={`https://www.facebook.com/share.php?u=https://consolitex.org/inmueble?id=${data.ficha_id}&quote=${ucfirst(data.descripcion_web.toLowerCase())}...%0AConsolitex%20%7C%20Bienes%20Raices%0Ahttps://consolitex.org/inmueble?id=${data.ficha_id}`} color="primary" sx={{ width: 60, height: 60, fontSize: 16, borderRadius: "100%" }}>
                        <Facebook />
                    </Button>
                    <Button component="a" target="_blank" href={`https://twitter.com/intent/tweet?text=%20${ucfirst(data.descripcion_web.toLowerCase())}...%0AConsolitex%20%7C%20Bienes%20Raices%20https://consolitex.org/inmueble?id=${data.ficha_id}&hashtags=Consolitex`} color="info" sx={{ width: 60, height: 60, fontSize: 16, borderRadius: "100%" }}>
                        <Twitter />
                    </Button>
                    <Button component="a" target="_blank" href={`mailto:?&subject=%20CONSOLITEX%20%7C%20INMUEBLE&body=${ucfirst(data.descripcion_web.toLowerCase())}...%0AConsolitex%20%7C%20Bienes%20Raices%0Ahttps://consolitex.org/inmueble?id=${data.ficha_id}`} color="primary" sx={{ width: 60, height: 60, fontSize: 16, borderRadius: "100%" }}>
                        <Mail sx={{ color: "black" }} />
                    </Button>
                </Box>
            </Box>
        </Box>
    )
}
