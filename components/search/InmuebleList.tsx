import { FC, useState, } from 'react'

import { Box, Typography } from '@mui/material';

import { Inmueble } from '../../pages';
import { InmuebleCard, InmuebleCardGrid, SeccionSuperior } from './';

interface Props {
    inmuebles: Inmueble[];
}


export const InmuebleList: FC<Props> = ({ inmuebles }) => {
    const [squared, setSquared] = useState<boolean>(false);
    const toggleSquare = () => {
        setSquared(prev => !prev)
    }
    return (
        <>
            <SeccionSuperior squared={squared} toggleSquare={toggleSquare} />
            {
                inmuebles?.length > 0
                    ?
                    squared ?
                        inmuebles.map((inmueble: Inmueble) => (<InmuebleCard key={inmueble.data.key} inmueble={inmueble} />))
                        : (<Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "space-evenly", width: "100%" }}>{inmuebles.map((inmueble: Inmueble) => (<InmuebleCardGrid key={inmueble.data.key} inmueble={inmueble} />))}</Box>)
                    : (<Typography>Nada de nada</Typography>)
            }
        </>
    )
}
