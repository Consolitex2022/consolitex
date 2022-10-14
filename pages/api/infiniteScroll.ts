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
        params.push(['tipo', String(req.query['tipo'])])
    }

    if (req.query['habitaciones'] && String(req.query['habitaciones']) !== '0') {
        params.push(['habitaciones', String(req.query['habitaciones'])])
    }
    if (req.query['banos'] && String(req.query['banos']) !== '0') {
        params.push(['banos', String(req.query['banos'])])
    }
    if (req.query['estacionamientos'] && String(req.query['estacionamientos']) !== '0') {
        params.push(['estacionamientos', String(req.query['estacionamientos'])])
    }
    if (req.query['negocio'] && String(req.query['negocio']) !== '0') {
        params.push(['negocio', String(req.query['negocio'])])
    }

    if (req.query['localidad'] && String(req.query['localidad']) !== '0') {
        params.push(['localidad', String(req.query['localidad'])])
    }

    if (req.query['query'] && String(req.query['query']) !== '0') {
        params.push(['query', String(req.query['query'])])
    }
    const urlParams = new URLSearchParams(params).toString();
    const url = new URL(`${process.env.BASE_URL}/inmuebles.php`);
    url.search = urlParams;

    try {
        const respuesta = await fetch(url);

        const data = await respuesta.json();

        const newInmuebles = [];
        const length = Object.keys(data).length;

        for (let i = 0; i < Number(length); i++) {
            data[i] && newInmuebles.push(data[i]);
        }

        res.status(200).json({ message: "Datos encontrados", data: newInmuebles })

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error interno" })
    }
}