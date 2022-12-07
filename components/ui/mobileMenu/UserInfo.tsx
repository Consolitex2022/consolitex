import { FC, useContext } from "react";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { AuthContext } from "../../../context/authcontext";

export const UserInfo: FC = () => {
    const user = useContext(AuthContext)
    return (<>
        <Avatar alt={user ? user.nombres : 'A'} src="/static/images/avatar/2.jpg" sx={{ bgcolor: user ? user.color : '#bdbdbd', width: 64, height: 64, fontSize: 32 }} />
        <Typography variant="h6" color="text.primary" fontWeight="bold" >
            {user ? user.nombres : ""}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" fontWeight="400">
            {user ? user.email : ""}
        </Typography>
        {/* <Typography variant="overline" color="text.secondary" fontWeight="bold" fontSize={10}>
            {user ? user.rol : ""}
        </Typography> */}
    </>)
}