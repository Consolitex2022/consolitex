import { FC } from 'react'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

import { CustomImage } from '../images/CustomImage'

interface Props {
    fetchNewData: (query: string) => void;
}

export const EndMessage: FC<Props> = ({ fetchNewData }) => {
    return (
        <Box sx={styles.containerRecommended}>
            <CustomImage upperBoxStyles={{ width: 300 }} src="/searching-done.png" alt="No hay mas resultados - Consolitex" />
            <Box sx={{ flexGrow: 1, textAlign: "center", }}>
                <Typography variant="subtitle1" fontWeight="bold" sx={{ fontFamily: "Oxygen" }}>¡No hay más resultados!</Typography>
                <Typography variant="subtitle2" sx={{ fontFamily: "Oxygen" }}>Al parecer se han agotado los resultados para tu búsqueda, te invitamos a ver algunas de las búsquedas más frecuentes</Typography>
                <Button sx={styles.buttonRecommendedSearches} size="small" variant="outlined" onClick={() => fetchNewData('Apartamentos en Valencia')}>Apartamentos en Valencia</Button>
                <Button sx={styles.buttonRecommendedSearches} size="small" variant="outlined" onClick={() => fetchNewData('Apartamentos en San Diego')}>Apartamentos en San Diego</Button>
                <Button sx={styles.buttonRecommendedSearches} size="small" variant="outlined" onClick={() => fetchNewData('Apartamentos en Naguanagua')}>Apartamentos en Naguanagua</Button>
                <Button sx={styles.buttonRecommendedSearches} size="small" variant="outlined" onClick={() => fetchNewData('Quintas en Valencia')}>Quintas en Valencia</Button>
                <Button sx={styles.buttonRecommendedSearches} size="small" variant="outlined" onClick={() => fetchNewData('Townhouse en San Diego')}>Townhouse en San Diego</Button>
                <Button sx={styles.buttonRecommendedSearches} size="small" variant="outlined" onClick={() => fetchNewData('Quintas en Naguanagua')}>Quintas en Naguanagua</Button>
            </Box>
        </Box>
    )
}
const styles = {

    containerRecommended: {
        display: "flex",
        flexFlow: "row wrap",
        width: "100%",
        justifyContent: "center",
        p: 2,
        borderRadius: 5
    },
    buttonRecommendedSearches: {
        textTransform: "none",
        mr: 1,
        mt: 1,
        borderRadius: 5
    },
}
