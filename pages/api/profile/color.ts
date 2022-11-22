import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    message: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    const url = `${process.env.BASE_URL}/profile/color`;

    console.log(req.body)
    const { id, color } = req.body;
    if (!id || !color) {
        res.status(400).json({ message: "Faltan datos obligatorios" })
    }

    const body = JSON.stringify({
        id,
        color
    })

    const options = {
        method: "POST",
        body,
    }

    try {
        const respuesta = await fetch(url, options)
        switch (respuesta.status) {
            case 200:
                res.status(200).json({ message: 'Color de avatar cambiado' });
                break;
            default:
                res.status(500).json({ message: 'No se pudo cambiar el color' });
                break;
        }
    } catch (error) {
        res.status(500).json({ message: 'No se logró conectar al server' });
    }
}