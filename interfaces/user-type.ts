export type UserData = {
    id: number;
    nombres: string;
    apellidos: string;
    telefono: string;
    cedula: string;
    email: string;
    color: string;
    created_at: string;
    rol: number;
    ref: string;
    status: number;
    token: string;
}

export interface UserRef {
    id: number;
    usuario: string;
    password: string;
    email: string;
    nombre_y_apellido: string;
    cedula: string;
    telefono: string;
    genero: string;
    role: number;
    foto: string;
    ref: string;
    created_at: string;
    status: number;
}