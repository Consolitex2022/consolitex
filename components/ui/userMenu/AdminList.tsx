import { FC, useContext } from "react";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";

import { adminSettings } from "../settings";
import { AuthContext } from "../../../context/authcontext";
import Link from "next/link";
import { useRouter } from "next/router";
import { Pages } from "../../../interfaces/pages-type";

interface Props {
    handleCloseUserMenu: () => void;
}
export const AdminList: FC<Props> = ({ handleCloseUserMenu }) => {
    const router = useRouter();
    const currentPath = router.pathname;
    const user = useContext(AuthContext);
    return (
        <>
            {
                adminSettings.map((setting: Pages, i: number) => (String(currentPath) !== String(setting.path) ?
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
                    )
                ))}
        </>
    )
}