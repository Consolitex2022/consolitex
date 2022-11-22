import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    message: string;
    errores?: string[];
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    const { nombres, apellidos, email, telefono, id } = req.body;
    let errores = [];
    if (nombres && /[^ a-zA-ZáéíóúÁÉÍÓÚ]/g.test(nombres)) {
        errores.push('Nombres inválidos');
    }
    if (apellidos && /[^ a-zA-ZáéíóúÁÉÍÓÚ]/g.test(apellidos)) {
        errores.push('Apellidos inválidos');
    }
    if (errores.length > 0) {
        res.status(400).json({ message: "Errores de validacion", errores })
    } else {

        const url = `${process.env.BASE_URL}/profile/index.php`;
        const body = JSON.stringify({ nombres, apellidos, telefono, email, id })

        const options = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body
        }

        try {

            const respuesta = await fetch(url, options);
            switch (respuesta.status) {
                case 200:
                    res.status(200).json({ message: 'Exito' });
                    break;
                case 400:
                    console.log(await respuesta.json())
                    res.status(400).json({ message: 'Errores', errores });
                    break;
                default:
                    res.status(500).json({ message: 'Error de servidor' });
                    break;
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Error de conexion' });
        }
    }
}