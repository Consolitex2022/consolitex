import { FC, LegacyRef, MutableRefObject, useRef } from 'react'
import { Box, IconButton, Typography } from '@mui/material';
import LeftIcon from '@mui/icons-material/ChevronLeft';
import RightIcon from '@mui/icons-material/ChevronRight';

import Carousel from 'react-multi-carousel';
import "react-multi-carousel/lib/styles.css";

import { Inmueble } from '../../../pages/index';
import { InmuebleCard } from '../InmuebleCard';

import Slider from 'react-slick';
import styless from './InmuebleList.module.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const settings = {
    speed: 500,
    autoplay: true,
    slidesToShow: 4,
    slidesToScroll: 4,
    infinite: true,
    autoplaySpeed: 6000,
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
    const sliderRef = useRef<any>(null);
    return (
        <Box sx={{ width: "100%", overflow: "hidden" }}>

            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <IconButton onClick={() => sliderRef.current !== null ? sliderRef?.current.slickPrev() : false}><LeftIcon /></IconButton>
                <Typography variant="body1" fontWeight={"bold"} component="h3" fontSize={24} sx={{ flexGrow: 1, textAlign: "center" }}>Recomendados para tí</Typography>

                <IconButton onClick={() => sliderRef.current !== null ? sliderRef?.current.slickNext() : false}><RightIcon /></IconButton>
            </Box>

            <Box>
                {
                    inmuebles && inmuebles.length > 0
                        ?
                        (
                            <Slider ref={sliderRef} {...settings}>

                                {
                                    inmuebles.map((inmueble) => (
                                        <InmuebleCard key={inmueble.data.key} inmueble={inmueble} />
                                    ))
                                }
                            </Slider>
                        )
                        : (<Typography color="text.secondary">No se encontraron inmuebles</Typography>)
                }
            </Box>
        </Box>
    )
}