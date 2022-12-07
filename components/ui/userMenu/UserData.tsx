import { FC, useContext } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { AuthContext } from "../../../context/authcontext";

export const UserData: FC = () => {

    const user = useContext(AuthContext);
    return (
        <Box sx={{ p: 2 }}>
            <Typography variant="subtitle1" color="text.primary" fontWeight="bold">{user?.nombres}</Typography>
            <Typography variant="subtitle2" color="text.secondary" fontWeight="400" >{user?.email}</Typography>
            {/* <Typography variant="overline" color="text.secondary" fontWeight="400">{user?.rol}</Typography> */}
        </Box>
    )
}