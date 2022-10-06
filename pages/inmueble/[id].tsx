import { Box, Grid } from '@mui/material';

import { GetServerSideProps, NextPage } from 'next'

import { Layout } from '../../components/ui/Layout';
import { ucfirst } from '../../utils/functions';
import { CustomImage } from '../../components/images/CustomImage';

import { Caracteristicas, Detalles, Informacion, ZonasComunes } from '../../components/inmuebles/sections';
import { Header } from '../../components/inmuebles/sections/Header';
import { Recomendados, Compartir, EnviarMensaje } from '../../components/inmuebles/sections/aside';

interface Props {
    data: any;
    zonasComunes: any;
    caracteristicas: any;
    imagenes: any;
    url_inmueble: any;
    related: any;
}
const InmueblePage: NextPage<Props> = ({ data, imagenes, url_inmueble, related, zonasComunes, caracteristicas }) => {
    const headerProps = { imagenes, url_inmueble, data }
    return (
        <Layout title={ucfirst(`${data.inmueble.toLowerCase()} en ${ucfirst(data.urbanizacion.toLowerCase())} (${ucfirst(data.negocio.toLowerCase())})`)} description={data.descripcion_web}>

            {/* Seccion superior con modal de imagenes */}
            <Header {...headerProps} />

            {/* Seccion principal*/}
            <Grid container display="flex" flexDirection="row" alignItems="flex-start" justifyContent="space-evenly" columnSpacing={{ xs: 0, md: 1 }} rowSpacing={1} sx={{ width: "100%", p: { xs: 0, md: 1 } }}>

                {/* Seccion de Informacion del inmueble */}
                <Grid item xs={12} sm={12} md={8} >
                    <Informacion data={data} />
                    <Detalles data={data} />
                    <Caracteristicas caracteristicas={caracteristicas} />
                    <ZonasComunes zonasComunes={zonasComunes} />
                    <Box sx={{ width: "100%" }}>
                        <CustomImage upperBoxStyles={{ borderRadius: 5, overflow: "hidden" }} src="/banner4.webp" alt="banner inferior" />
                    </Box>
                </Grid>

                {/* Seccion lateral/inferior */}
                <Grid item xs={12} md={4}>
                    <Grid container display="flex" sx={{ width: "100%" }} spacing={1} >
                        <Grid item xs={6} md={12}>
                            <Compartir />
                        </Grid>
                        <Grid item xs={6} md={12}>
                            <Recomendados related={related} />
                        </Grid>
                        <Grid item xs={12}>
                            <EnviarMensaje />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Layout >
    )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { id } = ctx.query;
    if (id === "shape4.png" || id === "shape2.png") {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            }
        }
    }
    try {
        const url = `${process.env.BASE_URL}/inmueble/newBusqueda?id=${id}`
        const respuesta = await fetch(url);
        const data = await respuesta.json();
        const urlRelated = `${process.env.BASE_URL}/inmuebles.php?query=${data.data.municipio}`
        const respuestaRelated = await fetch(urlRelated);
        const dataRelated = await respuestaRelated.json();
        const urlZonas = `${process.env.BASE_URL}/inmueble/zonascomunes?id=${id}`
        const respuestaZonas = await fetch(urlZonas);
        const dataZonas = await respuestaZonas.json();
        const urlCaracteristicas = `${process.env.BASE_URL}/inmueble/caracteristicas?id=${id}`
        const respuestaCarac = await fetch(urlCaracteristicas);
        const dataCarac = await respuestaCarac.json();

        const newImagenes = [
            data.imagenes && data.imagenes.hasOwnProperty('fachada') ? data.imagenes.fachada.map((arr: any) => arr) : '',
            data.imagenes && data.imagenes.hasOwnProperty('sala') ? data.imagenes.sala.map((arr: any) => arr) : '',
            data.imagenes && data.imagenes.hasOwnProperty('banos') ? data.imagenes.banos.map((arr: any) => arr) : '',
            data.imagenes && data.imagenes.hasOwnProperty('habitacion') ? data.imagenes.habitacion.map((arr: any) => arr) : '',
            data.imagenes && data.imagenes.hasOwnProperty('areascomunes') ? data.imagenes.areascomunes.map((arr: any) => arr) : '',
            data.imagenes && data.imagenes.hasOwnProperty('cocina') ? data.imagenes.cocina.map((arr: any) => arr) : '',
        ]
        let related = [];
        let keys = Object.keys(dataRelated);

        for (let i = 0, len = keys.length; i < len; i++) {
            if (dataRelated[keys[i]].hasOwnProperty('data')) {
                related.push(dataRelated[keys[i]]);
            }
        }

        return {
            props: {
                data: data.data,
                zonasComunes: dataZonas,
                caracteristicas: dataCarac,
                url_inmueble: data.url_inmueble,
                imagenes: newImagenes,
                related
            }
        }
    } catch (error) {
        console.log(error);
        return {
            redirect: {
                destination: "/",
                permanent: false,
            }
        }
    }
}

export default InmueblePage;
