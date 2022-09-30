import { Dialog, Button, Box, IconButton, Typography, AppBar, Popover, Toolbar } from '@mui/material';
import { GetServerSideProps, NextPage } from 'next'
import Image from 'next/image';
import { Layout } from '../../components/ui/Layout';
import GalleryIcon from '@mui/icons-material/CollectionsRounded';
import { useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { Masonry } from '@mui/lab';

interface Props {
    data: any;
    imagenes: any;
    url_inmueble: any;
}

const InmueblePage: NextPage<Props> = ({ data, imagenes, url_inmueble }) => {
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    }
    const handleOpen = () => {
        setOpen(true);
    }
    return (
        <Layout title={data.nombre} description={data.descripcion_web}>
            <Box sx={{
                width: "100%", height: "500px", marginInline: "auto", position: "relative", display: "flex",
                "&:hover > #img": {
                    filter: "brightness(0.2)"
                },
                "&:hover > #ver-mas": {
                    transform: "translateX(-50%) translateY(-50%) scale(1)"
                }
            }}>
                <Image id="img" src={`https://consolitex.org/img_sinmosca.php?i=${encodeURI(url_inmueble)}`} layout="fill" objectFit='cover' alt={data.nombre} priority />
                <Box id="ver-mas" sx={{ transition: "0.2s ease all", position: "absolute", top: "50%", left: "50%", background: "white", borderRadius: 4, overflow: "hidden", transform: "translateX(-50%) translateY(-50%) scale(0)", p: 2, }}>
                    <Button sx={{ textTransform: "none", p: 1.8 }} color="primary" onClick={handleOpen}>
                        Ver todas las fotos &nbsp;
                        <GalleryIcon />
                    </Button>
                </Box>
            </Box>
            <Dialog fullScreen open={open} onClose={handleClose}>
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            Imágenes del inmueble
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Box sx={{ display: { xs: "none", md: "block" } }}>

                    <Box sx={{ width: "80%", margin: "20px auto", minHeight: 829 }}>
                        <Masonry columns={3} spacing={1}>
                            {
                                imagenes && imagenes.map((img: any) => (
                                    img && img.map((i: any) => (
                                        <Box key={i} component="img" src={`https://consolitex.org/img2.php?i=${encodeURI(i)}`} sx={{ width: "100%", borderRadius: 5 }}></Box>
                                    )
                                    ))
                                )
                            }
                            <Box sx={{ background: "tomato", maxWidth: 370, minHeight: 200, borderRadius: 5 }}>
                                <Image src='/logo.webp' alt='Logo Consolitex - Footer' width='80' height='80' />
                            </Box>
                            <Box sx={{ background: "dodgerblue", maxWidth: 370, minHeight: 200, borderRadius: 5 }}>
                                <Image src='/logo.webp' alt='Logo Consolitex - Footer' width='80' height='80' />
                            </Box>
                        </Masonry>

                    </Box>
                </Box>
                <Box>

                    {/* {JSON.stringify(imagenes)} */}
                </Box>
            </Dialog>
            <Typography>{data.nombre}</Typography>
        </Layout >
    )
}
const styles = {
    imageContainer: {
        display: "block",
        minWidth: 250,
        minHeight: 250,
        mr: 3,
        mb: 2,
        position: "relative",
        borderRadius: 4,
        overflow: "hidden",
    },
}
// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { id } = ctx.query;
    const url = `${process.env.BASE_URL}/inmueble/newBusqueda?id=${id}`
    try {
        const respuesta = await fetch(url);
        const data = await respuesta.json();
        console.log(data.imagenes.hasOwnProperty('fachada'));
        const newImagenes = [
            data.imagenes && data.imagenes.hasOwnProperty('fachada') ? data.imagenes.fachada.map((arr: any) => arr) : '',
            data.imagenes && data.imagenes.hasOwnProperty('sala') ? data.imagenes.sala.map((arr: any) => arr) : '',
            data.imagenes && data.imagenes.hasOwnProperty('banos') ? data.imagenes.banos.map((arr: any) => arr) : '',
            data.imagenes && data.imagenes.hasOwnProperty('habitacion') ? data.imagenes.habitacion.map((arr: any) => arr) : '',
            data.imagenes && data.imagenes.hasOwnProperty('areascomunes') ? data.imagenes.areascomunes.map((arr: any) => arr) : '',
            data.imagenes && data.imagenes.hasOwnProperty('cocina') ? data.imagenes.cocina.map((arr: any) => arr) : '',
        ]
        return {
            props: {
                data: data.data,
                url_inmueble: data.url_inmueble,
                imagenes: newImagenes
            }
        }
    } catch (error) {
        console.log(error);
        return {
            redirect: {
                destination: "/",
                permanent: false,
            }
        }
    }
}

export default InmueblePage;