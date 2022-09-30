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

    // Control modal de filtros
    const [open, setOpen] = useState<boolean>(false);

    // Cantidad de habitaciones a filtrar
    const [habitaciones, setHabitaciones] = useState<string | null>(null)

    // Cantidad de baños a filtrar
    const [banos, setBanos] = useState<string | null>(null)

    // Cantidad de estacionamientos a filtrar
    const [estacionamientos, setEstacionamientos] = useState<string | null>(null)

    // Localidad a filtrar
    const [localidad, setLocalidad] = useState<string | null>(null)

    // Tipo de negocio a filtrar
    const [negocio, setNegocio] = useState<string | null>(null)

    // Enrutador
    const router = useRouter();

    /**
     * Funcion para habir el modal de filtros
     */
    const handleOpen = () => {
        setOpen(true)
    }

    const props = { open, setOpen, habitaciones, setHabitaciones, banos, setBanos, estacionamientos, setEstacionamientos, negocio, setNegocio, localidad, setLocalidad }
    return (
        <Box sx={styles.stickyBar}>
            {/* Modal de filtros */}
            <ModalFiltros {...props} />

            <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>

                {/* Boton de volver */}
                <IconButton onClick={() => router.push("/")}>
                    <LeftIcon />
                </IconButton>

                {/* Titulo */}
                <Typography variant="h6" fontWeight="bold" sx={{ whiteSpace: "nowrap" }}>Inmuebles encontrados</Typography>
            </Box>
            <Box>
                {/* Boton de filtros */}
                <IconButton aria-label="" onClick={handleOpen}>
                    <Tooltip title="Filtros">
                        <TuneRoundedIcon />
                    </Tooltip>
                </IconButton>

                {/* Boton de vista de inmuebles */}
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
