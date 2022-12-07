import { FC, useState, useContext, MouseEvent } from "react";

import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Menu, { MenuProps } from "@mui/material/Menu";
import Divider from "@mui/material/Divider";
import MenuList from "@mui/material/MenuList";
import { UserData, AdminList, UserList } from "./userMenu";
import { AuthContext } from "../../context/authcontext";

export const MenuUser: FC = () => {
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

    // Token del usuario logeado
    const user = useContext(AuthContext)

    const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    const propsAdminList = { handleCloseUserMenu };
    const propsUserList = { handleCloseUserMenu };

    const menuProps: MenuProps = {
        sx: { mt: '45px' },
        id: "menu-appbar",
        anchorEl: anchorElUser,
        anchorOrigin: {
            vertical: 'top',
            horizontal: 'right',
        },
        keepMounted: true,
        transformOrigin: {
            vertical: 'top',
            horizontal: 'right',
        },
        open: Boolean(anchorElUser),
        onClose: handleCloseUserMenu,
    }
    return (
        <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Abrir configuraciones">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    {
                        user.id !== 0 && (<Avatar alt={user.id !== 0 ? user.nombres : 'A'} src="/static/images/avatar/2.jpg" sx={{ bgcolor: user ? user.color : '#bdbdbd' }} />)
                    }
                </IconButton>
            </Tooltip>
            <Menu PaperProps={{ sx: { background: 'rgba(255,255,255,0.5)', backdropFilter: 'blur(4px)', borderRadius: 5, boxShadow: '0 8px 32px 0 rgba(100,100,100,0.5)' } }} MenuListProps={{ sx: { background: 'rgba(0,0,0,0.0)', overflow: 'hidden', borderRadius: 5 } }} {...menuProps}>
                {
                    user.id !== 0 && (
                        <Box sx={{ display: "flex", flexDirection: "column" }}>
                            {
                                user && (<UserData />)
                            }
                            <Divider />
                        </Box>
                    )
                }
                {user.id !== 0 && (
                    user && (<MenuList sx={{ p: 2 }} dense> {user.rol === 1 ? (<AdminList {...propsAdminList} />) : (<UserList {...propsUserList} />)} </MenuList>)
                )
                }
            </Menu>
        </Box>
    )
}
