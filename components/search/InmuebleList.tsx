import { FC, useState, Suspense } from 'react'
import dynamic from "next/dynamic";
import { Box, Typography } from '@mui/material';

import { Inmueble } from '../../pages';

import PlaceholderGrid from "../placeholders/InmuebleCardGridPlaceholder"
import PlaceholderNoGrid from "../placeholders/InmuebleCardNoGridPlaceholder"

import { SeccionSuperior } from './';

interface Props {
    inmuebles: Inmueble[];
}


export const InmuebleList: FC<Props> = ({ inmuebles }) => {
    const [squared, setSquared] = useState<boolean>(true);
    const InmuebleCard = dynamic(() => import('./').then((mod) => mod.InmuebleCard));
    const InmuebleCardGrid = dynamic(() => import('./').then((mod) => mod.InmuebleCardGrid));

    const toggleSquare = () => {
        setSquared(prev => !prev)
    }
    return (
        <>
            <SeccionSuperior squared={squared} toggleSquare={toggleSquare} />
            {
                inmuebles?.length > 0
                    ?
                    squared
                        ? inmuebles.map((inmueble: Inmueble) => (
                            <Suspense fallback={<PlaceholderNoGrid />} key={inmueble.data.key}>
                                <InmuebleCard key={inmueble.data.key} inmueble={inmueble} />
                            </Suspense>
                        ))

                        : (<Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "space-evenly", width: "100%" }}>
                            {
                                inmuebles.map((inmueble: Inmueble) => (
                                    <Suspense fallback={<PlaceholderGrid />} key={inmueble.data.key}>
                                        <InmuebleCardGrid inmueble={inmueble} />
                                    </Suspense>
                                ))
                            }
                        </Box>)
                    : (<Typography>Nada de nada</Typography>)
            }
        </>
    )
}
