import { FC, useContext, useState } from 'react'
import { Box, IconButton } from '@mui/material'
import { amber, orange, red, pink, purple, blue, green } from '@mui/material/colors'
import Swal from 'sweetalert2'
import { AuthContext } from '../../context/authcontext'
export const ColorPicker: FC = () => {
    const [changing, setChanging] = useState<boolean>(false);
    const userData = useContext(AuthContext)
    const changeColor = async (color: string) => {
        setChanging(true);
        if (userData.id !== 0) {
            const body = JSON.stringify({
                id: Number(userData.id),
                color
            });
            const url = `/api/profile/color`;

            const options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body
            }

            try {

                const respuesta = await fetch(url, options)
                const data = await respuesta.json();

                switch (respuesta.status) {
                    case 200:
                        Swal.fire({
                            title: "Se cambió el color del avatar",
                            icon: "success",
                            toast: true,
                            position: "bottom-start",
                            showConfirmButton: false,
                            timer: 1500,
                            timerProgressBar: true
                        })
                        setChanging(false);
                        userData.changeColor(color);
                        break;
                    case 400:
                        Swal.fire({
                            title: "No se cambió el color",
                            icon: "error",
                            toast: true,
                            position: "bottom-start",
                            timer: 2000,
                            showConfirmButton: false,
                            timerProgressBar: true,
                        })
                        setChanging(false);
                        break;
                    default:
                        Swal.fire({
                            title: "No se logró conectar con el servidor",
                            icon: "error",
                            toast: true,
                            position: "bottom-start",
                            showConfirmButton: false,
                            timer: 1500,
                            timerProgressBar: true,
                        })
                        break;
                }
            } catch (error) {
                console.log(error);
            }
        } else {
            setChanging(false);
        }
    }

    return (
        <Box sx={{ display: "flex", flexFlow: "row wrap", alignItems: "center" }}>
            <Box>
                <IconButton disabled={changing} onClick={() => changeColor(amber[500])} >
                    <Box sx={{ width: 15, height: 15, borderRadius: "100%", bgcolor: amber[500] }}></Box>
                </IconButton>
            </Box>
            <Box>
                <IconButton disabled={changing} onClick={() => changeColor(orange[500])}>
                    <Box sx={{ width: 15, height: 15, borderRadius: "100%", bgcolor: orange[500] }}></Box>
                </IconButton>
            </Box>
            <Box>
                <IconButton disabled={changing} onClick={() => changeColor(red[500])}>
                    <Box sx={{ width: 15, height: 15, borderRadius: "100%", bgcolor: red[500] }}></Box>
                </IconButton>
            </Box>
            <Box>
                <IconButton disabled={changing} onClick={() => changeColor(pink[500])}>
                    <Box sx={{ width: 15, height: 15, borderRadius: "100%", bgcolor: pink[500] }}></Box>
                </IconButton>
            </Box>
            <Box>
                <IconButton disabled={changing} onClick={() => changeColor(purple[500])}>
                    <Box sx={{ width: 15, height: 15, borderRadius: "100%", bgcolor: purple[500] }}></Box>
                </IconButton>
            </Box>
            <Box>
                <IconButton disabled={changing} onClick={() => changeColor(blue[500])}>
                    <Box sx={{ width: 15, height: 15, borderRadius: "100%", bgcolor: blue[500] }}></Box>
                </IconButton>
            </Box>
            <Box>
                <IconButton disabled={changing} onClick={() => changeColor(green[500])}>
                    <Box sx={{ width: 15, height: 15, borderRadius: "100%", bgcolor: green[500] }}></Box>
                </IconButton>
            </Box>
        </Box>
    )
}
