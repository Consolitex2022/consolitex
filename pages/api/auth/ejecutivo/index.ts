import type { NextApiRequest, NextApiResponse } from 'next'
import { UserData } from '../../../../interfaces/user-type';

type Data = {
    message: string;
    user?: UserData;
    errors?: string[];
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    const { email, password } = req.body;
    const url = `${process.env.BASE_URL}/auth/ejecutivo.php?email=${email}&password=${password}`;
    const options = {
        method: "GET",
    }
    try {
        const respuesta = await fetch(url, options)
        switch (respuesta.status) {
            case 200:
                const { message, user } = await respuesta.json();
                console.log({ user })
                res.status(200).json({ message, user })
                break;
            case 204:
                res.status(204).end();
                break;
            case 400:
                const { errors } = await respuesta.json();
                res.status(400).json({ message: 'No se logró iniciar sesion', errors });
                break;
            default:
                console.log(respuesta.status)
                res.status(500).json({ message: "Error al conectar con la api" })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'No se logró conectar con el servidor' });
    }
}