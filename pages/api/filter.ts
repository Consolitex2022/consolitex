import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    message: string;
    data?: any;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    const params = []

    if (req.query['lastItem'] && String(req.query['lastItem']) !== '0') {
        params.push(['key', String(req.query['lastItem'])])
    }
    if (req.query['tipo'] && String(req.query['tipo']) !== '0') {
        params.push(['tipo_inmueble', String(req.query['tipo'])])
    }
    if (req.query['habitaciones'] && String(req.query['habitaciones']) !== '0') {
        params.push(['habitaciones', String(req.query['habitaciones'])])
    }
    if (req.query['from'] && String(req.query['from']) !== '0') {
        params.push(['from', String(req.query['from'])])
    }
    if (req.query['to'] && String(req.query['to']) !== '0') {
        params.push(['to', String(req.query['to'])])
    }
    if (req.query['banos'] && String(req.query['banos']) !== '0') {
        params.push(['banos', String(req.query['banos'])])
    }
    if (req.query['estacionamientos'] && String(req.query['estacionamientos']) !== '0') {
        params.push(['estacionamientos', String(req.query['estacionamientos'])])
    }
    if (req.query['negocio'] && String(req.query['negocio']) !== '0') {
        params.push(['tipo_negocio', String(req.query['negocio'])])
    }
    if (req.query['localidad'] && String(req.query['localidad']) !== '0') {
        params.push(['localidad', String(req.query['localidad'])])
    }
    if (req.query['query'] && String(req.query['query']) !== '0') {
        params.push(['query', String(req.query['query'])])
    }
    const urlParams = new URLSearchParams(params).toString();
    const url = new URL(`${process.env.BASE_URL}/inmuebles_rango2.php`);
    if (params.length > 0) {
        url.search = urlParams;
    }
    console.log(params)
    try {
        const respuesta = await fetch(url);
        switch (respuesta.status) {
            case 200:
                const data = await respuesta.json();

                const newInmuebles = [];
                const length = Object.keys(data).length;

                for (let i = 0; i < Number(length); i++) {
                    data[i] && newInmuebles.push(data[i]);
                }

                res.status(200).json({ message: "Datos encontrados", data: newInmuebles })
                break;
            case 204:
                res.status(204).end();
                break;
            default:
                res.status(204).end();
                break;
        }

    } catch (error) {
        console.log(error);
        res.status(204).end();
    }
}