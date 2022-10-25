import { Box, IconButton, Typography, Tooltip, Button, TextField, Chip } from "@mui/material";
import { useRouter } from "next/router";
import { Dispatch, FC, SetStateAction, useState } from "react";
import { ModalFiltros } from "./ModalFitros";
import TuneRoundedIcon from '@mui/icons-material/TuneRounded';
import GridSquared from '@mui/icons-material/WindowRounded';
import GridRectangle from '@mui/icons-material/ViewStreamRounded';
import LeftIcon from '@mui/icons-material/ArrowBackRounded';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import RestartAllIcon from '@mui/icons-material/RestartAlt';
import Swal from "sweetalert2";
import { IFilter } from "../../interfaces";


interface PropsMenuSuperior {
    squared: boolean;
    toggleSquare: () => void;
    setOpen: Dispatch<SetStateAction<boolean>>;
    filters: IFilter;
    initialFilter: IFilter;
    setFilters: Dispatch<SetStateAction<any>>;
    setInmueblesState: Dispatch<SetStateAction<any>>;
    setLastItemKey: Dispatch<SetStateAction<number>>;
    setHasMore: Dispatch<SetStateAction<boolean>>
}

export const SeccionSuperior: FC<PropsMenuSuperior> = ({ initialFilter, squared, toggleSquare, setOpen, filters, setFilters, setInmueblesState, setLastItemKey, setHasMore }) => {


    // Enrutador
    const router = useRouter();

    /**
     * Funcion para habir el modal de filtros
     */
    const handleOpen = () => {
        setOpen(true)
    }
    const onDelete = async (filterName: string) => {

        const params = [];

        if (filters.tipo && filters.tipo !== '0') {
            if (filterName !== "tipo") {
                params.push(['tipo', String(filters.tipo)])
            }
        }
        if (filters.negocio && filters.negocio !== '0') {
            if (filterName !== "negocio") {
                params.push(['negocio', String(filters.negocio)])
            }
        }
        if (filters.habitaciones && filters.habitaciones !== '0') {
            if (filterName !== "habitaciones") {
                params.push(['habitaciones', String(filters.habitaciones)])
            }
        }
        if (filters.banos && filters.banos !== '0') {
            if (filterName !== "banos") {
                params.push(['banos', String(filters.banos)])
            }
        }
        if (filters.estacionamientos && filters.estacionamientos !== '0') {
            if (filterName !== "estacionamientos") {
                params.push(['estacionamientos', String(filters.estacionamientos)])
            }
        }
        if (filters.localidad && filters.localidad !== '0') {
            if (filterName !== "localidad") {
                params.push(['localidad', String(filters.localidad)])
            }
        }
        if (filters.from && filters.from !== 0) {
            if (filterName !== "from") {
                params.push(['from', String(filters.from)])
            }
        }
        if (filters.to && filters.to !== 0) {
            if (filterName !== "to") {
                params.push(['to', String(filters.to)])
            }
        }
        if (filters.query && filters.query !== '0') {
            if (filterName !== "query") {
                params.push(['query', String(filters.query)])
            }
        }
        const url = new URL(`/api/filter`, window.location.origin);
        const urlParams = new URLSearchParams(params).toString();
        url.search = urlParams;

        try {
            const respuesta = await fetch(url);
            switch (respuesta.status) {
                case 200:
                    const data = await respuesta.json();

                    const inm = data.data;
                    const lastPosition = inm.length - 1;
                    const newLastItemKey = inm[lastPosition].data.key;
                    setInmueblesState(inm);
                    setLastItemKey(newLastItemKey);
                    setOpen(false);
                    setFilters({
                        ...filters,
                        filterAnterior: filters,
                        [filterName]: filterName === "to" || filterName === "from" ? 0 : '',
                    })
                    if (inm.length < 20) {
                        setHasMore(false);
                    } else {
                        setHasMore(true);
                    }
                    break;
                case 204:
                    Swal.fire({
                        title: "Oops!",
                        text: "No se encontraron resultados",
                        icon: "error"
                    })
                    setLastItemKey(0);
                    setInmueblesState(null);
                    setHasMore(false);
                    break;
                default:
                    Swal.fire({
                        title: "Oops!",
                        text: "No se encontraron resultados",
                        icon: "error"
                    })
                    setLastItemKey(0);
                    setInmueblesState(null);
                    setHasMore(false);
                    break;
            }
        } catch (err) {
            setLastItemKey(0);
            setInmueblesState(null);
            setHasMore(false);
        }
    }

    /**
     * Funcion para detectar si los filtros tienen datos o no
     * @returns true si los filtros están vacios, false si no.
     */
    const areFiltersEmpty = () => {
        if (filters.tipo && filters.tipo !== '0') {
            return false;
        }
        if (filters.negocio && filters.negocio !== '0') {
            return false;
        }
        if (filters.habitaciones && filters.habitaciones !== '0') {
            return false;
        }
        if (filters.banos && filters.banos !== '0') {
            return false;
        }
        if (filters.estacionamientos && filters.estacionamientos !== '0') {
            return false;
        }
        if (filters.localidad && filters.localidad !== '0') {
            return false;
        }
        if (filters.from && filters.from !== 0) {
            return false;
        }
        if (filters.to && filters.to !== 0) {
            return false;
        }
        if (filters.query && filters.query !== '0') {
            return false;
        }
        return true;
    }

    /**
     * Funcion para reestablecer los filtros a los primeros obtenidos al cargar la página
     */
    const resetFilters = async () => {
        if (!filters.filterAnterior) {
            return false;
        } else {
            setFilters(filters.filterAnterior);

            const params = [];

            if (filters.filterAnterior?.tipo && filters.filterAnterior?.tipo !== '0') {
                params.push(['tipo', String(filters.filterAnterior?.tipo)])
            }
            if (filters.filterAnterior?.negocio && filters.filterAnterior?.negocio !== '0') {
                params.push(['negocio', String(filters.filterAnterior?.negocio)])
            }
            if (filters.filterAnterior?.habitaciones && filters.filterAnterior?.habitaciones !== '0') {
                params.push(['habitaciones', String(filters.filterAnterior?.habitaciones)])
            }
            if (filters.filterAnterior?.banos && filters.filterAnterior?.banos !== '0') {
                params.push(['banos', String(filters.filterAnterior?.banos)])
            }
            if (filters.filterAnterior?.estacionamientos && filters.filterAnterior?.estacionamientos !== '0') {
                params.push(['estacionamientos', String(filters.filterAnterior?.estacionamientos)])
            }
            if (filters.filterAnterior?.localidad && filters.filterAnterior?.localidad !== '0') {
                params.push(['localidad', String(filters.filterAnterior?.localidad)])
            }
            if (filters.filterAnterior?.from && filters.filterAnterior?.from !== 0) {
                params.push(['from', String(filters.filterAnterior?.from)])
            }
            if (filters.filterAnterior?.to && filters.filterAnterior?.to !== 0) {
                params.push(['to', String(filters.filterAnterior?.to)])
            }
            if (filters.filterAnterior?.query && filters.filterAnterior?.query !== '0') {
                params.push(['query', String(filters.filterAnterior?.query)])
            }
            const url = new URL(`/api/filter`, window.location.origin);
            const urlParams = new URLSearchParams(params).toString();
            url.search = urlParams;
            try {
                const respuesta = await fetch(url);
                switch (respuesta.status) {
                    case 200:
                        const data = await respuesta.json();

                        const inm = data.data;
                        const lastPosition = inm.length - 1;
                        const newLastItemKey = inm[lastPosition].data.key;
                        setInmueblesState(inm);
                        setLastItemKey(newLastItemKey);
                        setOpen(false);
                        if (inm.length < 20) {
                            setHasMore(false);
                        } else {
                            setHasMore(true);
                        }
                        break;
                    case 204:
                        Swal.fire({
                            title: "Oops!",
                            text: "No se encontraron resultados",
                            icon: "error"
                        })
                        setLastItemKey(0);
                        setInmueblesState(null);
                        setHasMore(false);
                        break;
                    default:
                        Swal.fire({
                            title: "Oops!",
                            text: "No se encontraron resultados",
                            icon: "error"
                        })
                        setLastItemKey(0);
                        setInmueblesState(null);
                        setHasMore(false);
                        break;
                }
            } catch (err) {
                setLastItemKey(0);
                setInmueblesState(null);
                setHasMore(false);
            }
        }
    }

    /**
     * Funcion para limpiar los filtros
     */
    const clearFilters = async () => {
        setFilters({
            filterAnterior: filters,
            banos: '',
            habitaciones: '',
            estacionamientos: '',
            negocio: '',
            localidad: '',
            from: 0,
            to: 0,
            tipo: '',
            query: '',
        })
        const url = new URL(`/api/filter`, window.location.origin);

        try {

            const respuesta = await fetch(url);
            switch (respuesta.status) {
                case 200:
                    const data = await respuesta.json();

                    const inm = data.data;
                    const lastPosition = inm.length - 1;
                    const newLastItemKey = inm[lastPosition].data.key;
                    setInmueblesState(inm);
                    setLastItemKey(newLastItemKey);
                    setOpen(false);
                    if (inm.length < 20) {
                        setHasMore(false);
                    } else {
                        setHasMore(true);
                    }
                    break;
                case 204:
                    Swal.fire({
                        title: "Oops!",
                        text: "No se encontraron resultados",
                        icon: "error"
                    })
                    setLastItemKey(0);
                    setInmueblesState(null);
                    setHasMore(false);
                    break;
                default:
                    Swal.fire({
                        title: "Oops!",
                        text: "No se encontraron resultados",
                        icon: "error"
                    })
                    setLastItemKey(0);
                    setInmueblesState(null);
                    setHasMore(false);
                    break;
            }
        } catch (err) {
            setLastItemKey(0);
            setInmueblesState(null);
            setHasMore(false);
        }
    }
    return (
        <Box sx={styles.stickyBar}>

            <Box sx={{ display: { xs: 'none', md: "flex" }, flexDirection: "row", alignItems: "center", flexGrow: 1 }}>

                {/* Boton de volver */}
                <IconButton onClick={() => router.push("/")}>
                    <LeftIcon />
                </IconButton>

                {/* Titulo */}
                <Typography variant="h6" fontWeight="bold" sx={{ whiteSpace: "nowrap" }}>Búsqueda de inmuebles</Typography>
            </Box>
            <Box sx={{ flexGrow: 1, display: "flex", flexFlow: "row nowrap" }}>

                {/* Boton de volver */}
                <IconButton sx={{ display: { xs: 'block', md: 'none' } }} onClick={() => router.push("/")}>
                    <LeftIcon />
                </IconButton>
                <Box sx={{ display: "flex", flexFlow: "row wrap", flexGrow: 1 }}>

                    {/* <TextField size="small" fullWidth color="primary" sx={{ "& fieldset": { borderRadius: " 25px 0 0 25px" } }} /> */}
                    {/* <Button size="small" color="primary" sx={{ textTransform: "none", p: 0, height: 40, borderRadius: "0 25px 25px 0" }} disableElevation variant="contained">Buscar</Button> */}
                    {filters.banos && (<Chip color="primary" onDelete={() => onDelete("banos")} variant="outlined" sx={styles.chip} label={`${filters.banos} ${Number(filters.banos) !== 1 ? "Baños" : "Baño"}`} />)}
                    {filters.habitaciones && (<Chip color="primary" onDelete={() => onDelete("habitaciones")} variant="outlined" sx={styles.chip} label={`${filters.habitaciones} Hab.`} />)}
                    {filters.estacionamientos && (<Chip color="primary" onDelete={() => onDelete("estacionamientos")} variant="outlined" sx={styles.chip} label={`${filters.estacionamientos} Est.`} />)}
                    {filters.query && (<Chip color="primary" onDelete={() => onDelete("query")} variant="outlined" sx={styles.chip} label={`Busqueda: ${filters.query}`} />)}
                    {filters.from > 0 && (<Chip color="primary" onDelete={() => onDelete("from")} variant="outlined" sx={styles.chip} label={`Min. ${filters.from}`} />)}
                    {filters.to > 0 && (<Chip color="primary" onDelete={() => onDelete("to")} variant="outlined" sx={styles.chip} label={`Max. ${filters.to}`} />)}
                    {filters.negocio && (<Chip color="primary" onDelete={() => onDelete("negocio")} variant="outlined" sx={styles.chip} label={`${filters.negocio}`} />)}
                    {filters.localidad && (<Chip color="primary" onDelete={() => onDelete("localidad")} variant="outlined" sx={styles.chip} label={`${filters.localidad}`} />)}
                </Box>
            </Box>
            <Box sx={{ display: "flex", flexFlow: "row nowrap", justifyContent: "end", flexGrow: 1 }}>

                {/* Boton de vaciar filtros */}
                {
                    !areFiltersEmpty() && (
                        <IconButton aria-label="" onClick={clearFilters}>
                            <Tooltip title="Limpiar filtros">
                                <ClearAllIcon />
                            </Tooltip>
                        </IconButton>
                    )
                }

                {/* Boton de volver filtro anterior */}
                {
                    filters.filterAnterior && (
                        <IconButton aria-label="" onClick={resetFilters}>
                            <Tooltip title="Volver al filtro anterior">
                                <RestartAllIcon />
                            </Tooltip>
                        </IconButton>)
                }

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
    },
    chip: {
        mr: 1,
        mt: 1,
    }
}