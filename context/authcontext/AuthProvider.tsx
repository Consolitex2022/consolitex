import { FC, ReactNode, useReducer } from "react"
import { AuthContext, authReducer } from ".";
import { UserData } from "../../interfaces/user-type";
import { createCookie, deleteCookie } from "../../utils/functions";

interface Props {
    children: ReactNode
}
export const USER_INITIAL_STATE: UserData = {
    id: 0,
    nombres: "",
    apellidos: "",
    telefono: "",
    cedula: "",
    email: "",
    color: "",
    created_at: "",
    rol: 0,
    ref: '',
    status: 0,
    token: '',
}

export const AuthProvider: FC<Props> = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, USER_INITIAL_STATE);

    const logIn = (user: UserData) => {
        dispatch({ type: 'User - Log in', payload: user });
    }
    const logOut = () => {
        deleteCookie('token');
        deleteCookie('email');
        dispatch({ type: 'User - Log out' })
    }
    const editData = (user: UserData) => {
        dispatch({ type: 'User - Edit', payload: user })
    }
    const changeColor = (color: string) => {
        dispatch({ type: 'User - Change color', payload: { color } })
    }

    return (
        <AuthContext.Provider value={{ ...state, logIn, logOut, editData, changeColor }} >
            {children}
        </AuthContext.Provider>)
}