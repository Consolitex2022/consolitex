import { UserData } from './../../interfaces/user-type';

type UserLoggedActionType =
    | { type: 'User - Log in', payload: UserData }
    | { type: 'User - Log out' }
    | { type: 'User - Edit', payload: UserData }
    | { type: 'User - Change color', payload: { color: string } }

export const authReducer = (state: UserData, action: UserLoggedActionType): UserData => {
    switch (action.type) {
        case 'User - Log in':
            return action.payload;
        case 'User - Log out':
            const emptyUserData: UserData = {
                nombres: '',
                id: 0,
                apellidos: '',
                telefono: '',
                cedula: '',
                email: '',
                color: '',
                created_at: '',
                rol: 0,
                ref: '',
                status: 0,
                token: ''
            }
            return emptyUserData;
        case 'User - Edit':
            return action.payload;
        case 'User - Change color':
            return { ...state, color: action.payload.color };
        default:
            return state;
    }
}