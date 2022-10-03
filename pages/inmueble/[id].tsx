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
                overflow: "hidden",
                "&:hover > #ver-mas": {
                    transform: "translateX(-50%) translateY(-50%) scale(1)"
                },
                "&:hover > #img > span > #imagen": {
                    filter: "blur(8px) !important",
                }
            }}>
                <Box id="img" sx={{
                    "&:after": {
                        content: "''",
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        top: 0,
                        left: 0,
                        transition: ".2s ease all",
                        zIndex: 90,
                        background: "rgba(0,0,0,0.5)"
                    }
                }}>

                    <Image id="imagen" src={`https://consolitex.org/newImg.php?portrait=1&nowatermark=1&url=${encodeURI(url_inmueble)}`} layout="fill" objectFit='cover' alt={data.nombre} priority style={{ position: "fixed" }} placeholder="blur" blurDataURL={`https://consolitex.org/newImg.php?nowatermark=1&url=${encodeURI(url_inmueble)}`} />
                </Box>
                <Box component="div" sx={{ transition: ".2s ease all", zIndex: 200, position: "absolute", top: 0, left: 0, display: "flex", flexFlow: "row" }}>
                    <Box id="secondary-content1" sx={{ ml: 4, mt: 5, position: "relative", width: 20 }}>
                        <Box sx={{ width: { xs: 5, md: 10 }, height: 200, background: "white" }}></Box>
                    </Box>
                    <Box component="div" sx={{ mt: { xs: 3, md: 2 } }}>
                        <Typography id="secondary-content2" sx={{ transition: ".2s ease all", color: "white", fontSize: { xs: "2em", md: "6em" }, fontFamily: "montserrat" }}>Consolitex®</Typography>
                        <Typography id="secondary-content3" sx={{ transition: ".6s ease all", color: "white", fontSize: { xs: "1em", md: "2em" }, fontFamily: "montserrat", fontStyle: "italic" }}>Bienes raíces #hogarfamiliabienestar</Typography>
                    </Box>
                </Box>
                <Box id="ver-mas" sx={{ transition: ".2s ease all", position: "absolute", top: "50%", left: "50%", background: "white", borderRadius: 4, overflow: "hidden", transform: { xs: "translateX(-50%) translateY(-50%) scale(1)", md: "translateX(-50%) translateY(-50%) scale(0)" }, p: 2, zIndex: 91 }}>
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
                                        <Box key={i} component="img" src={`https://consolitex.org/newImg.php?url=${encodeURI(i)}`} sx={{ width: "100%", borderRadius: 5 }}></Box>
                                    )
                                    ))
                                )
                            }
                            <Box sx={{ background: "paleturquoise", maxWidth: 370, minHeight: 185, borderRadius: 5, display: "flex", alignItems: "center", flexFlow: "column wrap" }}>
                                <Image src='/logo.webp' alt='Logo Consolitex - Gallery' width='80' height='80' />
                                <Box>
                                    <Typography variant="h6" sx={{ fontStyle: "italic", textAlign: "center" }} color="common.white">¡Siempre te damos más!</Typography>
                                    <Typography variant="h6" sx={{ fontStyle: "italic", textAlign: "center" }} color="common.white">¿Te gusta lo que ves?</Typography>
                                </Box>
                            </Box>
                            <Box sx={{ background: "khaki", maxWidth: 370, minHeight: 185, borderRadius: 5, display: "flex", alignItems: "center", flexFlow: "column wrap" }}>
                                <Image src='/logo.webp' alt='Logo Consolitex - Gallery' width='80' height='80' />
                                <Box>
                                    <Typography variant="h6" sx={{ fontStyle: "italic", textAlign: "center" }} color="common.white">¡Síguenos en las redes sociales! @consolitex</Typography>
                                    <Typography variant="h6" sx={{ fontStyle: "italic", textAlign: "center" }} color="common.white">#hogarfamiliabienestar</Typography>
                                </Box>
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