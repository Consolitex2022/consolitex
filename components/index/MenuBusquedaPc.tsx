import { FC, MutableRefObject, useState, useRef, ChangeEvent } from "react"
import { Box, Typography, Select, SelectChangeEvent, MenuItem, TextField, Button, IconButton, Chip } from "@mui/material"
import { MenuProps } from "../../interfaces/menu-types"
import InfoIcon from "@mui/icons-material/HelpOutlineRounded"
import LeftIcon from "@mui/icons-material/ChevronLeft"
import RightIcon from "@mui/icons-material/ChevronRight"
import { useRouter } from "next/router"
export const MenuBusquedaPc: FC = () => {
    const refBotonera = useRef(null);
    const router = useRouter();
    const [open, setOpen] = useState<boolean>(false);
    const [search, setSearch] = useState<string>('');
    const [localidad, setLocalidad] = useState<string>('');

    /**
     * Funcion para hacer scroll a la izquierda de la barra de localidad
     * @param ref Referencia del elemento a scrollear
     */
    const handleScrollLeft = (ref: MutableRefObject<HTMLElement>) => {
        if (!ref.current) {
            return false;
        } else {
            const scrollLeft = Number(ref.current.scrollLeft);
            const newScroll = scrollLeft - 100;
            const scrollOptions: ScrollToOptions = {
                top: 0,
                left: newScroll,
                behavior: 'smooth'
            };
            ref.current.scroll(scrollOptions)

        }
    }
    const openInfo = () => {
        setOpen(true);
    }
    /**
     * Funcion para hacer scroll a la derecha de la barra de localidad
     * @param ref Referencia del elemento a scrollear
     */
    const handleScrollRight = (ref: MutableRefObject<HTMLElement>) => {
        if (!ref.current) {
            return false;
        } else {
            const scrollLeft = Number(ref.current.scrollLeft);
            const newScroll = scrollLeft + 100;
            const scrollOptions: ScrollToOptions = {
                top: 0,
                left: newScroll,
                behavior: 'smooth'
            };
            ref.current.scroll(scrollOptions)
        }
    }

    /**
     * Funcion para seleccionar una localidad al pulsar el boton correspondiente
     * @param route localidad
     */
    const handleFilter = (route: string) => {
        setLocalidad(route);
        router.push({
            pathname: "/search",
            query: {
                localidad: route,
                query: search,
            }
        })
    }

    /**
     * Funcion para cambiar el valor del input de busqueda
     * @param e Evento del input
     */
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(String(e.target.value));
    }

    /**
     * Funcion para aplicar los filtros
     */
    const onSubmit = () => {
        router.push({
            pathname: "/search",
            query: {
                localidad,
                query: search
            }
        });
    }

    /**
     * Funcion para remover un filtro al clickear la X de un chip
     * @param tipo Chip a remover
     */
    const handleDelete = (tipo: string) => {
        tipo === 'localidad' && setLocalidad('');
        tipo === 'search' && setSearch('');
    }
    return (
        <Box sx={styles.mainContainer}>
            <Box sx={{ width: "100%", display: "flex", flexFlow: "row nowrap", justifyContent: "center", alignItems: "center", mb: 3 }}>
                <Typography component="h5" variant="h5" fontWeight="bold" sx={{ color: "#FFF", textShadow: "0 0 20px rgba(0,0,0,0.9)", fontFamily: "Hind" }}>Encuentra tu inmueble</Typography>
                <IconButton color="info" onClick={openInfo}><InfoIcon /></IconButton>
            </Box>
            <Box sx={styles.contenedorBotonera}>
                <IconButton
                    size="small"
                    id="scroll-left"
                    onClick={() => handleScrollLeft(refBotonera as unknown as MutableRefObject<HTMLElement>)}
                    sx={styles.botonLeft}
                >
                    <LeftIcon sx={{ fontSize: 12 }} />
                </IconButton>
                <IconButton
                    size="small"
                    id="scroll-right"
                    onClick={() => handleScrollRight(refBotonera as unknown as MutableRefObject<HTMLElement>)}
                    sx={styles.botonRight}
                >
                    <RightIcon sx={{ fontSize: 12 }} />
                </IconButton>
                <Box sx={{ position: "relative", overflowY: "hidden", }}>
                    <Box id="button-banner" ref={refBotonera} sx={styles.botonera}>
                        <Button sx={styles.botonLocalidad} variant="text" onClick={() => handleFilter("Norte")}>Norte</Button>
                        <Button sx={styles.botonLocalidad} variant="text" onClick={() => handleFilter("Noreste")}>Noreste</Button>
                        <Button sx={styles.botonLocalidad} variant="text" onClick={() => handleFilter("Noroeste")}>Noroeste</Button>
                        <Button sx={styles.botonLocalidad} variant="text" onClick={() => handleFilter("Sur")}>Sur</Button>
                        <Button sx={styles.botonLocalidad} variant="text" onClick={() => handleFilter("San Diego")}>San Diego</Button>
                        <Button sx={styles.botonLocalidad} variant="text" onClick={() => handleFilter("Naguanagua")}>Naguanagua</Button>
                        <Button sx={styles.botonLocalidad} variant="text" onClick={() => handleFilter("Guacara")}>Guacara</Button>
                        <Button sx={styles.botonLocalidad} variant="text" onClick={() => handleFilter("San Joaquin")}>San Joaquin</Button>
                        <Button sx={styles.botonLocalidad} variant="text" onClick={() => handleFilter("Tocuyito")}>Tocuyito</Button>
                        <Button sx={styles.botonLocalidad} variant="text" onClick={() => handleFilter("Zona Industrial")}>Zona Industrial</Button>
                    </Box>
                    <Box sx={styles.contenedorSend}>
                        <TextField fullWidth value={search} onChange={handleChange} InputProps={{ disableUnderline: true }} id="input-with-sx" variant="standard" placeholder="Ingresa lo que buscas" color="warning" focused sx={styles.inputBuscar} />
                        <Button variant="contained" color="primary" sx={styles.botonBuscar} onClick={onSubmit}>Buscar</Button>
                    </Box>
                    <Box sx={{ mt: 1 }}>
                        {
                            (search || localidad) && (<Typography variant="subtitle2" sx={{ color: "common.white" }}>Filtro aplicados</Typography>)
                        }

                        {
                            search && (<Chip sx={{ background: "#FFF", mr: 1 }} onDelete={() => handleDelete('search')} label={search} />)
                        }
                        {
                            localidad && (<Chip sx={{ background: "#FFF", mr: 1 }} onDelete={() => handleDelete('localidad')} label={localidad} />)
                        }
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

const styles = {
    mainContainer: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translateX(-50%) translateY(-50%)",
        borderRadius: "25px",
        pt: 6,
        pb: 6,
        pr: 4,
        pl: 4,
        width: "80%",
        display: {
            xs: "none",
            md: "flex"
        },
        alignItems: "center",
        justifyContent: "center",
        background: "rgba( 255,255,255, 0.2 )",
        boxShadow: "0 8px 32px 0 rgba( 100, 100, 100, 0.4 )",
        backdropFilter: "blur(6px)",
        flexDirection: "column"
    },
    contenedorBotonera: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        "&:hover > #scroll-left": {
            display: "flex",
        },
        "&:hover > #scroll-right": {
            display: "flex",

        },
    },
    botonera: {
        display: "flex",
        flexDirection: "row",
        overflowX: "scroll",
        background: "rgba(255,255,255,0.8)",
        borderRadius: "1.3em 1.3em 0 0",
        pt: 1,
        pb: 1,
        pl: 1,
        pr: 2,
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        "&::-webkit-scrollbar": {
            height: 0,
            width: 0
        },
    },
    botonLeft: {
        display: "none",
        background: "rgba(0,0,0,0.1)",
        width: "20px",
        height: "20px",
        position: "absolute",
        top: 15,
        left: 0,
        zIndex: 90,
        "&:hover": {
            background: "white",
            color: "black"
        }
    },
    botonRight: {
        display: "none",
        background: "rgba(0,0,0,0.1)",
        width: "20px",
        height: "20px",
        position: "absolute",
        top: 15,
        right: 0,
        zIndex: 90,
        "&:hover": {
            background: "white",
            color: "black"
        }
    },
    botonLocalidad: {
        width: "100%",
        whiteSpace: "nowrap",
        minWidth: 130,
        fontWeight: "bold",
        "&:hover": {
            color: "gold"
        }
    },
    botonBuscar: {
        width: "45%",
        p: "15px",
        borderRadius: "0 0 1.7em 0",
        textTransform: 'none',
        boxShadow: "none",
        fontFamily: "Hind",
        "&:hover": {
            background: "gold",
            boxShadow: "none"
        }
    },
    inputBuscar: {
        input: { fontFamily: "Hind", padding: 2, color: 'black', background: "rgba(255,255,255,0.8)", borderRadius: "0 0 0 1.5em" }
    },
    contenedorSend: {
        display: 'flex',
        alignItems: 'flex-end',
        width: "100%",
        m: 0
    },

}