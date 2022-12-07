import { FC, useContext } from "react";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import { settings } from "../settings";
import { useRouter } from "next/router";
import { AuthContext } from "../../../context/authcontext";
import { Pages } from "../../../interfaces/pages-type";
import Link from "next/link";

interface Props {
    handleCloseUserMenu: () => void;
}
export const UserList: FC<Props> = ({ handleCloseUserMenu }) => {
    const user = useContext(AuthContext)
    const router = useRouter();
    const currentPath = router.pathname;
    return (
        <>
            {settings.map((setting: Pages, i: number) => (String(currentPath) !== String(setting.path) ?
                (<Link style={{ textDecoration: 'none' }} key={`${i + 2}${setting.name}${i}`} href={setting.path}>
                    <MenuItem sx={{ borderRadius: 3, }} onClick={handleCloseUserMenu}>
                        <Typography textAlign="center" fontSize={12} sx={{ color: "text.primary" }}>{setting.name}</Typography>
                    </MenuItem>
                </Link>) : (
                    <MenuItem sx={{
                        transition: "0.5s ease all",
                        borderRadius: 3,
                        background: user.id !== 0 ? user.color : 'primary', textDecoration: "none", "&:hover": {
                            background: "rgba(0,0,0,0.2)"
                        }
                    }} onClick={handleCloseUserMenu}>
                        <Typography textAlign="center" fontSize={12} fontWeight={'bold'} sx={{ color: "#FFF" }}>{setting.name}</Typography>
                    </MenuItem>
                )))}
        </>
    )
}