import { Dispatch, SetStateAction, FC, ChangeEvent, useState } from "react";

import Dialog from "@mui/material/Dialog";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

import ClearAllIcon from '@mui/icons-material/ClearAll';
import RestartAllIcon from '@mui/icons-material/RestartAlt';
import TuneRoundedIcon from '@mui/icons-material/TuneRounded';
import SaveIcon from '@mui/icons-material/ManageSearchRounded';
import CloseIcon from '@mui/icons-material/CloseRounded';

import { TogglerGroup } from ".";

import { IOption } from "../../interfaces/toggler-options-type";
import Swal from "sweetalert2";
import { IFilter } from "../../interfaces";
import { MenuItem, Select, SelectChangeEvent } from "@mui/material";

interface ModalFiltrosProps {
    filters: any;
    setFilters: Dispatch<SetStateAction<any>>;
    inmueblesState: any;
    setInmueblesState: Dispatch<SetStateAction<any>>;
    setLastItemKey: Dispatch<SetStateAction<number>>;
    setHasMore: Dispatch<SetStateAction<boolean>>;
    fetchData: () => Promise<void>;
}
const tiposDeInmueble: string[] = [
    "Apartamento",
    "Apartoquinta",
    "Quinta",
    "Townhouse",
    "Local Comercial",
    "Galpon",
    "Terreno"
]
const options: IOption[] = [
    {
        value: '1',
        name: "1",
    },
    {
        value: '2',
        name: "2",
    },
    {
        value: '3',
        name: "3",
    },
    {
        value: '4',
        name: "4+",
    },
]
const optionsLocalidad: IOption[] = [
    {
        value: 'Norte',
        name: "Norte",
    },
    {
        value: 'Sur',
        name: "Sur",
    },
    {
        value: 'Este',
        name: "Este",
    },
    {
        value: 'Oeste',
        name: "Oeste",
    },
]
const optionsNegocio: IOption[] = [
    {
        value: 'Venta',
        name: "Venta",
    },
    {
        value: 'Alquiler',
        name: "Alquiler",
    },
]

