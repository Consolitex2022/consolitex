import { useState } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import dynamic from 'next/dynamic';

import Layout from '../../components/ui/Layout';

import { Inmueble } from '..';

interface Props {
    inmueblesSSR: Inmueble[] | null;
    localidadSSR?: string;
    querySSR?: string;
    negocioSSR?: string;
    habitacionesSSR?: string;
    banosSSR?: string;
    fromSSR?: string | number;
    toSSR?: string | number;
    tipoSSR?: string;
}

const SearchPage: NextPage<Props> = ({ inmueblesSSR, querySSR = '', localidadSSR = '', negocioSSR = '', habitacionesSSR = '', banosSSR = '', fromSSR = 0, toSSR = 0, tipoSSR = '' }) => {
    const InmuebleList = dynamic(() => import('../../components/search').then((mod) => mod.InmuebleList));
    const props = { inmueblesSSR, querySSR, localidadSSR, negocioSSR, habitacionesSSR, banosSSR, fromSSR, toSSR, tipoSSR }
    return (
        <Layout title="Consolitex" description="1231">
            {
                inmueblesSSR && (<InmuebleList {...props} />)
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
    if (ctx.query['from'] && Number(ctx.query['from']) !== 0) {
        params.push(['from', String(ctx.query['from'])])
    }
    if (ctx.query['to'] && Number(ctx.query['to']) !== 0) {
        params.push(['to', String(ctx.query['to'])])
    }
    if (ctx.query['habitaciones'] && ctx.query['habitaciones'] !== '0') {
        params.push(['habitaciones', String(ctx.query['habitaciones'])])
    }
    if (ctx.query['banos'] && ctx.query['banos'] !== '0') {
        params.push(['banos', String(ctx.query['banos'])])
    }
    if (ctx.query['tipo'] && ctx.query['tipo'] !== '0') {
        params.push(['tipo', String(ctx.query['tipo'])])
    }
    if (ctx.query['estacionamientos'] && ctx.query['estacionamientos'] !== '0') {
        params.push(['estacionamientos', String(ctx.query['estacionamientos'])])
    }
    const urlParams = new URLSearchParams(params).toString();
    const url = new URL(`https://consolitex.org/api/v1/inmuebles_rango.php`);
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
                toSSR: ctx.query['max'] ? ctx.query['max'] : 0,
                fromSSR: ctx.query['min'] ? ctx.query['min'] : 0,
                tipoSSR: ctx.query['tipo'] ? ctx.query['tipo'] : '',
                banosSSR: ctx.query['banos'] ? ctx.query['banos'] : '',
                querySSR: ctx.query['query'] ? ctx.query['query'] : '',
                negocioSSR: ctx.query['negocio'] ? ctx.query['negocio'] : '',
                localidadSSR: ctx.query['localidad'] ? ctx.query['localidad'] : '',
                habitacionesSSR: ctx.query['habitaciones'] ? ctx.query['habitaciones'] : '',
                estacionamientosSSR: ctx.query['estacionamientos'] ? ctx.query['estacionamientos'] : '',
            }
        }
    } catch (err) {
        return {
            props: {
                inmueblesSSR: null,
                toSSR: 0,
                fromSSR: 0,
                tipoSSR: '',
                banosSSR: '',
                querySSR: '',
                negocioSSR: '',
                localidadSSR: '',
                habitacionesSSR: '',
                estacionamientosSSR: '',
            }
        }
    }
}
export default SearchPage;