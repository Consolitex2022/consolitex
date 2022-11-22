import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    message: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    const { id, ficha_id } = req.body;

    const body = JSON.stringify({
        id,
        ficha_id
    })

    const options = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body
    }
    const url = `${process.env.BASE_URL}/like/index.php`;

    try {

        const respuesta = await fetch(url, options);
        switch (respuesta.status) {
            case 200:
                const data = await respuesta.json();
                res.status(200).json({ message: 'Liked post' });
                break;
            case 400:
                res.status(400).json({ message: "No se asignó el like" });
                break;
            default:
                res.status(500).json({ message: "Error de servidor" });
                break;

        }
    } catch (error) {

    }
}