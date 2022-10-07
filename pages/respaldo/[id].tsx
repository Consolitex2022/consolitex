import { useState, useRef } from 'react';

import { Rating, TextField, Button, IconButton, Box, Typography, Grid } from '@mui/material';

import { GetServerSideProps, NextPage } from 'next'
import Image from 'next/image';

import GalleryIcon from '@mui/icons-material/CollectionsRounded';

import { Formik, Form } from 'formik';

import { Layout } from '../../components/ui/Layout';
import { ucfirst } from '../../utils/functions';
import { ImagesModal } from '../../components/inmuebles/ImagesModal';
import WhatsApp from '@mui/icons-material/WhatsApp';
import Facebook from '@mui/icons-material/Facebook';
import Twitter from '@mui/icons-material/Twitter';
import Instagram from '@mui/icons-material/Instagram';
import { CustomImage } from '../../components/images/CustomImage';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import styless from "./Image.module.css";
import { useRouter } from 'next/router';
import { Caracteristicas, Detalles, Informacion, ZonasComunes } from '../../components/inmuebles/sections';
import { styles } from '../../components/inmuebles/sections/styles';
interface Props {
    data: any;
    zonasComunes: any;
    caracteristicas: any;
    imagenes: any;
    url_inmueble: any;
    related: any;
}

function SampleNextArrow(props: any) {
    const { className, style, onClick } = props;
    return (
        <div
            className={`${className} ${styless['slick-prev']}`}
            style={{ ...style, display: "block" }}
            onClick={onClick}
        />
    );
}

