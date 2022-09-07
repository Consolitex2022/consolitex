import { Box, TextField, Typography, Button, MenuItem, Select, SelectChangeEvent, CircularProgress, } from '@mui/material';
import { ChangeEvent, FC, useEffect, useState } from 'react';
import { InmuebleList } from '../components/inmuebles';
import { Layout } from '../components/ui/Layout';
import { NextPage } from 'next';

interface MenuProps {
  search: string;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleChangeSelect: (e: SelectChangeEvent, tipo: string) => void;
  tipo: string;
  negocio: string;
}

export type InmuebleData = {
  Estado: string;
  HASH: string;
  banos: string;
  descripcion_web: string;
  destacado: string;
  estacionamiento: string;
  fecha_mod: string;
  ficha_id: string;
  ficha_id0: string;
  habitaciones: string;
  inmueble: string;
  key: string;
  mts2: string;
  mtst: string;
  municipio: string;
  negocio: string;
  nombre: string;
  parroquia: string;
  planta: string;
  pozo: string;
  promo: string;
  ref: string;
  tags: string;
  urbanizacion: string;
  zona: string;
  zona_num: string;
}
export type Inmueble = {
  count: boolean;
  data: InmuebleData;
  imagenes: string[];
  url_inmueble: string;
}

const MenuBusquedaPc: FC<MenuProps> = ({ search, handleChange, handleChangeSelect, tipo, negocio }) => {
  return (
    <Box sx={{
      position: "absolute", top: "50%", left: "50%", transform: "translateX(-50%) translateY(-50%)", borderRadius: "25px", pt: 6, pb: 6, pr: 4, pl: 4, width: "80%", display: { xs: "none", md: "flex" }, alignItems: "center", justifyContent: "center",
      background: "rgba( 30,30,30, 0.6 )",
      boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
      flexDirection: "column"
    }}>
      <Typography component="h5" variant="h5" fontWeight="bold" sx={{ fontFamily: "Hind", color: "white", mb: 4 }}>Encuentra tu inmueble</Typography>

      <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "flex-start", m: "-1px 0", width: "80%", }}>
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
            pb: 1.2, pt: 1.2, color: 'black', background: tipo !== "0" ? "white" : "#F3F7F8", transition: ".3s ease all", borderRadius: "0 1.5em 0 0", border: "0", outline: "0", boxShadow: "none", width: "34%", textAlign: "center", fontFamily: "Hind",
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
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'flex-end', width: "80%", m: 0 }}>
        <TextField fullWidth value={search} onChange={handleChange} InputProps={{ disableUnderline: true }} id="input-with-sx" variant="standard" placeholder="Ingresa la ubicación del inmueble" color="warning" focused sx={{ input: { fontFamily: "Hind", padding: 2, color: 'black', background: "white", borderRadius: "0 0 0 1.5em" } }} />
        <Button variant="contained" color="primary" sx={{ width: "40.5%", p: "15px", borderRadius: "0 1000em 1000em 0", textTransform: 'none', boxShadow: "none", fontFamily: "Hind" }}>Buscar</Button>
      </Box>
    </Box>
  )
}

const MenuBusquedaMobile: FC<MenuProps> = ({ search, handleChange, handleChangeSelect, tipo, negocio }) => {
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
            onChange={(e: SelectChangeEvent) => handleChangeSelect(e, "Tipo")}
            disableUnderline
            sx={{
              pb: 1.2, pt: 1.2, color: 'black', background: tipo !== "0" ? "white" : "#F3F7F8", transition: ".3s ease all", borderRadius: "0 1.5em 0 0", border: "none", boxShadow: "none", width: "48.5%", textAlign: "center", fontFamily: "Hind",
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
        </Box>
        <TextField fullWidth onChange={handleChange} value={search} InputProps={{ disableUnderline: true, }} variant="standard" size="small" placeholder="Ingresa la ubicación del inmueble" color="primary" sx={{ input: { fontFamily: "Hind", background: "white", border: "none", borderRadius: "0 0 1.5em 1.5em", p: 2 }, border: "none" }} />
      </Box>
      <Button sx={{ fontFamily: "Hind", textTransform: "none", boxShadow: "0", borderRadius: "10em", p: 2, width: "100%", mt: 2 }} variant="contained">Buscar</Button>
    </Box>
  </>
  )
}

const description: string = "Gran variedad de inmuebles | Comprar, alquilar y vender apartamentos, casas, townhouses, terrenos y más ¡en Consolitex lo encuentras!";

const HomePage: NextPage = () => {

  // Valor del input
  const [search, setSearch] = useState<string>("");

  // Tipo de negocio
  const [negocio, setNegocio] = useState<string>("0");

  // Tipo de inmueble
  const [tipo, setTipo] = useState<string>("0");

  // Inmuebles a mostrar
  const [inmuebles, setInmuebles] = useState<Inmueble[] | null>(null);

  // Control del spinner
  const [isFetching, setIsFetching] = useState<boolean>(true);

  // Efecto para ejecutar la busqueda de inmuebles
  useEffect(() => {
    firstFetch();
  }, [])

  /**
   * Funcion para buscar los primeros 20 inmuebles
   */
  const firstFetch = async () => {
    try {
      const respuesta = await fetch("https://consolitex.org/api/v1/inmuebles.php");
      const data = await respuesta.json();
      const newInmuebles = [];
      const length = Object.keys(data).length
      for (let i = 0; i < Number(length); i++) {
        data[i] && newInmuebles.push(data[i]);
      }
      console.log(newInmuebles);
      setInmuebles(newInmuebles);
      setIsFetching(false);
    } catch (err) {
      console.log(err);
      setInmuebles(null);
      setIsFetching(false);
    }
  }
  /**
   * Funcion que se encarga de asignar el valor del input en el state
   * @param e Event
   */
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(String(e.currentTarget.value));
  }

  /**
   * Funcion que se encarga de asignar el valor del select en el state correspondiente
   * @param e Event
   * @param tipo Tipo de select
   */
  const handleChangeSelect = (e: SelectChangeEvent, tipo: string) => {
    tipo === "Negocio"
      ? setNegocio(String(e.target.value)) : setTipo(String(e.target.value))
  }
  // Props de los menus
  const props = { search, handleChange, handleChangeSelect, tipo, negocio };
  return (<>
    <Layout title="Buscar Inmueble" description={description} transparent={true}>
      <Box sx={{ width: "100%", position: "absolute", top: 0, left: 0, zIndex: "1" }}>
        <Box sx={{ minHeight: { xs: "100vh", sm: "500px" }, maxHeight: { xs: "auto", sm: "500px" }, overflow: "hidden", background: "url(./compressed_wallpaper.jpg)", backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundAttachment: "scroll" }}>
        </Box>
        <MenuBusquedaPc {...props} />
        <MenuBusquedaMobile {...props} />
      </Box>
      <Box sx={{ minHeight: { xs: "100vh", sm: "450px", zIndex: "-10" } }}>

      </Box>
      <Box sx={{ width: { xs: "100%", md: "80%" }, m: "auto", p: { xs: 1, md: 5 }, mt: 4, }} component="div">
        <Typography variant="body1" fontWeight={"bold"} component="h3" fontSize={24}>Recomendados para tí</Typography>
        {search}
        {
          isFetching && (
            <Box sx={{ w: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <CircularProgress />
            </Box>
          )
        }

        {
          inmuebles !== null && (<InmuebleList inmuebles={inmuebles} />)
        }
      </Box>
      {/* </Box> */}
    </Layout>
  </>
  )
}

export default HomePage;