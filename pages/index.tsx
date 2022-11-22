import { useContext, useState, Suspense, useEffect } from 'react';

import { GetServerSideProps, NextPage } from 'next';
import dynamic from "next/dynamic";

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { useTheme, Typography } from '@mui/material';
import { CustomImage } from '../components/images/CustomImage';
import Layout from '../components/ui/Layout';
import { AuthContext } from '../context/authcontext';
import { deleteCookie, validarToken, validateSession } from '../utils/functions';
import { UserData } from '../interfaces/user-type';

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

const description: string = "Gran variedad de inmuebles | Comprar, alquilar y vender apartamentos, casas, townhouses, terrenos y más ¡en Consolitex lo encuentras!";

export interface ValidatedUser {
  logged: boolean;
  user: UserData;
}

interface Props {
  inmueblesRecomendados: Inmueble[] | null;
  validatedUser: ValidatedUser;
}

const HomePage: NextPage<Props> = ({ inmueblesRecomendados, validatedUser }) => {
  const InmuebleList = dynamic(import('../components/inmuebles/inmueblelist/InmuebleList').then((mod) => mod.InmuebleList));
  const MenuBusquedaMobile = dynamic(import('../components/index').then((mod) => mod.MenuBusquedaMobile));
  const MenuBusquedaPc = dynamic(import('../components/index').then((mod) => mod.MenuBusquedaPc));

  const userData = useContext(AuthContext)
  // Inmuebles a mostrar
  const [inmuebles, setInmuebles] = useState<Inmueble[] | null>(inmueblesRecomendados);

  // Props de los menus
  const theme = useTheme();

  useEffect(() => {
    validateSession(userData, validatedUser);
  }, [])

  return (
    <Layout title="Buscar Inmueble" description={description} transparent={true}>
      <Box sx={{ width: "100%", position: "absolute", top: 0, left: 0, zIndex: "1" }}>

        {/* Wallpaper */}
        <Box sx={{ minHeight: { xs: "100vh", sm: "500px" }, maxHeight: { xs: "auto", sm: "500px" }, overflow: "hidden", background: "url(./wallpaper.webp)", backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundAttachment: "scroll" }}></Box>

        {/* Menu de busqueda en vista de PC */}
        <Suspense fallback="Cargando...">
          <MenuBusquedaPc />
        </Suspense>
        {/* Menu de busqueda en vista de mobile */}
        <Suspense fallback="Cargando...">
          <MenuBusquedaMobile />
        </Suspense>
      </Box>

      {/* Espacio en blanco de la imagen */}
      <Box sx={{ minHeight: { xs: "100vh", sm: "450px", zIndex: "-10" } }}></Box>


      <Box sx={{ width: { xs: "100%", md: "100%" }, m: "auto", overflow: "hidden", background: "#FFF", mt: { xs: -7, md: -4 }, p: 5, display: "flex", flexFlow: "row wrap", justifyContent: "center", alignItems: "center" }} component="div">

        {/* Inmuebles recomendados */}
        <CustomImage src={`/house.webp`} alt="que hacemos - consolitex" upperBoxStyles={{ width: { xs: 400, md: 600 } }} />
        <Box sx={{ textAlign: "left", p: 2, margin: "auto", width: 600, display: "flex", flexFlow: "column wrap" }}>

          <Typography variant="overline" color="primary" fontWeight="bold" fontSize={{ xs: 12, md: 16 }}>
            Somos tu mejor opción{validatedUser.logged && `, ${validatedUser.user.nombres}`}
          </Typography>
          <Typography variant="subtitle1" sx={{ fontFamily: "Oxygen" }} fontWeight="bold" fontSize={{ xs: 20, md: 32 }}>
            Más de 40 años en el mercado inmobiliario
          </Typography>
          <Typography variant="subtitle2" sx={{ fontFamily: "Oxygen", textAlign: "justify" }} fontSize={{ xs: 12, md: 16 }}>
            Consolitex te da la mejor asesoría en el estado Carabobo ¡Encontraremos el inmueble perfecto para ti!
          </Typography>
        </Box>
      </Box>
      {/* Recomendados */}
      <Box sx={{ width: "100%", background: "white", position: "relative", p: { xs: 0, md: 4 }, paddingBlock: 10, minHeight: "100%" }}>
        <CustomImage src="/3dshapes2.webp" alt="Shapes" upperBoxStyles={{ position: "absolute", top: 0, left: 0, width: "100%", minHeight: { xs: "100vh", md: "auto" }, objectFit: "cover" }} />
        <Box sx={{ width: { xs: "100%", md: "90%" }, m: "auto", overflow: "hidden", paddingBlock: 6, background: { xs: "rgba(0,0,0,0)", md: "rgba(255,255,255,0.5)" }, boxShadow: { xs: "none", md: "0 8px 32px 0 rgba(0,0,0,0.3)" }, backdropFilter: "blur(8px)", borderRadius: { xs: 0, md: 5 } }} component="div">

          {/* Inmuebles recomendados */}
          {
            inmuebles !== null && (
              <Suspense fallback="Cargando...">
                <InmuebleList inmuebles={inmuebles} />
              </Suspense>
            )
          }
        </Box>
      </Box>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {

  const user = await validarToken(ctx);
  try {
    // Solicitud HTTP
    const respuesta = await fetch("https://consolitex.org/api/v1/inmuebles.php?localidad=Norte");

    // Resultado
    const data = await respuesta.json();

    // Array vacio de inmuebles
    const newInmuebles = [];

    // Longitud del resultado 
    const length = Object.keys(data).length;
    console.log(user)
    /**
     * El resultado es un objeto con mas objetos, por lo tanto la idea es meter los resultados en un array para poder hacer un map luego.
     */
    for (let i = 0; i < Number(length); i++) {
      data[i] && newInmuebles.push(data[i]);
    }

    return {
      props: {
        inmueblesRecomendados: newInmuebles,
        validatedUser: {
          logged: true,
          user
        }
      }
    }

  } catch (err) {
    return {
      props: {
        inmueblesRecomendados: null,
        validatedUser: {
          logged: false,
          user
        }
      }
    }
  }
}

export default HomePage;