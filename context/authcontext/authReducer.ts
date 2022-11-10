import { UserData } from './../../interfaces/user-type';

type UserLoggedActionType =
    | { type: 'User - Log in', payload: UserData }
    | { type: 'User - Log out' }
    | { type: 'User - Edit', payload: UserData }
    | { type: 'User - Change color', payload: { color: string } }

export const authReducer = (state: UserData, action: UserLoggedActionType): UserData => {
    switch (action.type) {
        case 'User - Log in':
            return state;
        case 'User - Log out':
            return state;
        case 'User - Edit':
            return state;
        case 'User - Change color':
            return { ...state, color: action.payload.color };
        default:
            return state;
    }
}