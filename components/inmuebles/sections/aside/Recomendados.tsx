import { FC, useRef } from 'react'

import { Box, Typography, Rating } from '@mui/material';

import { useRouter } from 'next/router';

import Slider from 'react-slick';

import { ucfirst } from '../../../../utils/functions';
import { CustomImage } from '../../../images/CustomImage';

import styless from '../../ImagesModal.module.css'
import { styles } from '../styles';
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

interface Props {
    related: any;
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
export const Recomendados: FC<Props> = ({ related }) => {
    const sliderRef = useRef(null);
    const router = useRouter();
    const redirect = (ficha_id: string) => {
        router.push(`/inmueble/${ficha_id}`)
    }
    return (
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
    )
}
