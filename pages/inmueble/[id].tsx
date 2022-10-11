import { Suspense } from "react";
import dynamic from "next/dynamic";
import { GetServerSideProps, NextPage } from 'next'

import Layout from '../../components/ui/Layout';

import { Box, Grid } from '@mui/material';

import { ucfirst } from '../../utils/functions';
import { CustomImage } from '../../components/images/CustomImage';
import axios from "axios";
import { Header, Informacion, Detalles, Caracteristicas, ZonasComunes } from '../../components/inmuebles/sections';


interface Props {
    data: any;
    zonas_comunes: any;
    caracteristicas: any;
    imagenes: any;
    url_inmueble: any;
    related: any;
}
const InmueblePage: NextPage<Props> = ({ data, imagenes, url_inmueble, related, zonas_comunes, caracteristicas }) => {
    const ChateaConNosotros = dynamic(() => import('../../components/inmuebles/sections/aside').then((mod) => mod.ChateaConNosotros));
    const Compartir = dynamic(() => import('../../components/inmuebles/sections/aside').then((mod) => mod.Compartir));
    const EnviarMensaje = dynamic(() => import('../../components/inmuebles/sections/aside').then((mod) => mod.EnviarMensaje));
    const Recomendados = dynamic(() => import('../../components/inmuebles/sections/aside/recomendados/Recomendados').then((mod) => mod.Recomendados));

    const headerProps = { imagenes, url_inmueble, data }

    const title = ucfirst(`${data.inmueble.toLowerCase()} en ${ucfirst(data.urbanizacion.toLowerCase())} (${ucfirst(data.negocio.toLowerCase())})`)

    return (
        <Layout title={title} description={data.descripcion_web}>

            {/* Seccion superior con modal de imagenes */}
            <Header {...headerProps} />

            {/* Seccion principal*/}
            <Grid container display="flex" flexDirection="row" alignItems="flex-start" justifyContent="space-evenly" columnSpacing={{ xs: 0, md: 1 }} rowSpacing={1} sx={{ width: "100%", p: { xs: 0, md: 1 } }}>

                {/* Seccion de Informacion del inmueble */}
                <Grid item xs={12} sm={12} md={8} >
                    <Informacion data={data} />
                    <Detalles data={data} />
                    <Caracteristicas caracteristicas={caracteristicas} />
                    <ZonasComunes zonasComunes={zonas_comunes} />

                    <Suspense fallback="Cargando...">
                        <ChateaConNosotros data={data} userLogged={''} />
                    </Suspense>
                </Grid>

                {/* Seccion lateral/inferior */}
                <Grid item xs={12} md={4}>
                    <Grid container display="flex" sx={{ width: "100%" }} spacing={1} >
                        <Grid item xs={12} sm={6} md={12}>
                            <Suspense fallback="Cargando...">
                                <Compartir data={data} />
                            </Suspense>
                        </Grid>
                        <Grid item xs={12} sm={6} md={12}>
                            <Suspense fallback="Cargando...">
                                <Recomendados related={related} />
                            </Suspense>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12}>
                            <Suspense fallback="Cargando...">
                                <EnviarMensaje data={data} />
                            </Suspense>
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

    try {
        const url = `${process.env.BASE_URL}/inmueble/fulldata`
        const respuesta = await axios.get(url, {
            params: {
                id
            }
        })
        // const respuesta = await fetch(url);
        const data = await respuesta.data;
        const newImagenes = [
            data.imagenes && data.imagenes.hasOwnProperty('fachada') ? data.imagenes.fachada.map((arr: any) => arr) : '',
            data.imagenes && data.imagenes.hasOwnProperty('sala') ? data.imagenes.sala.map((arr: any) => arr) : '',
            data.imagenes && data.imagenes.hasOwnProperty('banos') ? data.imagenes.banos.map((arr: any) => arr) : '',
            data.imagenes && data.imagenes.hasOwnProperty('habitacion') ? data.imagenes.habitacion.map((arr: any) => arr) : '',
            data.imagenes && data.imagenes.hasOwnProperty('areascomunes') ? data.imagenes.areascomunes.map((arr: any) => arr) : '',
            data.imagenes && data.imagenes.hasOwnProperty('cocina') ? data.imagenes.cocina.map((arr: any) => arr) : '',
        ]
        return {
            props: {
                data: data.data,
                zonas_comunes: data.zonas_comunes,
                caracteristicas: data.caracteristicas,
                url_inmueble: data.url_inmueble,
                imagenes: newImagenes,
                related: data.related
            }
        }
    } catch (error) {
        console.log(error);
        return {
            redirect: {
                destination: "/",
                permanent: true,
            }
        }
    }
}

export default InmueblePage;
