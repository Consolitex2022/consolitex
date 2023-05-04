import { FC } from 'react'
import { Box, Typography, Avatar } from '@mui/material'
import WhatsApp from '@mui/icons-material/WhatsApp';
import Facebook from '@mui/icons-material/Facebook';
import Twitter from '@mui/icons-material/Twitter';
import Mail from '@mui/icons-material/Mail';
import Button from '@mui/material/Button';

import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import { UserRef } from '../../../interfaces/user-type';
import { ucfirst, utf8_encode } from '../../../utils/functions';

interface Props {
    userData: UserRef;
    data: any;
}
export const RecomendadoPor: FC<Props> = ({ userData, data }) => {
    return (
        <>
            <MobileView userData={userData} data={data} />
            <PcView userData={userData} data={data} />
        </>
    )
}
interface MobileProps {
    userData: UserRef;
    data: any;
}
const MobileView: FC<MobileProps> = ({ userData, data }) => {
    return (
        <>
            <Box sx={styles.mobileContainer}>
                <Box sx={styles.mobileSubContainer}>
                    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%", margin: 'auto' }}>
                        <Avatar src={`https://consolitex.org/SISGACI/assets/img/${userData.foto}`} sx={{ width: 100, height: 100 }} />
                    </Box>
                    <Box sx={styles.mobileDataContainer}>
                        <Typography variant="overline" fontWeight="bold" fontSize={8} color="common.white" sx={{ fontFamily: "Plus Jakarta Sans" }}>Recomendado por</Typography>
                        <Typography variant="h5" color="common.white" fontSize={20} sx={{ fontFamily: "Plus Jakarta Sans", textAlign: "start" }}>{`${userData.nombre_y_apellido}`}</Typography>
                        <Box sx={{ display: 'flex', alingItems: "center", mt: 1 }}>
                            <LocalPhoneIcon sx={{ color: "#FFF", width: 18, height: 18 }} />
                            <Typography variant="subtitle2" color="common.white" fontSize={12} sx={{ fontFamily: "Plus Jakarta Sans" }}>&nbsp;{`${userData.telefono}`}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alingItems: "center" }}>
                            <EmailRoundedIcon sx={{ color: "#FFF", width: 18, height: 18 }} />
                            <Typography variant="subtitle2" color="common.white" fontSize={12} sx={{ fontFamily: "Plus Jakarta Sans" }}>&nbsp;{`${userData.email}`}</Typography>
                        </Box>
                    </Box>
                </Box>
                <Box sx={styles.mobileTextContainer}>
                    <Typography fontWeight="bold" variant="subtitle2" sx={{ fontFamily: "Plus Jakarta Sans", textAlign: "center", color: "#FFF", }}>¡Comparte este inmueble en redes sociales!</Typography>
                    <Box sx={styles.mobileButtonContainer}>
                        <Button component="a" target="_blank" href={`https://api.whatsapp.com/send?text=${utf8_encode(ucfirst(data.descripcion_web.toLowerCase()))}...%0AConsolitex%20%7C%20Bienes%20Raices%20https://consolitex.vercel.app/inmueble/${data.ficha_id}?ref=${userData.ref}`} color="success" sx={styles.mobileButton}>
                            <WhatsApp />
                        </Button>
                        <Button component="a" target="_blank" href={`https://www.facebook.com/share.php?u=https://consolitex.vercel.app/inmueble/${data.ficha_id}?ref=${userData.ref}&quote=${utf8_encode(ucfirst(data.descripcion_web.toLowerCase()))}...%0AConsolitex%20%7C%20Bienes%20Raices%0Ahttps://consolitex.vercel.app/inmueble/${data.ficha_id}`} color="primary" sx={styles.mobileButton}>
                            <Facebook />
                        </Button>
                        <Button component="a" target="_blank" href={`https://twitter.com/intent/tweet?text=${utf8_encode(ucfirst(data.descripcion_web.toLowerCase()))}...%0AConsolitex%20%7C%20Bienes%20Raices%20https://consolitex.vercel.app/inmueble/${data.ficha_id}?ref=${userData.ref}&hashtags=Consolitex`} color="info" sx={styles.mobileButton}>
                            <Twitter />
                        </Button>
                        <Button component="a" target="_blank" href={`mailto:?&subject=%20CONSOLITEX%20%7C%20INMUEBLE&body=${utf8_encode(ucfirst(data.descripcion_web.toLowerCase()))}...%0AConsolitex%20%7C%20Bienes%20Raices%0Ahttps://consolitex.vercel.app/inmueble/${data.ficha_id}?ref=${userData.ref}`} color="primary" sx={styles.mobileButton}>
                            <Mail sx={{ color: "black" }} />
                        </Button>
                    </Box>
                </Box>
            </Box>
        </>
    )
}
interface PcProps {
    userData: UserRef;
    data: any;
}
const PcView: FC<PcProps> = ({ userData, data }) => {
    return (
        <Box sx={styles.pcContainer}>
            <Box sx={styles.pcSubContainer}>
                <Box sx={styles.pcAvatar}>
                    <Avatar src={`https://consolitex.org/SISGACI/assets/img/${userData.foto}`} sx={{ width: { xs: 100, md: 100, lg: 150, }, height: { xs: 100, md: 100, lg: 150, } }} />
                </Box>
                <Box sx={styles.pcDataContainer}>
                    <Typography variant="overline" fontWeight="bold" color="common.white" sx={{ fontFamily: "Plus Jakarta Sans" }} fontSize={{ xs: 9, md: 10, lg: 12 }}>Recomendado por</Typography>
                    <Typography variant="h5" color="common.white" sx={{ ...styles.pcDataText, fontSize: 24, mb: 1 }}>{`${userData.nombre_y_apellido}`}</Typography>
                    <Box sx={{ display: 'flex', alingItems: "center" }}>
                        <LocalPhoneIcon sx={{ color: "#FFF", width: 18, height: 18 }} />
                        <Typography variant="subtitle2" color="common.white" sx={styles.pcDataText}>&nbsp;{`${userData.telefono}`}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alingItems: "center" }}>
                        <EmailRoundedIcon sx={{ color: "#FFF", width: 18, height: 18 }} />
                        <Typography variant="subtitle2" color="common.white" sx={styles.pcDataText}>&nbsp;{`${userData.email}`}</Typography>
                    </Box>
                </Box>
            </Box>
            <Box sx={styles.pcTextContainer}>
                <Typography fontWeight="bold" variant="subtitle2" sx={{ fontFamily: "Plus Jakarta Sans", textAlign: "center", color: "#FFF", fontSize: { md: 12, lg: 16 } }}>¡Comparte este inmueble en redes sociales!</Typography>
                <Box sx={{ display: "flex", flexFlow: "row nowrap", justifyContent: "center", alignItems: "center", width: "100%", mt: 1 }}>
                    <Button component="a" target="_blank" href={`https://api.whatsapp.com/send?text=${utf8_encode(ucfirst(data.descripcion_web.toLowerCase()))}...%0AConsolitex%20%7C%20Bienes%20Raices%20https://consolitex.org/inmueble?id=${data.ficha_id}`} color="success" sx={styles.pcButton}>
                        <WhatsApp />
                    </Button>
                    <Button component="a" target="_blank" href={`https://www.facebook.com/share.php?u=https://consolitex.org/inmueble?id=${data.ficha_id}&quote=${utf8_encode(ucfirst(data.descripcion_web.toLowerCase()))}...%0AConsolitex%20%7C%20Bienes%20Raices%0Ahttps://consolitex.org/inmueble?id=${data.ficha_id}`} color="primary" sx={styles.pcButton}>
                        <Facebook />
                    </Button>
                    <Button component="a" target="_blank" href={`https://twitter.com/intent/tweet?text=${utf8_encode(ucfirst(data.descripcion_web.toLowerCase()))}...%0AConsolitex%20%7C%20Bienes%20Raices%20https://consolitex.org/inmueble?id=${data.ficha_id}&hashtags=Consolitex`} color="info" sx={styles.pcButton}>
                        <Twitter />
                    </Button>
                    <Button component="a" target="_blank" href={`mailto:?&subject=%20CONSOLITEX%20%7C%20INMUEBLE&body=${utf8_encode(ucfirst(data.descripcion_web.toLowerCase()))}...%0AConsolitex%20%7C%20Bienes%20Raices%0Ahttps://consolitex.org/inmueble?id=${data.ficha_id}`} color="primary" sx={styles.pcButton}>
                        <Mail sx={{ color: "black" }} />
                    </Button>
                </Box>
            </Box>
        </Box>
    )
}
const styles = {
    mobileContainer: {
        display: {
            xs: "flex",
            sm: "none"
        },
        flexFlow: "row wrap",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
        background: "linear-gradient(327deg, rgba(4,156,255,1) 0%, rgba(0,35,116,1) 100%)",
        width: '100%',
        p: 2,
        mb: 1,
        mt: {
            xs: 1,
            md: 0
        },
        "&:hover": {
            boxShadow: "0 8px 32px rgba(0,0,0,0.1)"
        }
    },
    mobileSubContainer: {
        display: "flex",
        flexFlow: "row wrap",
        alignItems: "center",
        justifyContent: "center",
        height: "50%",
    },
    mobileTextContainer: { width: "100%", height: "50%", display: "flex", justifyContent: "center", flexFlow: "column wrap", mt: 3 },
    mobileButtonContainer: { display: "flex", flexFlow: "row nowrap", justifyContent: "center", alignItems: "center", width: "100%" },
    mobileButton: { minWidth: 40, maxWidth: 40, height: 40, fontSize: 12, borderRadius: "50%", background: "#FFF", marginInline: 1 },
    mobileDataContainer: { height: "100%", display: "flex", flexFlow: "column wrap", justifyContent: "center", pl: 1, margin: 'auto' },
    pcContainer: {
        display: {
            xs: "none",
            sm: "block"
        },
        borderRadius: 5,
        background: "linear-gradient(327deg, rgba(4,156,255,1) 0%, rgba(0,35,116,1) 100%)",
        width: "100%",
        height: { md: 'auto' },
        mb: 1,
        mt: {
            xs: 1,
            md: 0
        },
        pb: 5,
        "&:hover": {
            boxShadow: "0 8px 32px rgba(0,0,0,0.1)"
        }
    },
    pcSubContainer: {
        display: "flex",
        flexFlow: "row wrap",
        alignItems: "center",
        justifyContent: "center",
        paddingBlock: 2,
    },
    pcButton: { minWidth: { sm: 40, md: 40, lg: 50 }, maxWidth: { sm: 40, md: 40, lg: 50 }, height: { sm: 40, md: 40, lg: 50 }, borderRadius: "50%", background: "#FFF", marginInline: 1, "&:hover": { background: "rgba(255,255,255,0.6)" } },
    pcTextContainer: { display: "flex", flexFlow: "column wrap", alignItems: "center", justifyContent: "center", width: "100%" },
    pcAvatar: { display: "flex", justifyContent: "end" },
    pcDataContainer: { p: 2 },
    pcDataText: { fontFamily: "Plus Jakarta Sans", fontSize: { md: 14, lg: 16, xl: 18 } }
}