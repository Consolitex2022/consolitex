import { ReactNode, useState, useRef, FC } from 'react';

import { Rating, Avatar, TextField, Button, IconButton, Box, Typography, Grid } from '@mui/material';

import { GetServerSideProps, NextPage } from 'next'
import Image from 'next/image';

import GalleryIcon from '@mui/icons-material/CollectionsRounded';
import CircleIcon from '@mui/icons-material/Circle';

import { Formik, FormikValues, Form } from 'formik';

import { Layout } from '../../components/ui/Layout';
import { numberWithDots, ucfirst, exists } from '../../utils/functions';
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
interface Props {
    data: any;
    zonasComunes: any;
    caracteristicas: any;
    imagenes: any;
    url_inmueble: any;
    related: any;
}

interface PropsCaracteristica {
    title: string;
    mts?: boolean;
    children?: ReactNode;
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
const Caracteristica: FC<PropsCaracteristica> = ({ title, children, mts = false }) => (

    <Box sx={{ display: "flex", flexFlow: "row", alignItems: "center" }}>
        <CircleIcon sx={{ fontSize: 12, mr: 2 }} color="primary" />
        <Typography variant="subtitle1" color="text.primary" fontWeight="bold" sx={{ mr: 1, fontSize: 16 }}>{title}</Typography>
        {mts ? (<Typography variant="subtitle2" color="text.secondary" fontWeight="bold" sx={{ fontSize: 16 }}>{children} m<sup>2</sup></Typography>) : (<Typography variant="subtitle2" color="text.secondary" fontWeight="bold">{children}</Typography>)}
    </Box>)

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
            <Grid container display="flex" flexDirection="row" alignItems="flex-start" columnSpacing={{ xs: 0, md: 1 }} rowSpacing={{ xs: 1, md: 1 }} sx={{ width: { xs: "100%", md: "100%" }, p: { xs: 0, md: 1 } }}>


