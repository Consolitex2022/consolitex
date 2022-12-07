import { FC, useContext, MouseEvent, KeyboardEvent } from "react";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { UserList, AdminList, UserInfo } from ".";
import { AuthContext } from "../../../context/authcontext";
import { Typography } from "@mui/material";

interface Props {
    state: boolean;
    toggleDrawer: (open: boolean) => (event: KeyboardEvent | MouseEvent) => void;
}
export const DrawerComponent: FC<Props> = ({ state, toggleDrawer }) => {

    const user = useContext(AuthContext)

    return (
        <Drawer anchor="left" BackdropProps={{ sx: { background: 'rgba(0,0,0,0.1)' } }} open={state} onClose={toggleDrawer(false)} PaperProps={{ sx: { background: 'rgba(255,255,255,0.5)', backdropFilter: 'blur(6px)', } }}  >
            <Box sx={{ p: 1, display: "flex", justifyContent: "center", alignItems: "center", flexFlow: "column wrap", }}>

                {
                    user && (<UserInfo />)
                }
            </Box>
            <Box
                sx={{ width: 250, p: 1, minHeight: '100vh', maxHeight: '100%', overflowY: 'show' }}
                role="presentation"
                onClick={toggleDrawer(false)}
                onKeyDown={toggleDrawer(false)}
            >
                {user.id !== 0 && Number(user?.rol) === 1 && (<AdminList />)}
                {user.id !== 0 && Number(user?.rol) !== 1 && (<UserList />)}
            </Box>
        </Drawer>
    )
}