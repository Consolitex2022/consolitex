import { Box, IconButton, Typography, Tooltip, Button, TextField } from "@mui/material";
import { useRouter } from "next/router";
import { Dispatch, FC, SetStateAction, useState } from "react";
import { ModalFiltros } from "./ModalFitros";
import TuneRoundedIcon from '@mui/icons-material/TuneRounded';
import GridSquared from '@mui/icons-material/WindowRounded';
import GridRectangle from '@mui/icons-material/ViewStreamRounded';
import LeftIcon from '@mui/icons-material/ArrowBackRounded';
interface PropsMenuSuperior {
    squared: boolean;
    toggleSquare: () => void;
    setOpen: Dispatch<SetStateAction<boolean>>;
}

export const SeccionSuperior: FC<PropsMenuSuperior> = ({ squared, toggleSquare, setOpen }) => {

    // Enrutador
    const router = useRouter();

    /**
     * Funcion para habir el modal de filtros
     */
    const handleOpen = () => {
        setOpen(true)
    }

    return (
        <Box sx={styles.stickyBar}>

            <Box sx={{ display: { xs: 'none', md: "flex" }, flexDirection: "row", alignItems: "center", flexGrow: 1 }}>

                {/* Boton de volver */}
                <IconButton onClick={() => router.push("/")}>
                    <LeftIcon />
                </IconButton>

                {/* Titulo */}
                <Typography variant="h6" fontWeight="bold" sx={{ whiteSpace: "nowrap" }}>Inmuebles encontrados</Typography>
            </Box>
            <Box sx={{ flexGrow: 1, display: "flex", flexFlow: "row nowrap" }}>

                {/* Boton de volver */}
                <IconButton sx={{ display: { xs: 'block', md: 'none' } }} onClick={() => router.push("/")}>
                    <LeftIcon />
                </IconButton>
                <Box sx={{ display: "flex", flexFlow: "row nowrap", flexGrow: 1 }}>

                    <TextField size="small" fullWidth color="primary" sx={{ "& fieldset": { borderRadius: " 25px 0 0 25px" } }} />
                    <Button size="small" color="primary" sx={{ textTransform: "none", p: 0, height: 40, borderRadius: "0 25px 25px 0" }} disableElevation variant="contained">Buscar</Button>
                </Box>
            </Box>
            <Box sx={{ display: "flex", flexFlow: "row nowrap", justifyContent: "end", flexGrow: 1 }}>
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
        background: "#F5F5F5"
    }
}