                <Grid item xs={12} sm={7} md={8} >
                    <Box sx={{ width: "100%", p: 4, ...styles.gradiantBoxShadow }}>
                        <Box>
                            <Typography variant="subtitle1" color="text.primary" fontWeight="bold">Código del inmueble</Typography>
                            <Typography variant="subtitle2" color="text.secondary" fontWeight="bold">{`${data.ficha_id} - ${data.ficha_id0}`}</Typography>
                        </Box>
                        <Box>
                            <Typography variant="subtitle1" color="text.primary" fontWeight="bold">{data.inmueble} en {ucfirst(data.negocio.toLowerCase())}</Typography>
                            <Typography variant="subtitle2" color="text.secondary" fontWeight="bold">{`${data.urbanizacion}, ${data.municipio}, ${data.Estado}`}</Typography>
                        </Box>
                        <Box>
                            <Typography variant="subtitle1" color="text.primary" fontWeight="bold">Precio de {ucfirst(data.negocio.toLowerCase())}</Typography>
                            <Typography variant="subtitle2" color="text.secondary" fontWeight="bold">{numberWithDots(data.ref)},00</Typography>
                        </Box>
                    </Box>
                    <Box sx={{ width: "100%", p: 4, ...styles.gradiantBoxShadow, }}>
                        <Typography variant="subtitle1" fontWeight="bold" sx={{ fontFamily: "Oxygen", fontSize: 16, mb: 1 }}>Detalles</Typography>
                        {data.banos && (<Caracteristica title="Baños">{data.banos}</Caracteristica>)}
                        {data.habitaciones && (<Caracteristica title="Habitaciones">{data.habitaciones}</Caracteristica>)}
                        {data.estacionamiento && (<Caracteristica title="Puestos de estacionamiento">{data.estacionamiento}</Caracteristica>)}
                        {data.mts2 && (<Caracteristica title="Metros de construcción" mts>{data.mts2}</Caracteristica>)}
                        {data.mtst && (<Caracteristica title="Metros de terreno" mts>{data.mtst}</Caracteristica>)}
                        {exists(data.planta) && (<Caracteristica title="Planta eléctrica">{ucfirst(data.planta.toLowerCase())}</Caracteristica>)}
                        {exists(data.pozo) && (<Caracteristica title="Pozo profundo">{ucfirst(data.pozo.toLowerCase())}</Caracteristica>)}
                        <Box sx={{ mt: 1 }}>
                            <Typography variant="subtitle2" color="text.primary" fontWeight="bold">Descripción</Typography>
                            <Typography variant="subtitle2" color="text.secondary">{ucfirst(data.descripcion_web.toLowerCase())}</Typography>
                        </Box>
                    </Box>
                    <Box sx={{ width: "100%", p: 4, ...styles.gradiantBoxShadow, }}>
                        {/* privado
                        antiguedad
                        E_tipo
                        E_nivel
                        maletero
                        nplantas
                        condicion_venta
                        aexcepcionde
                        salon
                        estar
                        estudio
                        cocina
                        estilo_cocina
                        marca_cocina
                        lavandero
                        entrada_deservicio
                        vestier
                        jacuzzi
                        balcon
                        tipo_aire_acondicionado
                        tipo_piso */}
                        <Typography variant="subtitle1" fontWeight="bold" sx={{ fontFamily: "Oxygen", fontSize: 16, mb: 1 }}>Caracteristicas del inmueble</Typography>
                        {caracteristicas.hasOwnProperty('data') && exists(caracteristicas.data.privado) && (<Caracteristica title="Privado">{ucfirst(caracteristicas.data.privado.toLowerCase())}</Caracteristica>)}
                        {caracteristicas.hasOwnProperty('data') && exists(caracteristicas.data.antiguedad) && (<Caracteristica title="Antigüedad">{ucfirst(caracteristicas.data.antiguedad.toLowerCase())}</Caracteristica>)}
                        {caracteristicas.hasOwnProperty('data') && exists(caracteristicas.data.E_tipo) && (<Caracteristica title="Tipo de estacionamiento">{ucfirst(caracteristicas.data.E_tipo.toLowerCase())}</Caracteristica>)}
                        {caracteristicas.hasOwnProperty('data') && exists(caracteristicas.data.E_nivel) && (<Caracteristica title="Nivel de estacionamiento">{ucfirst(caracteristicas.data.E_nivel.toLowerCase())}</Caracteristica>)}
                        {caracteristicas.hasOwnProperty('data') && exists(caracteristicas.data.maletero) && (<Caracteristica title="Maletero">{ucfirst(caracteristicas.data.maletero.toLowerCase())}</Caracteristica>)}
                        {caracteristicas.hasOwnProperty('data') && exists(caracteristicas.data.aexcepcionde) && (<Caracteristica title="Excepciones">{ucfirst(caracteristicas.data.aexcepcionde.toLowerCase())}</Caracteristica>)}
                        {caracteristicas.hasOwnProperty('data') && exists(caracteristicas.data.salon) && (<Caracteristica title="Salon">{ucfirst(caracteristicas.data.salon.toLowerCase())}</Caracteristica>)}
                        {caracteristicas.hasOwnProperty('data') && exists(caracteristicas.data.estar) && (<Caracteristica title="Sala de estar">{ucfirst(caracteristicas.data.estar.toLowerCase())}</Caracteristica>)}
                        {caracteristicas.hasOwnProperty('data') && exists(caracteristicas.data.estudio) && (<Caracteristica title="Estudio">{ucfirst(caracteristicas.data.estudio.toLowerCase())}</Caracteristica>)}
                        {caracteristicas.hasOwnProperty('data') && exists(caracteristicas.data.cocina) && (<Caracteristica title="Cocina">{ucfirst(caracteristicas.data.cocina.toLowerCase())}</Caracteristica>)}
                        {caracteristicas.hasOwnProperty('data') && exists(caracteristicas.data.marca_cocina) && (<Caracteristica title="Marca de cocina">{ucfirst(caracteristicas.data.marca_cocina.toLowerCase())}</Caracteristica>)}
                        {caracteristicas.hasOwnProperty('data') && exists(caracteristicas.data.lavandero) && (<Caracteristica title="Lavandero">{ucfirst(caracteristicas.data.lavandero.toLowerCase())}</Caracteristica>)}
                        {caracteristicas.hasOwnProperty('data') && exists(caracteristicas.data.entrada_deservicio) && (<Caracteristica title="Entrada de servicio">{ucfirst(caracteristicas.data.entrada_deservicio.toLowerCase())}</Caracteristica>)}
                        {caracteristicas.hasOwnProperty('data') && exists(caracteristicas.data.vestier) && (<Caracteristica title="Vestier">{ucfirst(caracteristicas.data.vestier.toLowerCase())}</Caracteristica>)}
                        {caracteristicas.hasOwnProperty('data') && exists(caracteristicas.data.jacuzzi) && (<Caracteristica title="Jacuzzi">{ucfirst(caracteristicas.data.jacuzzi.toLowerCase())}</Caracteristica>)}
                        {caracteristicas.hasOwnProperty('data') && exists(caracteristicas.data.balcon) && (<Caracteristica title="Balcon">{ucfirst(caracteristicas.data.balcon.toLowerCase())}</Caracteristica>)}
                        {caracteristicas.hasOwnProperty('data') && exists(caracteristicas.data.tipo_aire_acondicionado) && (<Caracteristica title="Aire acondicionado">{ucfirst(caracteristicas.data.tipo_aire_acondicionado.toLowerCase())}</Caracteristica>)}
                        {caracteristicas.hasOwnProperty('data') && exists(caracteristicas.data.tipo_piso) && (<Caracteristica title="Tipo de piso">{ucfirst(caracteristicas.data.tipo_piso.toLowerCase())}</Caracteristica>)}
                    </Box>
                    <Box sx={{ width: "100%", p: 4, ...styles.gradiantBoxShadow, }}>
                        {/* vigilancia
                        cant_deascensores
                        ascensor_tipo
                        salon_defiesta
                        sala_dejuego
                        parque_infantil
                        gimnasio
                        sauna
                        piscina
                        parrillera
                        canchas_deportivas
                        areas_verdes
                        telefono
                        internet
                        circuito_cerrado
                        cerco_electrico
                        arquitectura_inteligente
                        zona_carga_descarga
                        vialidad */}
                        <Typography variant="subtitle1" fontWeight="bold" sx={{ fontFamily: "Oxygen", fontSize: 16, mb: 1 }}>Zonas comunes</Typography>
                        {zonasComunes.hasOwnProperty('data') && exists(zonasComunes.data.vigilancia) && (<Caracteristica title="Vigilancia">{ucfirst(zonasComunes.data.vigilancia.toLowerCase())}</Caracteristica>)}
                        {zonasComunes.hasOwnProperty('data') && exists(zonasComunes.data.cant_deascensores) && (<Caracteristica title="Cantidad de ascensores">{ucfirst(zonasComunes.data.cant_deascensores.toLowerCase())}</Caracteristica>)}
                        {zonasComunes.hasOwnProperty('data') && exists(zonasComunes.data.ascensor_tipo) && (<Caracteristica title="Tipo de ascensor">{ucfirst(zonasComunes.data.ascensor_tipo.toLowerCase())}</Caracteristica>)}
                        {zonasComunes.hasOwnProperty('data') && exists(zonasComunes.data.salon_defiesta) && (<Caracteristica title="Salón de fiesta">{ucfirst(zonasComunes.data.salon_defiesta.toLowerCase())}</Caracteristica>)}
                        {zonasComunes.hasOwnProperty('data') && exists(zonasComunes.data.sala_dejuego) && (<Caracteristica title="Sala de juegos">{ucfirst(zonasComunes.data.sala_dejuego.toLowerCase())}</Caracteristica>)}
                        {zonasComunes.hasOwnProperty('data') && exists(zonasComunes.data.parque_infantil) && (<Caracteristica title="Parque infantil">{ucfirst(zonasComunes.data.parque_infantil.toLowerCase())}</Caracteristica>)}
                        {zonasComunes.hasOwnProperty('data') && exists(zonasComunes.data.gimnasio) && (<Caracteristica title="Gimnasio">{ucfirst(zonasComunes.data.gimnasio.toLowerCase())}</Caracteristica>)}
                        {zonasComunes.hasOwnProperty('data') && exists(zonasComunes.data.sauna) && (<Caracteristica title="Sauna">{ucfirst(zonasComunes.data.sauna.toLowerCase())}</Caracteristica>)}
                        {zonasComunes.hasOwnProperty('data') && exists(zonasComunes.data.piscina) && (<Caracteristica title="Piscina">{ucfirst(zonasComunes.data.piscina.toLowerCase())}</Caracteristica>)}
                        {zonasComunes.hasOwnProperty('data') && exists(zonasComunes.data.canchas_deportivas) && (<Caracteristica title="Canchas deportivas">{ucfirst(zonasComunes.data.canchas_deportivas.toLowerCase())}</Caracteristica>)}
                        {zonasComunes.hasOwnProperty('data') && exists(zonasComunes.data.areas_verdes) && (<Caracteristica title="Areas verdes">{ucfirst(zonasComunes.data.areas_verdes.toLowerCase())}</Caracteristica>)}
                        {zonasComunes.hasOwnProperty('data') && exists(zonasComunes.data.telefono) && (<Caracteristica title="Telefono">{ucfirst(zonasComunes.data.telefono.toLowerCase())}</Caracteristica>)}
                        {zonasComunes.hasOwnProperty('data') && exists(zonasComunes.data.internet) && (<Caracteristica title="Internet">{ucfirst(zonasComunes.data.internet.toLowerCase())}</Caracteristica>)}
                        {zonasComunes.hasOwnProperty('data') && exists(zonasComunes.data.circuito_cerrado) && (<Caracteristica title="Circuito cerrado">{ucfirst(zonasComunes.data.circuito_cerrado.toLowerCase())}</Caracteristica>)}
                        {zonasComunes.hasOwnProperty('data') && exists(zonasComunes.data.cerco_electrico) && (<Caracteristica title="Cerco electrico">{ucfirst(zonasComunes.data.cerco_electrico.toLowerCase())}</Caracteristica>)}
                        {zonasComunes.hasOwnProperty('data') && exists(zonasComunes.data.arquitectura_inteligente) && (<Caracteristica title="Arquitectura inteligente">{ucfirst(zonasComunes.data.arquitectura_inteligente.toLowerCase())}</Caracteristica>)}
                        {zonasComunes.hasOwnProperty('data') && exists(zonasComunes.data.zona_carga_descarga) && (<Caracteristica title="Zona carga-descarga">{ucfirst(zonasComunes.data.zona_carga_descarga.toLowerCase())}</Caracteristica>)}
                        {zonasComunes.hasOwnProperty('data') && exists(zonasComunes.data.vialidad) && (<Caracteristica title="Vialidad">{ucfirst(zonasComunes.data.vialidad.toLowerCase())}</Caracteristica>)}
                    </Box>
                    <Box sx={{ width: "100%" }}>
                        <CustomImage upperBoxStyles={{ borderRadius: 5, overflow: "hidden" }} src="/banner4.webp" alt="banner inferior" />

