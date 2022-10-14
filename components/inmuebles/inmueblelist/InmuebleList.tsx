import { FC, Suspense, useRef } from 'react';

import dynamic from "next/dynamic";

import { Box, IconButton, Typography } from '@mui/material';

import LeftIcon from '@mui/icons-material/ChevronLeft';
import RightIcon from '@mui/icons-material/ChevronRight';

import { Inmueble } from '../../../pages/index';

import Placeholder from "../../placeholders/RecomendedIndex";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './InmuebleList.module.css';

const settings = {
    autoplay: false,
    slidesToShow: 4,
    slidesToScroll: 4,
    infinite: true,
    responsive: [
        {
            breakpoint: 1440,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
            }
        },
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }
    ]
}
interface Props {
    inmuebles: Inmueble[];
}
export const InmuebleList: FC<Props> = ({ inmuebles }) => {
    const InmuebleCard = dynamic(() => import('../InmuebleCard').then((mod) => mod.InmuebleCard));
    const sliderRef = useRef<any>(null);
    return (
        <Box sx={{ width: "100%", overflow: "hidden" }}>

            <Typography variant="body1" fontWeight={"bold"} component="h3" fontSize={24} textAlign="center" >Recomendados para ti</Typography>

            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Box sx={{ width: { xs: "90%", md: "100%" }, marginInline: "auto", mt: 2, position: "relative" }}>
                    <IconButton sx={{ position: "absolute", top: "50%", left: 0, zIndex: 900, background: "rgba(255,255,255,1)", transform: "translateY(-50%)", "&:hover": { background: "#e1e1e1" } }} onClick={() => sliderRef.current !== null ? sliderRef?.current.slickPrev() : false}><LeftIcon /></IconButton>
                    <IconButton sx={{ position: "absolute", top: "50%", right: 0, zIndex: 900, background: "rgba(255,255,255,1)", transform: "translateY(-50%)", "&:hover": { background: "#e1e1e1" } }} onClick={() => sliderRef.current !== null ? sliderRef?.current.slickNext() : false}><RightIcon /></IconButton>
                    {
                        inmuebles && inmuebles.length > 0
                            ?
                            (
                                <Slider ref={sliderRef} {...settings} className={styles["slick-slider-container"]}>

                                    {
                                        inmuebles.map((inmueble) => (
                                            <Suspense key={inmueble.data.key} fallback={<Placeholder />}>
                                                <InmuebleCard inmueble={inmueble} />
                                            </Suspense>
                                        ))
                                    }
                                </Slider>
                            )
                            : (<Typography color="text.secondary">No se encontraron inmuebles</Typography>)
                    }
                </Box>
            </Box>
        </Box>
    )
}