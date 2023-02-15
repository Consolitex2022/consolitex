import { FC } from 'react'
import { Box, Typography, Avatar } from '@mui/material'

import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import { UserRef } from '../../../interfaces/user-type';

interface Props {
    userData: UserRef;
}
export const RecomendadoPor: FC<Props> = ({ userData }) => {
    return (
        <>
            <Box sx={styles.pcContainer}>
                <Box sx={styles.pcSubContainer}>
                    <Box>
                        <Typography variant="overline" fontWeight="bold" color="common.white" sx={{ fontFamily: "Plus Jakarta Sans" }}>Este inmueble ha sido recomendado por</Typography>
                        <Typography variant="subtitle2" color="common.white" sx={{ fontFamily: "Plus Jakarta Sans" }}>{`${userData.nombre_y_apellido}`}</Typography>
                        <Box sx={{ display: 'flex', alingItems: "center" }}>
                            <LocalPhoneIcon sx={{ color: "#FFF", width: 18, height: 18 }} />
                            <Typography variant="subtitle2" color="common.white" sx={{ fontFamily: "Plus Jakarta Sans" }}>&nbsp;{`${userData.telefono}`}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alingItems: "center" }}>
                            <EmailRoundedIcon sx={{ color: "#FFF", width: 18, height: 18 }} />
                            <Typography variant="subtitle2" color="common.white" sx={{ fontFamily: "Plus Jakarta Sans" }}>&nbsp;{`${userData.email}`}</Typography>
                        </Box>
                    </Box>
                    <Avatar src={`https://consolitex.org/SISGACI/assets/img/${userData.foto}`} sx={{ width: 100, height: 100 }} />
                </Box>
            </Box>
            <Box sx={styles.mobileContainer}>
                <Avatar src={`https://consolitex.org/SISGACI/assets/img/${userData.foto}`} sx={{ width: 100, height: 100 }} />
                <Box sx={styles.mobileSubContainer}>
                    <Box>
                        <Typography variant="overline" fontWeight="bold" color="common.white" sx={{ fontFamily: "Plus Jakarta Sans" }}>Recomendado por</Typography>
                        <Typography variant="subtitle2" color="common.white" sx={{ fontFamily: "Plus Jakarta Sans" }}>{`${userData.nombre_y_apellido}`}</Typography>
                        <Box sx={{ display: 'flex', alingItems: "center" }}>
                            <LocalPhoneIcon sx={{ color: "#FFF", width: 18, height: 18 }} />
                            <Typography variant="subtitle2" color="common.white" sx={{ fontFamily: "Plus Jakarta Sans" }}>&nbsp;{`${userData.telefono}`}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alingItems: "center" }}>
                            <EmailRoundedIcon sx={{ color: "#FFF", width: 18, height: 18 }} />
                            <Typography variant="subtitle2" color="common.white" sx={{ fontFamily: "Plus Jakarta Sans" }}>&nbsp;{`${userData.email}`}</Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    )
}
const styles = {
    mobileContainer: {
        display: {
            xs: "flex",
            sm: "none"
        },
        flexFlow: "row nowrap",
        justifyContent: "space-evenly",
        alignItems: "center", p: 1,
        borderRadius: 5,
        background: "linear-gradient(327deg, rgba(4,156,255,1) 0%, rgba(0,35,116,1) 100%)",
        width: "100%",
        height: 150,
        mb: 1,
        mt: {
            xs: 1,
            md: 0
        },
        "&:hover": {
            boxShadow: "0 8px 32px rgba(0,0,0,0.1)"
        }
    },
    pcContainer: {
        display: {
            xs: "none",
            sm: "block"
        },
        borderRadius: 5,
        background: "linear-gradient(327deg, rgba(4,156,255,1) 0%, rgba(0,35,116,1) 100%)",
        width: "100%",
        height: 150,
        mb: 1,
        mt: {
            xs: 1,
            md: 0
        },
        "&:hover": {
            boxShadow: "0 8px 32px rgba(0,0,0,0.1)"
        }
    },
    pcSubContainer: {
        display: "flex",
        flexFlow: "row wrap",
        alignItems: "center",
        justifyContent: "space-between",
        paddingInline: 10,
        paddingBlock: 3
    },
    mobileSubContainer: {
        display: "flex",
        flexFlow: "row wrap",
        alignItems: "center"
    }
}