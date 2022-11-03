import { Box, IconButton, Typography, Tooltip, Button, TextField, Chip } from "@mui/material";
import { useRouter } from "next/router";
import { ChangeEvent, Dispatch, FC, FormEvent, SetStateAction, useState } from "react";


import GridSquared from '@mui/icons-material/WindowRounded';
import GridRectangle from '@mui/icons-material/ViewStreamRounded';
import LeftIcon from '@mui/icons-material/ArrowBackRounded';
import Swal from "sweetalert2";
import { IFilter } from "../../interfaces";
import ManageSearchRounded from "@mui/icons-material/ManageSearchRounded";
import { ModalFiltros } from "./ModalFitros";


interface PropsMenuSuperior {
    squared: boolean;
    toggleSquare: () => void;
    filters: IFilter;
    initialFilter: IFilter;
    inmueblesState: any;

    setFilters: Dispatch<SetStateAction<any>>;
    setInmueblesState: Dispatch<SetStateAction<any>>;
    setLastItemKey: Dispatch<SetStateAction<number>>;
    setHasMore: Dispatch<SetStateAction<boolean>>;
    fetchData: () => Promise<void>;
}


export const SeccionSuperior: FC<PropsMenuSuperior> = ({ initialFilter, squared, toggleSquare, filters, setFilters, setInmueblesState, setLastItemKey, setHasMore, fetchData, inmueblesState }) => {


    // Enrutador
    const router = useRouter();
    const [search, setSearch] = useState<boolean>(false)
    const [newQuery, setNewQuery] = useState<string>('');
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


    const propsModal = { filters, setFilters, setInmueblesState, inmueblesState, setLastItemKey, setHasMore, fetchData }
    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (newQuery === '') return false;
        const params = [];
        const newTo = Number(filters.to.toString().replace(/[^0-9]/g, ''))
        const newFrom = Number(filters.to.toString().replace(/[^0-9]/g, ''))
        if (filters.tipo && filters.tipo !== '0') {
            params.push(['tipo', String(filters.tipo)])
        }
        if (filters.negocio && filters.negocio !== '0') {
            params.push(['negocio', String(filters.negocio)])
        }
        if (filters.habitaciones && filters.habitaciones !== '0') {
            params.push(['habitaciones', String(filters.habitaciones)])
        }
        if (filters.banos && filters.banos !== '0') {
            params.push(['banos', String(filters.banos)])
        }
        if (filters.estacionamientos && filters.estacionamientos !== '0') {
            params.push(['estacionamientos', String(filters.estacionamientos)])
        }
        if (filters.localidad && filters.localidad !== '0') {
            params.push(['localidad', String(filters.localidad)])
        }
        if (filters.from && newFrom !== 0) {
            params.push(['from', String(newFrom)])
        }
        if (filters.to && newTo !== 0) {
            params.push(['to', String(newTo)])
        }
        params.push(['query', String(newQuery)])
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
                    setFilters({
                        ...filters,
                        query: newQuery,
                        filterAnterior: filters,
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

    return (
        <>

            <Box sx={styles.stickyBar}>


                <Box sx={{ display: { xs: 'none', md: "flex" }, flexDirection: "row", alignItems: "center", flexGrow: 1, width: "100%" }}>

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
                        {filters.tipo && (<Chip color="primary" onDelete={() => onDelete("tipo")} variant="outlined" sx={styles.chip} label={`${filters.tipo}`} />)}
                    </Box>
                </Box>
                {/* Boton de buscar */}
                <Box sx={{ display: search ? "flex" : "none", flexFlow: "row nowrap", transition: "0.5s ease all", flexGrow: 1, transform: search ? "scale(1)" : "scale(0)", mt: 1 }}>
                    <form onSubmit={onSubmit}>
                        <TextField placeholder="Realiza una búsqueda" size="small" onChange={(e: ChangeEvent<HTMLInputElement>) => setNewQuery(String(e.target.value))} value={newQuery} sx={{ "& input": { borderRadius: 10, borderTopRightRadius: 0, borderBottomRightRadius: 0, background: "#FFF" }, "& fieldset": { border: "none" } }} />
                        <Button variant="contained" sx={{ p: 1, borderRadius: 0, borderTopRightRadius: 25, borderBottomRightRadius: 25, textTransform: "none" }} disableElevation type="submit">Buscar</Button>
                    </form>
                </Box>
                <Box sx={{ display: "flex", flexFlow: "row nowrap", justifyContent: "end", flexGrow: 1 }}>

                    <IconButton aria-label="" onClick={() => setSearch(prev => !prev)}>
                        <Tooltip title="Buscar">
                            <ManageSearchRounded />
                        </Tooltip>
                    </IconButton>
                    {/* Boton de vaciar filtros */}
                    <ModalFiltros {...propsModal} />


                    {/* Boton de vista de inmuebles */}
                    <IconButton aria-label="" onClick={toggleSquare}>
                        {squared ? (<GridSquared />) : (<GridRectangle />)}
                    </IconButton>
                </Box>
            </Box>
        </>
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
        backdropFilter: "blur(4px)",
        backgroundImage: `linear-gradient(90deg, rgba(250,250,250,0.6) 0%, rgba(245,245,245,0.8) 100%)`,
    },
    chip: {
        mr: 1,
        mt: 1,
    }
}