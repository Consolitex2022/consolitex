import { Dispatch, SetStateAction, FC, ChangeEvent, useState } from "react";

import { Dialog, Grid, Typography, Box, TextField, Button, IconButton, Theme } from "@mui/material";

import SaveIcon from '@mui/icons-material/ManageSearchRounded';
import CloseIcon from '@mui/icons-material/CloseRounded';

import { TogglerGroup } from ".";

import { IOption } from "../../interfaces/toggler-options-type";

interface ModalFiltrosProps {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    filters: any;
    setFilters: Dispatch<SetStateAction<any>>;
}

const options: IOption[] = [
    {
        value: '0',
        name: "0",
    },
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

export const ModalFiltros: FC<ModalFiltrosProps> = ({ open, setOpen, filters, setFilters }) => {

    const [from, setFrom] = useState<number>(0);
    const [to, setTo] = useState<number>(0);

    const handleClose = () => {
        setOpen(false);
    }
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const onlyNums = e.target.value.replace(/[^0-9]/g, '');
        e.target.name === 'from' && setFrom(Number(onlyNums))
        e.target.name === 'to' && setTo(Number(onlyNums));

    }
    const onApply = () => {

    }
    return (
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
                        <TogglerGroup stateToggler={filters} filterName={"habitaciones"} setStateToggler={setFilters} optionsToggler={options} />
                    </Box>
                </Grid>
                <Grid item xs={12} sx={{ textAlign: "left" }}>
                    <Typography variant="overline">Baños</Typography>

                    <Box sx={{ display: "flex", flexDirection: "row", width: "100%", margin: "auto" }}>
                        <TogglerGroup stateToggler={filters} filterName={"banos"} setStateToggler={setFilters} optionsToggler={options} />
                    </Box>
                </Grid>
                <Grid item xs={12} sx={{ textAlign: "left" }}>
                    <Typography variant="overline">Estacionamientos</Typography>

                    <Box sx={{ display: "flex", flexDirection: "row", width: "100%", margin: "auto" }}>
                        <TogglerGroup stateToggler={filters} filterName={"estacionamientos"} setStateToggler={setFilters} optionsToggler={options} />
                    </Box>
                </Grid>
                <Grid item xs={12} sx={{ textAlign: "left" }}>
                    <Typography variant="overline">Negocio</Typography>

                    <Box sx={{ display: "flex", flexDirection: "row", width: "100%", margin: "auto" }}>
                        <TogglerGroup stateToggler={filters} filterName={"negocio"} setStateToggler={setFilters} optionsToggler={optionsNegocio} />
                    </Box>
                </Grid>
                <Grid item xs={12} sx={{ textAlign: "left" }}>
                    <Typography variant="overline">Localidad</Typography>

                    <Box sx={{ display: "flex", flexDirection: "row", width: "100%", margin: "auto" }}>
                        <TogglerGroup stateToggler={filters} filterName={"localidad"} setStateToggler={setFilters} optionsToggler={optionsLocalidad} />
                    </Box>
                </Grid>
                <Grid item xs={12} sx={{ textAlign: "left" }}>
                    <Typography variant="overline">Rango de precio</Typography>

                    <Box sx={{ display: "flex", flexDirection: "row", width: "100%", margin: "auto" }}>
                        <TextField fullWidth name="from" value={from} onChange={handleChange} size="small" label="Min" color="primary" variant="outlined" sx={styles.inputRounded} />
                        <TextField fullWidth name="to" value={to} error={from > to} helperText={from > to ? "El valor de Max. debe ser mayor del Min." : ''} onChange={handleChange} size="small" label="Max" color="primary" variant="outlined" sx={{ ...styles.inputRounded, ml: 1 }} />
                    </Box>
                </Grid>
                <Grid item xs={12} sx={{ textAlign: "left" }}>
                    <Button fullWidth size="small" color="primary" variant="contained" disableElevation sx={{ borderRadius: 8, p: 1.5, mt: 2 }}>Aplicar filtros &nbsp;<SaveIcon sx={{ fontWeight: 100 }} /></Button>
                </Grid>

            </Grid>
        </Dialog>
    )
}


const styles = {
    inputRounded: {
        '& label': { paddingLeft: (theme: Theme) => theme.spacing(2) },
        '& input': { paddingLeft: (theme: Theme) => theme.spacing(3.5) },
        '& fieldset': {
            paddingLeft: (theme: Theme) => theme.spacing(2.5),
            borderRadius: '30px',
        },
    },
}