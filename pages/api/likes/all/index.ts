import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    message: string;
    sql?: string;
    liked?: boolean;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    switch (req.method) {
        case "GET":
            const data = req.query;

            const urlGetLike = `${process.env.BASE_URL}/likes?ficha_id0=${data.ficha_id0}&user_id=${data.user_id}`;
            console.log(req.query, urlGetLike)
            try {
                const respuesta = await fetch(urlGetLike);
                switch (respuesta.status) {
                    case 200:
                        res.status(200).json({ message: "Ok", liked: true });
                        break;
                    case 204:
                        res.status(204).end();
                        break;
                    case 400:
                        res.status(400).json({ message: "Error de informacion" });
                        break;
                    default:
                        res.status(500).json({ message: "Error interno del servidor" });
                        break;
                }
            } catch (error) {
                console.log(error);
                res.status(500).json({ message: "Error interno del servidor" });
            }
            break;
        default:
            res.status(405).end();
    }
}