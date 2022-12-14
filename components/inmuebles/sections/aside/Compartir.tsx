import { FC } from 'react';
import WhatsApp from '@mui/icons-material/WhatsApp';
import Facebook from '@mui/icons-material/Facebook';
import Twitter from '@mui/icons-material/Twitter';
import Mail from '@mui/icons-material/Mail';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { CustomImage } from '../../../images/CustomImage';
import { styles } from '../styles';
import { ucfirst, utf8_encode } from '../../../../utils/functions';

interface Props {
    data: any;
}

export const Compartir: FC<Props> = ({ data }) => {
    return (
        <Box sx={{ ...styles.contentBox, height: "100%" }}>
            <Box sx={{ ...styles.gradientBoxSizes, ...styles.gradiantBoxShadow, height: "100%" }}>
                <CustomImage upperBoxStyles={{ borderRadius: 5, overflow: "hidden" }} src="/sharing_image_11zon.webp" alt="imagen_de_compartir_redes" />
                <Typography fontWeight="bold" variant="h6" sx={{ fontFamily: "Oxygen", textAlign: "center", fontSize: 16 }}>┬íComparte este inmueble en redes sociales!</Typography>

                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Button component="a" target="_blank" href={`https://api.whatsapp.com/send?text=${utf8_encode(ucfirst(data.descripcion_web.toLowerCase()))}...%0AConsolitex%20%7C%20Bienes%20Raices%20https://consolitex.org/inmueble?id=${data.ficha_id}`} color="success" sx={{ width: 60, height: 60, fontSize: 16, borderRadius: "100%" }}>
                        <WhatsApp style={{
                        }} />
                    </Button>
                    <Button component="a" target="_blank" href={`https://www.facebook.com/share.php?u=https://consolitex.org/inmueble?id=${data.ficha_id}&quote=${utf8_encode(ucfirst(data.descripcion_web.toLowerCase()))}...%0AConsolitex%20%7C%20Bienes%20Raices%0Ahttps://consolitex.org/inmueble?id=${data.ficha_id}`} color="primary" sx={{ width: 60, height: 60, fontSize: 16, borderRadius: "100%" }}>
                        <Facebook />
                    </Button>
                    <Button component="a" target="_blank" href={`https://twitter.com/intent/tweet?text=${utf8_encode(ucfirst(data.descripcion_web.toLowerCase()))}...%0AConsolitex%20%7C%20Bienes%20Raices%20https://consolitex.org/inmueble?id=${data.ficha_id}&hashtags=Consolitex`} color="info" sx={{ width: 60, height: 60, fontSize: 16, borderRadius: "100%" }}>
                        <Twitter />
                    </Button>
                    <Button component="a" target="_blank" href={`mailto:?&subject=%20CONSOLITEX%20%7C%20INMUEBLE&body=${utf8_encode(ucfirst(data.descripcion_web.toLowerCase()))}...%0AConsolitex%20%7C%20Bienes%20Raices%0Ahttps://consolitex.org/inmueble?id=${data.ficha_id}`} color="primary" sx={{ width: 60, height: 60, fontSize: 16, borderRadius: "100%" }}>
                        <Mail sx={{ color: "black" }} />
                    </Button>
                </Box>
            </Box>
        </Box>
    )
}