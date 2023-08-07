import { Box, Typography, Select, SelectChangeEvent, MenuItem, TextField, Button, IconButton, Chip } from "@mui/material"
import LeftIcon from "@mui/icons-material/ChevronLeft"
import RightIcon from "@mui/icons-material/ChevronRight"
import { ChangeEvent, FC, FormEvent, MutableRefObject, useEffect, useRef, useState } from "react"
import { MenuProps } from "../../interfaces/menu-types"
import { useRouter } from "next/router"

export const MenuBusquedaMobile: FC = () => {
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
    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
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
    return (<>
        <Box sx={styles.mainContainer}>
            <Typography component="h2" variant="h5" fontWeight="bold" sx={{ color: "#FFF", textShadow: "0 0 20px rgba(0,0,0,0.9)", mb: 4, fontFamily: "Hind" }}>Encuentra tu inmueble</Typography>
            <Box sx={styles.contenedorBotonera}>
                <IconButton
                    size="small"
                    onClick={() => handleScrollLeft(refBotonera as unknown as MutableRefObject<HTMLElement>)}
                    id="scroll-left"
                    sx={styles.buttonLeft}
                >
                    <LeftIcon sx={{ fontSize: 12 }} />
                </IconButton>
                <IconButton
                    size="small"
                    onClick={() => handleScrollRight(refBotonera as unknown as MutableRefObject<HTMLElement>)}
                    id="scroll-right"
                    sx={styles.buttonRight}
                >
                    <RightIcon sx={{ fontSize: 12 }} />
                </IconButton>
                <Box sx={{ position: "relative", overflowY: "hidden", }}>

                    <Box id="button-banner" ref={refBotonera} sx={styles.botonera}>
                        <Button sx={styles.buttonLocalidad} variant="text" onClick={() => handleFilter("Valencia")}>Valencia</Button>
                        <Button sx={styles.buttonLocalidad} variant="text" onClick={() => handleFilter("San Diego")}>San Diego</Button>
                        <Button sx={styles.buttonLocalidad} variant="text" onClick={() => handleFilter("Naguanagua")}>Naguanagua</Button>
                        <Button sx={styles.buttonLocalidad} variant="text" onClick={() => handleFilter("Guacara")}>Guacara</Button>
                        <Button sx={styles.buttonLocalidad} variant="text" onClick={() => handleFilter("Safari")}>Safari</Button>
                        <Button sx={styles.buttonLocalidad} variant="text" onClick={() => handleFilter("San Joaquin")}>San Joaquin</Button>
                        <Button sx={styles.buttonLocalidad} variant="text" onClick={() => handleFilter("Tocuyito")}>Tocuyito</Button>
                        <Button sx={styles.buttonLocalidad} variant="text" onClick={() => handleFilter("Zona Industrial")}>Zona Industrial</Button>
                    </Box>
                </Box>
                <form onSubmit={onSubmit}>
                    <TextField fullWidth onChange={handleChange} value={search} InputProps={{ disableUnderline: true, }} variant="standard" size="small" placeholder="Ingresa lo que buscas" color="primary" sx={styles.inputSearch} />
                </form>
            </Box>
            <Button sx={styles.buttonSend} variant="contained" onClick={onSubmit}>Buscar</Button>
            <Box sx={{ mt: 1 }}>
                {
                    (search || localidad) && (<Typography variant="subtitle2" sx={{ color: "common.white" }}>Filtro aplicados</Typography>)
                }

                {
                    search && (<Chip sx={{ background: "#FFF", mr: 1, mt: 1 }} onDelete={() => handleDelete('search')} label={search} />)
                }
                {
                    localidad && (<Chip sx={{ background: "#FFF", mr: 1, mt: 1 }} onDelete={() => handleDelete('localidad')} label={localidad} />)
                }
            </Box>
        </Box>
    </>
    )
}
const styles = {
    mainContainer: {
        alignItems: "center",
        background: "rgba( 255,255,255, 0.2 )",
        borderRadius: "15px",
        backdropFilter: "blur(6px)",
        boxShadow: "0 8px 32px 0 rgba( 100, 100, 100, 0.4 )",
        display: {
            md: "none",
            xs: "flex",
        },
        flexDirection: "column",
        justifyContent: "center",
        left: "50%",
        m: "auto",
        minHeight: "150px",
        padding: 2,
        position: "absolute",
        top: "60%",
        transform: "translateX(-50%) translateY(-50%)",
        width: "90%",
        zIndex: '9'
    },
    contenedorBotonera: {
        display: "flex",
        flexDirection: "column",
        position: "relative",
        width: "100%",
        "&:hover > #scroll-left": {
            display: "flex",
        },
        "&:hover > #scroll-right": {
            display: "flex",
        },
    },
    buttonLeft: {
        background: "rgba(100,100,100,0.3)",
        display: "none",
        height: "20px",
        left: 0,
        position: "absolute",
        top: 7,
        width: "20px",
        zIndex: 90,
        "&:hover": {
            background: "white",
            color: "black"
        }
    },
    buttonRight: {
        background: "rgba(100,100,100,0.3)",
        display: "none",
        height: "20px",
        position: "absolute",
        right: 0,
        top: 7,
        width: "20px",
        zIndex: 90,
        "&:hover": {
            background: "white",
            color: "black"
        }
    },
    botonera: {
        alignItems: "center",
        background: "rgba(255,255,255,0.5)",
        borderRadius: "1.3em 1.3em 0 0",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        overflowX: "scroll",
        pl: 1,
        pr: 2,
        width: "100%",
        "&::-webkit-scrollbar": {
            height: 0,
            width: 0
        },
    },
    buttonLocalidad: {
        minWidth: 130,
        whiteSpace: "nowrap",
        width: "100%",
        fontWeight: "bold"
    },
    inputSearch: {
        input: {
            fontFamily: "Hind",
            background: "rgba(255,255,255,0.5)",
            border: "none",
            borderRadius: "0 0 1.5em 1.5em",
            p: 2
        },
        border: "none"
    },
    buttonSend: {
        borderRadius: "10em",
        boxShadow: "0",
        fontFamily: "Hind",
        mt: 2,
        p: 2,
        textTransform: "none",
        width: "100%",
    }
}