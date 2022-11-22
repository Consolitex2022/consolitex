import { ReactNode, FC, useContext } from "react";
import { Box, Typography } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import { AuthContext } from "../../context/authcontext";

interface Props {
    title: string;
    children?: ReactNode;
}
export const CaracteristicaProfile: FC<Props> = ({ title, children }) => {
    const userData = useContext(AuthContext)
    const { color } = userData
    return (
        <Box sx={{ display: "flex", flexFlow: "row", alignItems: "center" }}>
            <CircleIcon sx={{ fontSize: 12, mr: 2, color: color ? color : "#F1F1F1" }} />
            <Typography variant="subtitle1" color="text.primary" fontWeight="bold" sx={{ mr: 1, fontSize: 16 }}>{title}</Typography>
            <Typography variant="subtitle2" color="text.secondary" fontWeight="bold">{children}</Typography>
        </Box>
    )
}