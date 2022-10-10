import { useState, Suspense } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import dynamic from 'next/dynamic';
import { Box } from '@mui/material';

const Layout = dynamic(() => import('../../components/ui/Layout'));
const InmuebleList = dynamic(import('../../components/search').then((mod) => mod.InmuebleList));

import { Inmueble } from '..';

interface Props {
    inmueblesSSR: Inmueble[] | null;
}

const SearchPage: NextPage<Props> = ({ inmueblesSSR }) => {
    const [inmuebles, setInmuebles] = useState<Inmueble[] | null>(inmueblesSSR);
    return (
        <Suspense fallback="Cargando...">
            <Layout title="Consolitex" description="1231">
                <Box sx={{ width: "80%", margin: "20px auto" }}>
                    {
                        inmuebles && (<InmuebleList inmuebles={inmuebles} />)
                    }
                </Box>
            </Layout>
        </Suspense>
    )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {

    const params = []

    if (ctx.query['tipo'] && ctx.query['tipo'] !== '0') {
        params.push(['tipo', String(ctx.query['tipo'])])
    }

    if (ctx.query['negocio'] && ctx.query['negocio'] !== '0') {
        params.push(['negocio', String(ctx.query['negocio'])])
    }

    if (ctx.query['localidad'] && ctx.query['localidad'] !== '0') {
        params.push(['localidad', String(ctx.query['localidad'])])
    }

    if (ctx.query['query'] && ctx.query['query'] !== '0') {
        params.push(['query', String(ctx.query['query'])])
    }
    const urlParams = new URLSearchParams(params).toString();
    const url = new URL(`https://consolitex.org/api/v1/inmuebles.php`);
    url.search = urlParams;
    try {

        const respuesta = await fetch(url, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await respuesta.json();
        const newInmuebles = [];
        const length = Object.keys(data).length
        for (let i = 0; i < Number(length); i++) {
            data[i] && newInmuebles.push(data[i]);
        }

        return {
            props: {
                inmueblesSSR: newInmuebles
            }
        }
    } catch (err) {
        return {
            props: {
                inmueblesSSR: null
            }
        }
    }
}
export default SearchPage;