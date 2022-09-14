import { FC } from 'react'
import { Box, Typography } from '@mui/material';

import Carousel from 'react-multi-carousel';
import "react-multi-carousel/lib/styles.css";

import { Inmueble } from '../../pages/index';
import { InmuebleCard } from './InmuebleCard';

interface Props {
    inmuebles: Inmueble[];
}
const responsive: any = {
    desktop: {
        breakpoint: { max: 3000, min: 1150 },
        items: 3,
        slidesToSlide: 1 // optional, default to 1.
    },
    tablet: {
        breakpoint: { max: 1150, min: 800 },
        items: 2,
        slidesToSlide: 1 // optional, default to 1.
    },
    mobile: {
        breakpoint: { max: 800, min: 0 },
        items: 1,
        slidesToSlide: 1 // optional, default to 1.
    }
};
export const InmuebleList: FC<Props> = ({ inmuebles }) => {

    return (
        <>

            {
                inmuebles && inmuebles.length > 0
                    ?
                    (
                        <Carousel
                            responsive={responsive}
                            infinite={true}
                            ssr={false}
                            showDots={false}
                            swipeable={false}
                            draggable={false}
                            autoPlaySpeed={1000}
                            keyBoardControl={true}
                            customTransition="all .5s"
                            transitionDuration={500}
                            containerClass="carousel-container"
                            dotListClass="custom-dot-list-style"
                            itemClass="carousel-item-padding-40-px"
                        >
                            {
                                inmuebles.map((inmueble) => (
                                    <InmuebleCard key={inmueble.data.key} inmueble={inmueble} />
                                ))
                            }
                        </Carousel>
                    )
                    : (<Typography color="text.secondary">No se encontraron inmuebles</Typography>)
            }
        </>
    )
}