import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    message: string;
    data?: any;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    const { lastItem } = req.query;

    const url = `https://consolitex.org/api/v1/inmuebles.php?key=${lastItem}`

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
        console.log(error, lastItem);
        res.status(500).json({ message: "Error interno" })
    }
}