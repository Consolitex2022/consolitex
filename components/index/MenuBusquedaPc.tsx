import { FC, MutableRefObject, useEffect, useRef } from "react"
import { Box, Typography, Select, SelectChangeEvent, MenuItem, TextField, Button, IconButton } from "@mui/material"
import { MenuProps } from "../../interfaces/menu-types"
import LeftIcon from "@mui/icons-material/ChevronLeft"
import RightIcon from "@mui/icons-material/ChevronRight"
import { useRouter } from "next/router"
export const MenuBusquedaPc: FC<MenuProps> = ({ search, handleChange, handleChangeSelect, tipo, negocio, localidad, onSubmit }) => {
    const refBotonera = useRef(null);
    const router = useRouter();
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

    const handleFilter = (route: string) => {
        router.push({
            pathname: "/search",
            query: {
                localidad: route
            }
        });
    }
    return (
        <Box sx={styles.mainContainer}>
            <Typography component="h5" variant="h5" fontWeight="bold" sx={{ fontFamily: "Hind", color: "white", mb: 4 }}>Encuentra tu inmueble</Typography>
            <Box sx={styles.contenedorBotonera}>

                {/* <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "flex-start", m: "-1px 0", width: "80%", }}>
                <Select
                    value={String(negocio)}
                    onChange={(e: SelectChangeEvent) => handleChangeSelect(e, "Negocio")}
                    disableUnderline
                    defaultValue="0"
                    MenuProps={{ disableScrollLock: true }}
                    sx={{
                        pb: 1.2, pt: 1.2, color: 'black', background: negocio !== "0" ? "white" : "#F3F7F8", transition: ".3s ease all", border: "0", outline: "0", boxShadow: "none", borderRadius: "1.5em 0 0 0", width: "34%", textAlign: "center", fontFamily: "Hind",
                        "&:hover": {
                            background: "white"
                        },
                        "&:hover ~ #espacio ": {
                            background: "white"
                        }
                    }}
                    variant="standard"
                >
                    <MenuItem value={"0"} disabled selected>Negocio</MenuItem>
                    <MenuItem value={"Venta"}>Venta</MenuItem>
                    <MenuItem value={"Alquiler"}>Alquiler</MenuItem>
                </Select>
                <Box component="div" id="espacio" sx={{ width: "2.3%", background: (negocio !== "0" && tipo !== "0") ? "white" : "#F3F7F8", transition: ".3s ease all", height: "60px", padding: "10px 0px 10px 10px", display: "flex", alignItems: "center", justifyContent: "end", m: "0 -1px " }}>
                    <Box sx={{ width: "2px", background: "rgba(72,69,64,0.9)", height: "100%", p: "0.6px" }}>
                    </Box>
                </Box>
                <Select
                    value={String(tipo)}
                    defaultValue="0"
                    MenuProps={{ disableScrollLock: true }}
                    onChange={(e: SelectChangeEvent) => handleChangeSelect(e, "Tipo")}
                    disableUnderline
                    sx={{
                        pb: 1.2, pt: 1.2, color: 'black', background: tipo !== "0" ? "white" : "#F3F7F8", transition: ".3s ease all", border: "0", outline: "0", boxShadow: "none", width: "34%", textAlign: "center", fontFamily: "Hind",
                        "&:hover": {
                            background: "white"
                        }

                    }}
                    variant="standard"
                >
                    <MenuItem value={"0"} disabled selected>Tipo de inmuble</MenuItem>
                    <MenuItem value={"Apartamento"}>Apartamento</MenuItem>
                    <MenuItem value={"Quinta"}>Quinta</MenuItem>
                    <MenuItem value={"Townhouse"}>Townhouse</MenuItem>
                    <MenuItem value={"Apartoquinta"}>Apartoquinta</MenuItem>
                    <MenuItem value={"Local Comercial"}>Local Comercial</MenuItem>
                    <MenuItem value={"Galpon"}>Galpon</MenuItem>
                    <MenuItem value={"Terreno"}>Terreno</MenuItem>
                </Select>
                <Box component="div" id="espacio" sx={{ width: "2.3%", background: (tipo !== "0" && localidad !== "0") ? "white" : "#F3F7F8", transition: ".3s ease all", height: "60px", padding: "10px 0px 10px 10px", display: "flex", alignItems: "center", justifyContent: "end", m: "0 -1px " }}>
                    <Box sx={{ width: "2px", background: "rgba(72,69,64,0.9)", height: "100%", p: "0.6px" }}>
                    </Box>
                </Box>
                <Select
                    value={String(localidad)}
                    defaultValue="0"
                    MenuProps={{ disableScrollLock: true }}
                    onChange={(e: SelectChangeEvent) => handleChangeSelect(e, "Localidad")}
                    disableUnderline
                    sx={{
                        pb: 1.2, pt: 1.2, color: 'black', background: localidad !== "0" ? "white" : "#F3F7F8", transition: ".3s ease all", borderRadius: "0 1.5em 0 0", border: "0", outline: "0", boxShadow: "none", width: "34%", textAlign: "center", fontFamily: "Hind",
                        "&:hover": {
                            background: "white"
                        }

                    }}
                    variant="standard"
                >
                    <MenuItem value={"0"} disabled selected>Localidad</MenuItem>
                    <MenuItem value={"Norte"}>Norte</MenuItem>
                    <MenuItem value={"Noreste"}>Noreste</MenuItem>
                    <MenuItem value={"Noroeste"}>Noroeste</MenuItem>
                    <MenuItem value={"Sur"}>Sur</MenuItem>
                    <MenuItem value={"San Diego"}>San Diego</MenuItem>
                    <MenuItem value={"Naguanagua"}>Naguanagua</MenuItem>
                    <MenuItem value={"Guacara"}>Guacara</MenuItem>
                    <MenuItem value={"San Joaquin"}>San Joaquin</MenuItem>
                    <MenuItem value={"Tocuyito"}>Tocuyito</MenuItem>
                    <MenuItem value={"Zona Industrial"}>Zona Industrial</MenuItem>
                </Select>
            </Box> */}
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
                        <TextField fullWidth value={search} onChange={handleChange} InputProps={{ disableUnderline: true }} id="input-with-sx" variant="standard" placeholder="Ingresa la ubicación del inmueble" color="warning" focused sx={styles.inputBuscar} />
                        <Button variant="contained" color="primary" sx={styles.botonBuscar} onClick={onSubmit}>Buscar</Button>
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
        background: "rgba( 30,30,30, 0.6 )",
        boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
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
        background: "white",
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
        border: "1px solid rgba(0,0,0,0.3)",
        background: "white",
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
        border: "1px solid rgba(0,0,0,0.3)",
        background: "white",
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
    },
    botonBuscar: {
        width: "45%",
        p: "15px",
        borderRadius: "0 0 1.7em 0",
        textTransform: 'none',
        boxShadow: "none",
        fontFamily: "Hind"
    },
    inputBuscar: {
        input: { fontFamily: "Hind", padding: 2, color: 'black', background: "white", borderRadius: "0 0 0 1.5em" }
    },
    contenedorSend: {
        display: 'flex',
        alignItems: 'flex-end',
        width: "100%",
        m: 0
    },

}