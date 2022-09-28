import { Box, IconButton, Typography, Tooltip } from "@mui/material";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import { ModalFiltros } from "./ModalFitros";
import TuneRoundedIcon from '@mui/icons-material/TuneRounded';
import GridSquared from '@mui/icons-material/WindowRounded';
import GridRectangle from '@mui/icons-material/ViewStreamRounded';
import LeftIcon from '@mui/icons-material/ArrowBackRounded';
interface PropsMenuSuperior {
    squared: boolean;
    toggleSquare: () => void;
}

export const SeccionSuperior: FC<PropsMenuSuperior> = ({ squared, toggleSquare }) => {
    const router = useRouter();

    const [open, setOpen] = useState<boolean>(false);
    const [habitaciones, setHabitaciones] = useState<string>('0')
    const [banos, setBanos] = useState<string>('0')
    const [estacionamientos, setEstacionamientos] = useState<string>('0')
    const handleOpen = () => {
        setOpen(true)
    }

    const props = { open, setOpen, habitaciones, setHabitaciones, banos, setBanos, estacionamientos, setEstacionamientos }
    return (
        <Box sx={styles.stickyBar}>
            <ModalFiltros {...props} />
            <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                <IconButton onClick={() => router.push("/")}>
                    <LeftIcon />
                </IconButton>

                <Typography variant="h6" fontWeight="bold" sx={{ whiteSpace: "nowrap" }}>Inmuebles encontrados</Typography>
            </Box>
            <Box>
                <IconButton aria-label="" onClick={handleOpen}>
                    <Tooltip title="Filtros">
                        <TuneRoundedIcon />
                    </Tooltip>
                </IconButton>
                <IconButton aria-label="" onClick={toggleSquare}>
                    {squared ? (<GridSquared />) : (<GridRectangle />)}
                </IconButton>
            </Box>
        </Box>
    )
}

const styles = {
    stickyBar: {
        width: "100%",
        display: "flex",
        flexFlow: "row wrap",
        justifyContent: "space-between",
        alignItems: "center",
        marginBlock: 1,
        paddingInline: 2,
        paddingBlock: 1,
        position: "sticky",
        top: -1,
        left: 0,
        zIndex: 90,
        background: "white"
    }
}
