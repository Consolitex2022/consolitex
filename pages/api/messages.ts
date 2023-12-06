import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    message: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    switch (req.method) {
        case 'POST':
            const url = `${process.env.BASE_URL}/message.php`
            const { ficha_id, key, fullname, phone = '', email = '', message } = req.body;
            const body = JSON.stringify({ fullname, phone, email, message, key, ficha_id });
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body
            }
            try {
                const response = await fetch(url, options);
                switch (response.status) {
                    case 200:
                        res.status(200).json({ message: 'Mensaje enviado correctamente' })
                        break;
                    case 405:
                        res.status(405)
                        break;
                    case 500:
                        console.log('se recibio error 500')
                        res.status(500).json({ message: 'Error interno del servidor' })
                        break;
                    default:
                        console.log('Cayo en default, ' + response.status, url)
                        res.status(500).json({ message: 'Error interno del servidor' })
                        break;
                }
            } catch (error) {
                console.log({ error });
                res.status(500).json({ message: 'Error interno del servidor' })
            }
            break;
        default:
            res.status(405)
            break;
    }
}