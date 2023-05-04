import type { NextApiRequest, NextApiResponse } from 'next'
import { UserData } from '../../../../interfaces/user-type';

type Data = {
    message: string;
    user?: UserData;
    errors?: string[];
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    const { nombres, apellidos, email, telefono, password } = req.body;
    const color = "#4caf50";
    const body = JSON.stringify({ nombres, apellidos, email, telefono, password, color })
    const url = `${process.env.BASE_URL}/auth/register.php`;
    const options = {
        method: "POST",
        body
    }
    try {
        const respuesta = await fetch(url, options)
        switch (respuesta.status) {
            case 200:
                res.status(200).json({ message: "Registro exitoso" })
                break;
            case 400:
                const { errors } = await respuesta.json();
                res.status(400).json({ message: 'No se logró registrar', errors });
                break;
            default:
                res.status(500).json({ message: "Error al conectar con la api" })
        }
    } catch (error) {
        res.status(500).json({ message: 'No se logró conectar con el servidor' });
    }
}