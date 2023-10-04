import { Grid, Box, Typography, Chip } from '@mui/material'
import React, { useEffect } from 'react'
import { CustomImage } from '../images/CustomImage'


export const OfertasList = () => {
    const getOfertas = async () => {
        const url = ``
    }
    useEffect(() => {
        getOfertas();
    }, [])

    return (
        <Grid container sx={{ width: '100%', mb: 2, }} spacing={1} >
            <Grid item xs={12} sm={6} onClick={() => window.open('/inmueble/ARV0235', '_blank')} sx={{ cursor: 'pointer' }}>
                <Box sx={{ p: 2, background: '#FFF', borderRadius: 3, boxShadow: '0 2px 8px rgba(100,100,100,0.2)', display: 'flex', flexFlow: 'row nowrap', justifyContent: 'space-around', alignItems: 'center' }}>
                    <Box >
                        <Box sx={{ display: 'flex', flexFlow: 'row wrap', alignItems: 'center' }}>
                            <Typography variant='overline' fontSize={20} fontWeight='bold' sx={{ mr: 1, color: (theme) => theme.palette.primary.main }}>Oferta</Typography>
                            <Chip color='primary' label={'ARV235'} />
                        </Box>
                        <Typography variant='subtitle2'>Apartamento en la trigaleña</Typography>
                        <Box sx={{ display: 'flex' }}>
                            <Typography variant='h6' fontWeight='bold' color='text.secondary' sx={{ textDecorationLine: 'line-through', mr: 1 }}>18,000</Typography>
                            <Typography variant='h5' fontWeight='bold' >15,500</Typography>
                        </Box>
                    </Box>
                    <CustomImage src={'https://images.consolitex.org/ARV0235/2/1.jpeg'} alt={''} upperBoxStyles={{ width: '150px', height: '150px', borderRadius: 3, overflow: 'hidden' }} />
                </Box>
            </Grid>
            <Grid item xs={12} sm={6} onClick={() => window.open('/inmueble/A002345', '_blank')} sx={{ cursor: 'pointer' }}>
                <Box sx={{ p: 2, background: '#FFF', borderRadius: 3, boxShadow: '0 2px 8px rgba(100,100,100,0.2)', display: 'flex', flexFlow: 'row nowrap', justifyContent: 'space-around', alignItems: 'center' }}>
                    <Box >
                        <Box sx={{ display: 'flex', flexFlow: 'row wrap', alignItems: 'center' }}>
                            <Typography variant='overline' fontSize={20} fontWeight='bold' sx={{ mr: 1, color: (theme) => theme.palette.primary.main }}>Oferta</Typography>
                            <Chip color='primary' label={'A2345'} />
                        </Box>
                        <Typography variant='subtitle2'>Apartamento en naguanagua</Typography>
                        <Box sx={{ display: 'flex' }}>
                            <Typography variant='h6' fontWeight='bold' color='text.secondary' sx={{ textDecorationLine: 'line-through', mr: 1 }}>17,000</Typography>
                            <Typography variant='h5' fontWeight='bold' >15,750</Typography>
                        </Box>
                    </Box>
                    <CustomImage src={'https://images.consolitex.org/A002345/2/11.jpg'} alt={''} upperBoxStyles={{ width: '150px', height: '150px', borderRadius: 3, overflow: 'hidden' }} />
                </Box>
            </Grid>
            <Grid item xs={12} sm={6} onClick={() => window.open('/inmueble/A002254', '_blank')} sx={{ cursor: 'pointer' }}>
                <Box sx={{ p: 2, background: '#FFF', borderRadius: 3, boxShadow: '0 2px 8px rgba(100,100,100,0.2)', display: 'flex', flexFlow: 'row nowrap', justifyContent: 'space-around', alignItems: 'center' }}>
                    <Box >
                        <Box sx={{ display: 'flex', flexFlow: 'row wrap', alignItems: 'center' }}>
                            <Typography variant='overline' fontSize={20} fontWeight='bold' sx={{ mr: 1, color: (theme) => theme.palette.primary.main }}>Oferta</Typography>
                            <Chip color='primary' label={'A2254'} />
                        </Box>
                        <Typography variant='subtitle2'>Apartamento en mañongo</Typography>
                        <Box sx={{ display: 'flex' }}>
                            <Typography variant='h6' fontWeight='bold' color='text.secondary' sx={{ textDecorationLine: 'line-through', mr: 1 }}>25,000</Typography>
                            <Typography variant='h5' fontWeight='bold' >21,500</Typography>
                        </Box>
                    </Box>
                    <CustomImage src={'https://images.consolitex.org/A002254/2/1.jpg'} alt={''} upperBoxStyles={{ width: '150px', height: '150px', borderRadius: 3, overflow: 'hidden' }} />
                </Box>
            </Grid>
            <Grid item xs={12} sm={6} onClick={() => window.open('/inmueble/A002298', '_blank')} sx={{ cursor: 'pointer' }}>
                <Box sx={{ p: 2, background: '#FFF', borderRadius: 3, boxShadow: '0 2px 8px rgba(100,100,100,0.2)', display: 'flex', flexFlow: 'row nowrap', justifyContent: 'space-around', alignItems: 'center' }}>
                    <Box >
                        <Box sx={{ display: 'flex', flexFlow: 'row wrap', alignItems: 'center' }}>
                            <Typography variant='overline' fontSize={20} fontWeight='bold' sx={{ mr: 1, color: (theme) => theme.palette.primary.main }}>Oferta</Typography>
                            <Chip color='primary' label={'A2298'} />
                        </Box>
                        <Typography variant='subtitle2'>Apartamento en Las Chimeneas</Typography>
                        <Box sx={{ display: 'flex' }}>
                            <Typography variant='h6' fontWeight='bold' color='text.secondary' sx={{ textDecorationLine: 'line-through', mr: 1 }}>42,000</Typography>
                            <Typography variant='h5' fontWeight='bold' >38,000</Typography>
                        </Box>
                    </Box>
                    <CustomImage src={'https://images.consolitex.org/A002298/2/2.jpg'} alt={''} upperBoxStyles={{ width: '150px', height: '150px', borderRadius: 3, overflow: 'hidden' }} />
                </Box>
            </Grid>
        </Grid>
    )
}
const OfertasItem = () => {
    return (
        <>

        </>
    )
}