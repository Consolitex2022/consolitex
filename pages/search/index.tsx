import { useState } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import dynamic from 'next/dynamic';

import Layout from '../../components/ui/Layout';

import { Inmueble } from '..';

interface Props {
    inmueblesSSR: Inmueble[] | null;
    localidad?: string;
    query?: string;
}

const SearchPage: NextPage<Props> = ({ inmueblesSSR, query = '', localidad = '' }) => {
    const InmuebleList = dynamic(() => import('../../components/search').then((mod) => mod.InmuebleList));
    return (
        <Layout title="Consolitex" description="1231">
            {
                inmueblesSSR && (<InmuebleList inmuebles={inmueblesSSR} />)
            }
        </Layout>
    )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {

    const params = []

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
                inmueblesSSR: newInmuebles,
                localidad: ctx.query['localidad'],
                query: ctx.query['query'],

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