export const ModalFiltros: FC<ModalFiltrosProps> = ({ filters, setFilters, setLastItemKey, setHasMore, inmueblesState, setInmueblesState, fetchData }) => {

    const [from, setFrom] = useState<number | string>(0);
    const [to, setTo] = useState<number | string>(0);
    const [open, setOpen] = useState<boolean>(false);
    const handleClose = () => {
        setOpen(false);
    }
    const formatoMexico = (number: number) => {
        const exp = /(\d)(?=(\d{3})+(?!\d))/g;
        const rep = '$1,';
        let arr = number.toString().split('.');
        arr[0] = arr[0].replace(exp, rep);
        return arr[1] ? arr.join('.') : arr[0];
    }


    /**
     * Funcion para cambiar el valor del state de from y to (min / max)
     * @param e Event handler HTMLInput
     */
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const onlyNums = e.target.value.replace(/[^0-9]/g, '');
        e.target.name === 'from' && setFrom(formatoMexico(Number(onlyNums)))
        e.target.name === 'to' && setTo(formatoMexico(Number(onlyNums)));
    }

    /**
     * Funcion para asignar el valor de tipo de inmueble a los filtros
     * @param e Evento de cambio del select
     */
    const handleChangeSelect = (e: SelectChangeEvent) => {
        setFilters({
            ...filters,
            filterAnterior: filters,
            tipo: e.target.value
        })
    }

    /**
     * Funcion para habir el modal de filtros
     */
    const handleOpen = () => {
        setOpen(true)
    }

    /**
     * Funcion para aplicar los cambios de los filtros y realizar la busqueda de inmuebles
     */
    const onApply = async () => {
        const newFrom = Number(from.toString().replace(/[^0-9]/g, ''));
        const newTo = Number(to.toString().replace(/[^0-9]/g, ''));
        const newFilter: IFilter = {
            to: newTo,
            from: newFrom,
            tipo: filters.tipo,
            banos: filters.banos,
            query: filters.query,
            negocio: filters.negocio,
            localidad: filters.localidad,
            habitaciones: filters.habitaciones,
            estacionamientos: filters.estacionamientos,
            filterAnterior: Number(to) === 0 && Number(from) === 0 ? filters.filterAnterior : filters,
        }
        const params = [];
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
        if (newFrom && newFrom !== 0) {
            params.push(['from', String(newFrom)])
        }
        if (newTo && newTo !== 0) {
            params.push(['to', String(newTo)])
        }
        if (filters.query && filters.query !== '0') {
            params.push(['query', String(filters.query)])
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
                    setFilters(newFilter)
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
                    setInmueblesState(null);
                    setLastItemKey(0);
                    setOpen(false);
                    setHasMore(false);
                    break;
                default:
                    Swal.fire({
                        title: "Oops!",
                        text: "No se encontraron resultados",
                        icon: "error"
                    })
                    setInmueblesState(null);
                    setLastItemKey(0);
                    setOpen(false);
                    setHasMore(false);
                    break;
            }

        } catch (err) {
            console.log(err);
            Swal.fire({
                title: "Oops!",
                text: "No se encontraron resultados",
                icon: "error"
            })
            setInmueblesState(null);
            setLastItemKey(0);
            setOpen(false);
            setHasMore(false);
        }
    }
    /**
   * Funcion para detectar si los filtros tienen datos o no
   * @returns true si los filtros están vacios, false si no.
   */
    const areFiltersEmpty = () => {
        const newFrom = Number(filters.from.toString().replace(/[^0-9]/g, ''));
        const newTo = Number(filters.to.toString().replace(/[^0-9]/g, ''));
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
        if (filters.from && newFrom !== 0) {
            return false;
        }
        if (filters.to && newTo !== 0) {
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
            const newFrom = Number(filters.filterAnterior?.from.toString().replace(/[^0-9]/g, ''));
            const newTo = Number(filters.filterAnterior?.to.toString().replace(/[^0-9]/g, ''));
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
            if (filters.filterAnterior?.from && Number(filters.filterAnterior?.from.toString().replace(/[^0-9]/g, '')) !== 0) {
                params.push(['from', String(newFrom)])
            }
            if (filters.filterAnterior?.to && Number(filters.filterAnterior?.to.toString().replace(/[^0-9]/g, '')) !== 0) {
                params.push(['to', String(newTo)])
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
        <>
            {/* Boton de filtros */}
            {/* <IconButton aria-label="" onClick={handleOpen}>
                <Tooltip title="Filtros avanzados">
                    <TuneRoundedIcon />
                    </Tooltip>
                </IconButton> */}
            <Button onClick={handleOpen} endIcon={<TuneRoundedIcon />} sx={{ borderRadius: 5, color: "text.secondary", textTransform: "none" }}>
                Filtros Avanzados
            </Button>
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

            <Dialog open={open} onClose={handleClose} maxWidth={"sm"} fullWidth PaperProps={{
                style: { borderRadius: 16, padding: 8 }
            }}>
                <Grid container display="flex" justifyContent="center" alignItems="center" spacing={1} sx={{ p: 2, position: "relative" }}>
                    <IconButton sx={{ position: "absolute", top: 5, right: 0 }} size="small" onClick={() => setOpen(false)}>
                        <CloseIcon />
                    </IconButton>
                    <Grid item xs={12} sx={{ textAlign: "left" }}>
                        <Typography variant="overline">Habitaciones</Typography>

                        <Box sx={{ display: "flex", flexDirection: "row", width: "100%", margin: "auto" }}>
                            <TogglerGroup fetchData={fetchData} stateToggler={filters} filterName={"habitaciones"} setStateToggler={setFilters} optionsToggler={options} />
                        </Box>
                    </Grid>
                    <Grid item xs={12} sx={{ textAlign: "left" }}>
                        <Typography variant="overline">Baños</Typography>

                        <Box sx={{ display: "flex", flexDirection: "row", width: "100%", margin: "auto" }}>
                            <TogglerGroup fetchData={fetchData} stateToggler={filters} filterName={"banos"} setStateToggler={setFilters} optionsToggler={options} />
                        </Box>
                    </Grid>
                    <Grid item xs={12} sx={{ textAlign: "left" }}>
                        <Typography variant="overline">Estacionamientos</Typography>

                        <Box sx={{ display: "flex", flexDirection: "row", width: "100%", margin: "auto" }}>
                            <TogglerGroup fetchData={fetchData} stateToggler={filters} filterName={"estacionamientos"} setStateToggler={setFilters} optionsToggler={options} />
                        </Box>
                    </Grid>
                    <Grid item xs={12} sx={{ textAlign: "left" }}>
                        <Typography variant="overline">Negocio</Typography>

                        <Box sx={{ display: "flex", flexDirection: "row", width: "100%", margin: "auto" }}>
                            <TogglerGroup fetchData={fetchData} stateToggler={filters} filterName={"negocio"} setStateToggler={setFilters} optionsToggler={optionsNegocio} />
                        </Box>
                    </Grid>
                    <Grid item xs={12} sx={{ textAlign: "left" }}>
                        <Typography variant="overline">Localidad</Typography>

                        <Box sx={{ display: "flex", flexDirection: "row", width: "100%", margin: "auto" }}>
                            <TogglerGroup fetchData={fetchData} stateToggler={filters} filterName={"localidad"} setStateToggler={setFilters} optionsToggler={optionsLocalidad} />
                        </Box>
                    </Grid>
                    <Grid item xs={12} sx={{ textAlign: "left" }}>
                        <Typography variant="overline">Tipo de inmueble</Typography>
                        <Select size="small" fullWidth sx={{ borderRadius: 10 }} onChange={handleChangeSelect} name="tipo" value={filters.tipo ? filters.tipo : "0"} defaultValue={"0"}>
                            <MenuItem value={"0"} disabled>Tipo de inmueble</MenuItem>
                            {
                                tiposDeInmueble.map((t: string) => (<MenuItem key={t} value={t}>{t}</MenuItem>))
                            }
                        </Select>
                    </Grid>
                    <Grid item xs={12} sx={{ textAlign: "left" }}>
                        <Typography variant="overline">Rango de precio</Typography>
                        <Box sx={{ display: "flex", flexDirection: "row", width: "100%", margin: "auto" }}>
                            <TextField fullWidth name="from" value={from} onChange={handleChange} size="small" label="Min" color="primary" variant="outlined" sx={styles.inputRounded} />
                            <TextField fullWidth name="to" value={to} error={Number(from.toString().replace(/[^0-9]/g, '')) > Number(to.toString().replace(/[^0-9]/g, ''))} helperText={Number(from.toString().replace(/[^0-9]/g, '')) > Number(to.toString().replace(/[^0-9]/g, '')) ? "El valor de Max. debe ser mayor del Min." : ''} onChange={handleChange} size="small" label="Max" color="primary" variant="outlined" sx={{ ...styles.inputRounded, ml: 1 }} />
                        </Box>
                    </Grid>
                    <Grid item xs={12} sx={{ textAlign: "left" }}>
                        <Button fullWidth size="small" onClick={onApply} color="primary" variant="contained" disableElevation sx={{ borderRadius: 8, p: 1.5, mt: 2 }}>Aplicar filtros &nbsp;<SaveIcon sx={{ fontWeight: 100 }} /></Button>
                    </Grid>

                </Grid>
            </Dialog>
        </>
    )
}

const styles = {
    inputRounded: {
        '& fieldset': {
            borderRadius: '30px',
        },
    },
}