import { FC, useState } from 'react'
import { Box, Grid, IconButton, Typography } from '@mui/material';
import { Inmueble } from '../../pages';
import { InmuebleCard, InmuebleCardGrid } from '../search';
import TuneRoundedIcon from '@mui/icons-material/TuneRounded';
import GridSquared from '@mui/icons-material/WindowRounded';
import GridRectangle from '@mui/icons-material/ViewStreamRounded';

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
            <Box sx={{ width: "100%", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", mb: 2, pl: 2, pr: 2, pt: 1, pb: 1 }}>
                <Box>
                    <Typography variant="h6" fontWeight="bold" sx={{ whiteSpace: "nowrap" }}>Inmuebles encontrados</Typography>
                </Box>
                <Box>
                    <IconButton aria-label="">
                        <TuneRoundedIcon />
                    </IconButton>
                    <IconButton aria-label="" onClick={toggleSquare}>
                        {squared ? (<GridSquared />) : (<GridRectangle />)}
                    </IconButton>
                </Box>
            </Box>
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
