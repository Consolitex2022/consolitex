import { Box, Typography, Select, SelectChangeEvent, MenuItem, TextField, Button } from "@mui/material"
import { FC } from "react"
import { MenuProps } from "../../interfaces/menu-types"

export const MenuBusquedaMobile: FC<MenuProps> = ({ search, handleChange, handleChangeSelect, tipo, negocio, localidad, onSubmit }) => {
    return (<>
        <Box sx={{
            width: "90%", minHeight: "150px", position: "absolute", top: "40%", left: "50%", transform: "translateX(-50%) translateY(-50%)", borderRadius: "15px", m: "auto", display: { xs: "flex", md: "none" }, alignItems: "center", justifyContent: "center", flexDirection: "column", padding: 2,
            background: "rgba( 30,30,30, 0.6 )",
            boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
        }}>
            <Typography component="h2" variant="h5" fontWeight="bold" sx={{ color: "white", mb: 4, fontFamily: "Hind" }}>Encuentra tu inmueble</Typography>
            <Box sx={{ width: "100%", display: "flex", flexDirection: "column", }}>
                <Box sx={{ display: "flex", flexDirection: "row", overflow: "hidden", m: "-2px 0" }}>
                    <Select
                        labelId="demo-simple-select-label"
                        value={String(negocio)}
                        onChange={(e: SelectChangeEvent) => handleChangeSelect(e, "Negocio")}
                        disableUnderline
                        defaultValue="0"
                        MenuProps={{ disableScrollLock: true }}
                        sx={{
                            pb: 1.2, pt: 1.2, color: 'black', background: negocio !== "0" ? "white" : "#F3F7F8", transition: ".3s ease all", border: "none", boxShadow: "none", borderRadius: "1.5em 0 0 0", width: "48%", textAlign: "center", fontFamily: "Hind",
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
                    <Box component="div" id="espacio" sx={{ width: "4%", background: (negocio !== "0" && tipo !== "0") ? "white" : "#F3F7F8", transition: ".3s ease all", height: "55px", padding: "10px 0px 10px 10px", display: "flex", alignItems: "center", justifyContent: "end", m: "0 -1px" }}>
                        <Box sx={{ width: "2px", background: "rgba(72,69,64,0.9)", height: "100%", p: "0.6px" }}>
                        </Box>
                    </Box>
                    <Select
                        labelId="demo-simple-select-label"
                        value={String(tipo)}
                        defaultValue="0"
                        MenuProps={{ disableScrollLock: true }}
                        onChange={(e: SelectChangeEvent) => handleChangeSelect(e, "Tipo")}
                        disableUnderline
                        sx={{
                            pb: 1.2, pt: 1.2, color: 'black', background: negocio !== "0" ? "white" : "#F3F7F8", transition: ".3s ease all", border: "none", boxShadow: "none", width: "48%", textAlign: "center", fontFamily: "Hind",
                            "&:hover": {
                                background: "white"
                            },
                            "&:hover ~ #espacio ": {
                                background: "white"
                            }
                        }}
                        variant="standard"
                    >
                        <MenuItem value={"0"} disabled selected>Tipo de inmueble</MenuItem>
                        <MenuItem value={"Apartamento"}>Apartamento</MenuItem>
                        <MenuItem value={"Quinta"}>Quinta</MenuItem>
                        <MenuItem value={"Townhouse"}>Townhouse</MenuItem>
                        <MenuItem value={"Apartoquinta"}>Apartoquinta</MenuItem>
                        <MenuItem value={"Local Comercial"}>Local Comercial</MenuItem>
                        <MenuItem value={"Galpon"}>Galpon</MenuItem>
                        <MenuItem value={"Terreno"}>Terreno</MenuItem>
                    </Select>
                    <Box component="div" id="espacio" sx={{ width: "4%", background: (localidad !== "0" && tipo !== "0") ? "white" : "#F3F7F8", transition: ".3s ease all", height: "55px", padding: "10px 0px 10px 10px", display: "flex", alignItems: "center", justifyContent: "end", m: "0 -1px" }}>
                        <Box sx={{ width: "2px", background: "rgba(72,69,64,0.9)", height: "100%", p: "0.6px" }}>
                        </Box>
                    </Box>
                    <Select
                        labelId="demo-simple-select-label"
                        value={String(localidad)}
                        defaultValue="0"
                        MenuProps={{ disableScrollLock: true }}
                        onChange={(e: SelectChangeEvent) => handleChangeSelect(e, "Localidad")}
                        disableUnderline
                        sx={{
                            pb: 1.2, pt: 1.2, color: 'black', background: localidad !== "0" ? "white" : "#F3F7F8", transition: ".3s ease all", borderRadius: "0 1.5em 0 0", border: "none", boxShadow: "none", width: "48.5%", textAlign: "center", fontFamily: "Hind",
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
                </Box>
                <TextField fullWidth onChange={handleChange} value={search} InputProps={{ disableUnderline: true, }} variant="standard" size="small" placeholder="Ingresa la ubicación del inmueble" color="primary" sx={{ input: { fontFamily: "Hind", background: "white", border: "none", borderRadius: "0 0 1.5em 1.5em", p: 2 }, border: "none" }} />
            </Box>
            <Button sx={{ fontFamily: "Hind", textTransform: "none", boxShadow: "0", borderRadius: "10em", p: 2, width: "100%", mt: 2 }} variant="contained" onClick={onSubmit}>Buscar</Button>
        </Box>
    </>
    )
}