function SamplePrevArrow(props: any) {
    const { className, style, onClick } = props;
    return (
        <div
            className={`${className} ${styless['slick-prev']}`}
            style={{
                ...style, display: "block",
            }}
            onClick={onClick}
        />
    );
}
const InmueblePage: NextPage<Props> = ({ data, imagenes, url_inmueble, related, zonasComunes, caracteristicas }) => {
    const sliderRef = useRef(null);
    const [open, setOpen] = useState<boolean>(false);
    const router = useRouter()
    const handleClose = () => {
        setOpen(false);
    }
    const handleOpen = () => {
        setOpen(true);
    }

    const onSubmit = async () => {

    }

    const settings = {
        fade: true,
        speed: 500,
        autoplay: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        autoplaySpeed: 3000,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
    }
    const redirect = (ficha_id: string) => {
        router.push(`/inmueble/${ficha_id}`)
    }
    const imagesModalProps = { imagenes, handleClose, open, data }
    return (
        <Layout title={ucfirst(`${data.inmueble.toLowerCase()} en ${ucfirst(data.urbanizacion.toLowerCase())} (${ucfirst(data.negocio.toLowerCase())})`)} description={data.descripcion_web}>
            <Box sx={{ ...styles.mainContainer }}>
                <Box id="img" sx={{
                    ...styles.mainContainer,
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

                    <Image id="imagen" src={`https://consolitex.org/newImg.php?portrait=1&nowatermark=1&url=${encodeURI(url_inmueble)}`} layout="fill" objectFit='cover' alt={data.nombre} priority placeholder="blur" blurDataURL={`/placeholder/placeholder.gif`} />
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
                        Ver fotos &nbsp;
                        <GalleryIcon />
                    </Button>
                </Box>
            </Box>
            <ImagesModal {...imagesModalProps} />
            <Grid container display="flex" flexDirection="row" alignItems="flex-start" justifyContent="space-evenly" columnSpacing={{ xs: 0, md: 1 }} rowSpacing={1} sx={{ width: "100%", p: { xs: 0, md: 1 } }}>

                <Grid item xs={12} sm={12} md={8} >
                    <Informacion data={data} />
                    <Detalles data={data} />
                    <Caracteristicas caracteristicas={caracteristicas} />
                    <ZonasComunes zonasComunes={zonasComunes} />
                    <Box sx={{ width: "100%" }}>
                        <CustomImage upperBoxStyles={{ borderRadius: 5, overflow: "hidden" }} src="/banner4.webp" alt="banner inferior" />
                    </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Grid container display="flex" sx={{ width: "100%" }} spacing={1} >


                        <Grid item xs={6} md={12}>
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
                        </Grid>
                        <Grid item xs={6} md={12}>
                            <Box sx={{ ...styles.contentBox }}>
                                <Box sx={{ ...styles.gradientBoxSizes, ...styles.gradiantBoxShadow }}>
                                    <CustomImage upperBoxStyles={{ borderRadius: 5, width: "100%", overflow: "hidden" }} src="/related.jpg" alt="inmuebles recomendados consolitex" />
                                    <Typography fontWeight="bold" variant="h6" sx={{ fontFamily: "Oxygen", textAlign: "center", fontSize: 16 }}>Inmuebles recomendados</Typography>
                                    <Typography variant="subtitle2" sx={{ fontFamily: "Oxygen", textAlign: "center" }}>¡Estos son algunos inmuebles cerca de la zona del inmuele actual!</Typography>
                                    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                        <Box sx={{ textAlign: "center", width: 250, mt: 2 }}>

                                            <Slider ref={sliderRef} {...settings}>

                                                {
                                                    related.map((rel: any) => (
                                                        <Box component="div" key={rel.data.key} onClick={() => redirect(rel.data.ficha_id)} sx={{ cursor: "pointer" }}>
                                                            <Box component="div" sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                                                <CustomImage upperBoxStyles={{ width: 80, height: 80, borderRadius: 3, overflow: "hidden" }} src={`https://consolitex.org/img.php?i=${encodeURI(rel.imagenes[0][0])}`} alt={`Inmueble recomendado - ${rel.data.nombre}`} />
                                                            </Box>
                                                            <Typography variant="subtitle1" fontWeight="bold">{`Código de inmueble ${ucfirst(rel.data.ficha_id0)}`}</Typography>
                                                            <Typography variant="subtitle2" fontWeight="bold">{`${ucfirst(rel.data.inmueble.toLowerCase())} en ${ucfirst(rel.data.urbanizacion.toLowerCase())} (${ucfirst(rel.data.negocio.toLowerCase())})`}</Typography>
                                                            <Rating name="size-small" defaultValue={5} readOnly size="small" />
                                                            <Typography variant="subtitle2" fontWeight="400" color="text.secondary">{`${ucfirst(rel.data.habitaciones)} ${Number(rel.data.habitaciones) !== 1 ? "Habitaciones" : "Habitación"} `}</Typography>
                                                            <Typography variant="subtitle2" fontWeight="400" color="text.secondary">{`${ucfirst(rel.data.banos)} ${Number(rel.data.banos) !== 1 ? "Baños" : "Baño"} `}</Typography>
                                                            <Typography variant="subtitle2" fontWeight="400" color="text.secondary">{`${ucfirst(rel.data.estacionamiento)} ${Number(rel.data.estacionamiento) !== 1 ? "Estacionamientos" : "Estacionamiento"} `}</Typography>
                                                        </Box>
                                                    ))
                                                }
                                            </Slider>
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Box sx={{ ...styles.contentBox, }}>
                                <Box sx={{ ...styles.gradientBoxSizes, ...styles.gradiantBoxShadow }}>
                                    <Typography fontWeight="bold" variant="h6" sx={{ fontFamily: "Oxygen", fontSize: 16 }}>¿Te interesa este inmueble?</Typography>
                                    <Typography fontWeight="400" variant="subtitle2" sx={{ fontFamily: "Oxygen" }}>¡Envíanos un mensaje!</Typography>
                                    <Formik
                                        initialValues={{
                                            nombre: "",
                                            telefono: "",
                                            email: "",
                                            mensaje: "",
                                        }}
                                        onSubmit={onSubmit}
                                        validateOnMount={false}
                                        validateOnChange={false}
                                        validateOnBlur={false}
                                    >
                                        {({ values, handleChange, handleSubmit }) => (
                                            <Form>
                                                <Grid container spacing={1} sx={{ mt: 2 }}>
                                                    <Grid item xs={12} sm={6}>
                                                        <TextField fullWidth label="Nombre" />
                                                    </Grid>
                                                    <Grid item xs={12} sm={6}>
                                                        <TextField fullWidth label="Telefono" />
                                                    </Grid>
                                                    <Grid item xs={12} >
                                                        <TextField fullWidth label="Email" />
                                                    </Grid>
                                                    <Grid item xs={12} >
                                                        <TextField multiline fullWidth label="Mensaje" />
                                                    </Grid>
                                                    <Grid item xs={12} display="flex" flexDirection="column" >
                                                        <Button fullWidth variant="contained" sx={{ p: 1.5 }}>Enviar</Button>
                                                        <Typography variant="subtitle2" color="text.secondary" fontWeight="bold" sx={{ mt: 1, fontFamily: "Oxygen" }}>Al clickear &quot;Enviar&quot; aceptas los TERMINOS Y CONDICIONES</Typography>
                                                    </Grid>
                                                </Grid>
                                            </Form>
                                        )}
                                    </Formik>

                                </Box>
                            </Box>
                        </Grid>


                    </Grid>

                </Grid>

            </Grid>
        </Layout >
    )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { id } = ctx.query;
    if (id === "shape4.png" || id === "shape2.png") {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            }
        }
    }
    try {
        const url = `${process.env.BASE_URL}/inmueble/newBusqueda?id=${id}`
        const respuesta = await fetch(url);
        const data = await respuesta.json();
        const urlRelated = `${process.env.BASE_URL}/inmuebles.php?query=${data.data.municipio}`
        const respuestaRelated = await fetch(urlRelated);
        const dataRelated = await respuestaRelated.json();
        const urlZonas = `${process.env.BASE_URL}/inmueble/zonascomunes?id=${id}`
        const respuestaZonas = await fetch(urlZonas);
        const dataZonas = await respuestaZonas.json();
        const urlCaracteristicas = `${process.env.BASE_URL}/inmueble/caracteristicas?id=${id}`
        const respuestaCarac = await fetch(urlCaracteristicas);
        const dataCarac = await respuestaCarac.json();

        const newImagenes = [
            data.imagenes && data.imagenes.hasOwnProperty('fachada') ? data.imagenes.fachada.map((arr: any) => arr) : '',
            data.imagenes && data.imagenes.hasOwnProperty('sala') ? data.imagenes.sala.map((arr: any) => arr) : '',
            data.imagenes && data.imagenes.hasOwnProperty('banos') ? data.imagenes.banos.map((arr: any) => arr) : '',
            data.imagenes && data.imagenes.hasOwnProperty('habitacion') ? data.imagenes.habitacion.map((arr: any) => arr) : '',
            data.imagenes && data.imagenes.hasOwnProperty('areascomunes') ? data.imagenes.areascomunes.map((arr: any) => arr) : '',
            data.imagenes && data.imagenes.hasOwnProperty('cocina') ? data.imagenes.cocina.map((arr: any) => arr) : '',
        ]
        let related = [];
        let keys = Object.keys(dataRelated);

        for (let i = 0, len = keys.length; i < len; i++) {
            if (dataRelated[keys[i]].hasOwnProperty('data')) {
                related.push(dataRelated[keys[i]]);
            }
        }

        return {
            props: {
                data: data.data,
                zonasComunes: dataZonas,
                caracteristicas: dataCarac,
                url_inmueble: data.url_inmueble,
                imagenes: newImagenes,
                related
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
