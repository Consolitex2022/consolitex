import React from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircleRounded from '@mui/icons-material/CircleRounded';

interface Props {
    title: string;
    mts?: boolean;
    children?: React.ReactNode;
}
export const CaracteristicaComponent: React.FC<Props> = ({ title, children, mts = false }) => {

    return (
        <Box sx={{ display: "flex", flexFlow: "row", alignItems: "center" }}>
            <CircleRounded sx={{ fontSize: 12, mr: 2 }} color="primary" />
            <Typography variant="subtitle1" color="text.primary" fontWeight="bold" sx={{ mr: 1, fontSize: 16 }}>{title}</Typography>
            {mts ? (<Typography variant="subtitle2" color="text.secondary" fontWeight="bold" sx={{ fontSize: 16 }}>{children} m<sup>2</sup></Typography>) : (<Typography variant="subtitle2" color="text.secondary" fontWeight="bold">{children}</Typography>)}
        </Box>)
}