                    </Box>
                </Grid>
                <Grid item xs={12} sm={5} md={4} display="flex" flexDirection="row" flexWrap="wrap" >
                    <Box sx={{ ...styles.contentBox }}>
                        <Box sx={{ ...styles.gradientBoxSizes, ...styles.gradiantBoxShadow }}>
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
                    <Box sx={{ ...styles.contentBox }}>
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

const styles = {
    mainContainer: {
        width: "100%",
        minHeight: "500px",
        marginInline: "auto",
        position: "relative",
        display: "flex",
        mb: 2,
        overflow: "hidden",
        "&:hover > #ver-mas": {
            transform: "translateX(-50%) translateY(-50%) scale(1)"
        },
        "&:hover > #img > span > #imagen": {
            filter: "blur(8px) !important",
        }
    },
    gradientBoxSizes: {
        minWidth: "100%",
        minHeight: 400,
        p: 5,
        display: "flex",
        flexFlow: "column wrap",
        alignItems: "center",
        justifyContent: "center",
    },
    contentBox: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    gradiantBoxShadow: {
        background: "#FFF",
        position: "relative",
        borderRadius: 5,
        mb: 1,
        "&:before": {
            content: "''",
            zIndex: "-1",
            position: "absolute",
            top: "0",
            right: "0",
            bottom: "0",
            left: "0",
            background: "linear-gradient(0deg, #E85C90 20%, #58EFEC 80%)",
            transform: "translate3d(0px, -2px, 0) scale(0)",
            filter: "blur(10px)",
            opacity: "1",
            // transition: "0.5s ease all",
            borderRadius: "inherit",
            animation: "5s rotating linear infinite"
        },
        "@keyframes rotating": {
            '0%': {
                background: "linear-gradient(0.00deg, #E85C90 20%, #58EFEC 80%) "
            },
            '1%': {
                background: "linear-gradient(3.60deg, #E85C90 20%, #58EFEC 80%) "
            },
            '2%': {
                background: "linear-gradient(7.20deg, #E85C90 20%, #58EFEC 80%) "
            },
            '3%': {
                background: "linear-gradient(10.80deg, #E85C90 20%, #58EFEC 80%) "
            },
            '4%': {
                background: "linear-gradient(14.40deg, #E85C90 20%, #58EFEC 80%) "
            },
            '5%': {
                background: "linear-gradient(18.00deg, #E85C90 20%, #58EFEC 80%) "
            },
            '6%': {
                background: "linear-gradient(21.60deg, #E85C90 20%, #58EFEC 80%) "
            },
            '7%': {
                background: "linear-gradient(25.20deg, #E85C90 20%, #58EFEC 80%) "
            },
            '8%': {
                background: "linear-gradient(28.80deg, #E85C90 20%, #58EFEC 80%) "
            },
            '9%': {
                background: "linear-gradient(32.40deg, #E85C90 20%, #58EFEC 80%) "
            },
            '10%': {
                background: "linear-gradient(36.00deg, #E85C90 20%, #58EFEC 80%) "
            },
            '11%': {
                background: "linear-gradient(39.60deg, #E85C90 20%, #58EFEC 80%) "
            },
            '12%': {
                background: "linear-gradient(43.20deg, #E85C90 20%, #58EFEC 80%) "
            },
            '13%': {
                background: "linear-gradient(46.80deg, #E85C90 20%, #58EFEC 80%) "
            },
            '14%': {
                background: "linear-gradient(50.40deg, #E85C90 20%, #58EFEC 80%) "
            },
            '15%': {
                background: "linear-gradient(54.00deg, #E85C90 20%, #58EFEC 80%) "
            },
            '16%': {
                background: "linear-gradient(57.60deg, #E85C90 20%, #58EFEC 80%) "
            },
            '17%': {
                background: "linear-gradient(61.20deg, #E85C90 20%, #58EFEC 80%) "
            },
            '18%': {
                background: "linear-gradient(64.80deg, #E85C90 20%, #58EFEC 80%) "
            },
            '19%': {
                background: "linear-gradient(68.40deg, #E85C90 20%, #58EFEC 80%) "
            },
            '20%': {
                background: "linear-gradient(72.00deg, #E85C90 20%, #58EFEC 80%) "
            },
            '21%': {
                background: "linear-gradient(75.60deg, #E85C90 20%, #58EFEC 80%) "
            },
            '22%': {
                background: "linear-gradient(79.20deg, #E85C90 20%, #58EFEC 80%) "
            },
            '23%': {
                background: "linear-gradient(82.80deg, #E85C90 20%, #58EFEC 80%) "
            },
            '24%': {
                background: "linear-gradient(86.40deg, #E85C90 20%, #58EFEC 80%) "
            },
            '25%': {
                background: "linear-gradient(90.00deg, #E85C90 20%, #58EFEC 80%) "
            },
            '26%': {
                background: "linear-gradient(93.60deg, #E85C90 20%, #58EFEC 80%) "
            },
            '27%': {
                background: "linear-gradient(97.20deg, #E85C90 20%, #58EFEC 80%) "
            },
            '28%': {
                background: "linear-gradient(100.80deg, #E85C90 20%, #58EFEC 80%) "
            },
            '29%': {
                background: "linear-gradient(104.40deg, #E85C90 20%, #58EFEC 80%) "
            },
            '30%': {
                background: "linear-gradient(108.00deg, #E85C90 20%, #58EFEC 80%) "
            },
            '31%': {
                background: "linear-gradient(111.60deg, #E85C90 20%, #58EFEC 80%) "
            },
            '32%': {
                background: "linear-gradient(115.20deg, #E85C90 20%, #58EFEC 80%) "
            },
            '33%': {
                background: "linear-gradient(118.80deg, #E85C90 20%, #58EFEC 80%) "
            },
            '34%': {
                background: "linear-gradient(122.40deg, #E85C90 20%, #58EFEC 80%) "
            },
            '35%': {
                background: "linear-gradient(126.00deg, #E85C90 20%, #58EFEC 80%) "
            },
            '36%': {
                background: "linear-gradient(129.60deg, #E85C90 20%, #58EFEC 80%) "
            },
            '37%': {
                background: "linear-gradient(133.20deg, #E85C90 20%, #58EFEC 80%) "
            },
            '38%': {
                background: "linear-gradient(136.80deg, #E85C90 20%, #58EFEC 80%) "
            },
            '39%': {
                background: "linear-gradient(140.40deg, #E85C90 20%, #58EFEC 80%) "
            },
            '40%': {
                background: "linear-gradient(144.00deg, #E85C90 20%, #58EFEC 80%) "
            },
            '41%': {
                background: "linear-gradient(147.60deg, #E85C90 20%, #58EFEC 80%) "
            },
            '42%': {
                background: "linear-gradient(151.20deg, #E85C90 20%, #58EFEC 80%) "
            },
            '43%': {
                background: "linear-gradient(154.80deg, #E85C90 20%, #58EFEC 80%) "
            },
            '44%': {
                background: "linear-gradient(158.40deg, #E85C90 20%, #58EFEC 80%) "
            },
            '45%': {
                background: "linear-gradient(162.00deg, #E85C90 20%, #58EFEC 80%) "
            },
            '46%': {
                background: "linear-gradient(165.60deg, #E85C90 20%, #58EFEC 80%) "
            },
            '47%': {
                background: "linear-gradient(169.20deg, #E85C90 20%, #58EFEC 80%) "
            },
            '48%': {
                background: "linear-gradient(172.80deg, #E85C90 20%, #58EFEC 80%) "
            },
            '49%': {
                background: "linear-gradient(176.40deg, #E85C90 20%, #58EFEC 80%) "
            },
            '50%': {
                background: "linear-gradient(180.00deg, #E85C90 20%, #58EFEC 80%) "
            },
            '51%': {
                background: "linear-gradient(183.60deg, #E85C90 20%, #58EFEC 80%) "
            },
            '52%': {
                background: "linear-gradient(187.20deg, #E85C90 20%, #58EFEC 80%) "
            },
            '53%': {
                background: "linear-gradient(190.80deg, #E85C90 20%, #58EFEC 80%) "
            },
            '54%': {
                background: "linear-gradient(194.40deg, #E85C90 20%, #58EFEC 80%) "
            },
            '55%': {
                background: "linear-gradient(198.00deg, #E85C90 20%, #58EFEC 80%) "
            },
            '56%': {
                background: "linear-gradient(201.60deg, #E85C90 20%, #58EFEC 80%) "
            },
            '57%': {
                background: "linear-gradient(205.20deg, #E85C90 20%, #58EFEC 80%) "
            },
            '58%': {
                background: "linear-gradient(208.80deg, #E85C90 20%, #58EFEC 80%) "
            },
            '59%': {
                background: "linear-gradient(212.40deg, #E85C90 20%, #58EFEC 80%) "
            },
            '60%': {
                background: "linear-gradient(216.00deg, #E85C90 20%, #58EFEC 80%) "
            },
            '61%': {
                background: "linear-gradient(219.60deg, #E85C90 20%, #58EFEC 80%) "
            },
            '62%': {
                background: "linear-gradient(223.20deg, #E85C90 20%, #58EFEC 80%) "
            },
            '63%': {
                background: "linear-gradient(226.80deg, #E85C90 20%, #58EFEC 80%) "
            },
            '64%': {
                background: "linear-gradient(230.40deg, #E85C90 20%, #58EFEC 80%) "
            },
            '65%': {
                background: "linear-gradient(234.00deg, #E85C90 20%, #58EFEC 80%) "
            },
            '66%': {
                background: "linear-gradient(237.60deg, #E85C90 20%, #58EFEC 80%) "
            },
            '67%': {
                background: "linear-gradient(241.20deg, #E85C90 20%, #58EFEC 80%) "
            },
            '68%': {
                background: "linear-gradient(244.80deg, #E85C90 20%, #58EFEC 80%) "
            },
            '69%': {
                background: "linear-gradient(248.40deg, #E85C90 20%, #58EFEC 80%) "
            },
            '70%': {
                background: "linear-gradient(252.00deg, #E85C90 20%, #58EFEC 80%) "
            },
            '71%': {
                background: "linear-gradient(255.60deg, #E85C90 20%, #58EFEC 80%) "
            },
            '72%': {
                background: "linear-gradient(259.20deg, #E85C90 20%, #58EFEC 80%) "
            },
            '73%': {
                background: "linear-gradient(262.80deg, #E85C90 20%, #58EFEC 80%) "
            },
            '74%': {
                background: "linear-gradient(266.40deg, #E85C90 20%, #58EFEC 80%) "
            },
            '75%': {
                background: "linear-gradient(270.00deg, #E85C90 20%, #58EFEC 80%) "
            },
            '76%': {
                background: "linear-gradient(273.60deg, #E85C90 20%, #58EFEC 80%) "
            },
            '77%': {
                background: "linear-gradient(277.20deg, #E85C90 20%, #58EFEC 80%) "
            },
            '78%': {
                background: "linear-gradient(280.80deg, #E85C90 20%, #58EFEC 80%) "
            },
            '79%': {
                background: "linear-gradient(284.40deg, #E85C90 20%, #58EFEC 80%) "
            },
            '80%': {
                background: "linear-gradient(288.00deg, #E85C90 20%, #58EFEC 80%) "
            },
            '81%': {
                background: "linear-gradient(291.60deg, #E85C90 20%, #58EFEC 80%) "
            },
            '82%': {
                background: "linear-gradient(295.20deg, #E85C90 20%, #58EFEC 80%) "
            },
            '83%': {
                background: "linear-gradient(298.80deg, #E85C90 20%, #58EFEC 80%) "
            },
            '84%': {
                background: "linear-gradient(302.40deg, #E85C90 20%, #58EFEC 80%) "
            },
            '85%': {
                background: "linear-gradient(306.00deg, #E85C90 20%, #58EFEC 80%) "
            },
            '86%': {
                background: "linear-gradient(309.60deg, #E85C90 20%, #58EFEC 80%) "
            },
            '87%': {
                background: "linear-gradient(313.20deg, #E85C90 20%, #58EFEC 80%) "
            },
            '88%': {
                background: "linear-gradient(316.80deg, #E85C90 20%, #58EFEC 80%) "
            },
            '89%': {
                background: "linear-gradient(320.40deg, #E85C90 20%, #58EFEC 80%) "
            },
            '90%': {
                background: "linear-gradient(324.00deg, #E85C90 20%, #58EFEC 80%) "
            },
            '91%': {
                background: "linear-gradient(327.60deg, #E85C90 20%, #58EFEC 80%) "
            },
            '92%': {
                background: "linear-gradient(331.20deg, #E85C90 20%, #58EFEC 80%) "
            },
            '93%': {
                background: "linear-gradient(334.80deg, #E85C90 20%, #58EFEC 80%) "
            },
            '94%': {
                background: "linear-gradient(338.40deg, #E85C90 20%, #58EFEC 80%) "
            },
            '95%': {
                background: "linear-gradient(342.00deg, #E85C90 20%, #58EFEC 80%) "
            },
            '96%': {
                background: "linear-gradient(345.60deg, #E85C90 20%, #58EFEC 80%) "
            },
            '97%': {
                background: "linear-gradient(349.20deg, #E85C90 20%, #58EFEC 80%) "
            },
            '98%': {
                background: "linear-gradient(352.80deg, #E85C90 20%, #58EFEC 80%) "
            },
            '99%': {
                background: "linear-gradient(356.40deg, #E85C90 20%, #58EFEC 80%) "
            },
            '100%': {
                background: "linear-gradient(360.00deg, #E85C90 20%, #58EFEC 80%) "
            },
        },
        "&::after": {
            content: "''",
            zIndex: "-1",
            position: "absolute",
            top: "0",
            right: "0",
            bottom: "0",
            left: "0",
            background: "inherit",
            borderRadius: "inherit",
        },
        "&:hover": {
            "&:before": {
                content: "''",
                transform: "translate3d(0px, -2px, 0) scale(1)",
            },
        }
    },
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