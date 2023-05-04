import { createContext } from "react";
import { UserData } from "../../interfaces/user-type";

interface ContextProps {
    id: number;
    nombres: string;
    apellidos: string;
    telefono: string;
    cedula: string;
    email: string;
    color: string;
    created_at: string;
    ref: string;
    rol: number;
    status: number;
    token: string;
    logIn: (user: UserData) => void;
    logOut: () => void;
    editData: (user: UserData) => void;
    changeColor: (color: string) => void;
}

export const AuthContext = createContext({} as ContextProps);