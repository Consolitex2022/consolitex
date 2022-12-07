import { useState, useEffect, useContext, FC } from 'react'
import { GetServerSideProps, NextPage } from 'next'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import Chip from '@mui/material/Chip'
import Button from '@mui/material/Button'

import LikeIcon from '@mui/icons-material/FavoriteRounded'
import ArrowBack from '@mui/icons-material/ArrowBack'

import Layout from '../../components/ui/Layout'

import { ucfirst, validarToken, validateSession } from '../../utils/functions'
import { AuthContext } from '../../context/authcontext'
import { Inmueble, ValidatedUser } from '..'
import { CustomImage } from '../../components/images/CustomImage'
import { useRouter } from 'next/router'
import green from '@mui/material/colors/green'
import Swal from 'sweetalert2'

interface Props {
    validatedUser: ValidatedUser;
    inmuebles?: Inmueble[];

}
const MisLikesPage: NextPage<Props> = ({ validatedUser, inmuebles }) => {
    const userData = useContext(AuthContext)
    useEffect(() => {
        validateSession(userData, validatedUser);
    }, [])
    console.log(inmuebles)
    return (
        <Layout title="Mi perfil" description="">
            <Box sx={styles.mainContainer}>

                <Typography variant="overline" fontWeight="bold">Inmuebles favoritos</Typography>

                <Grid container spacing={1}>
                    <Grid item xs={12} >
                        <Box sx={styles.inmueblesContainer}>

                            {
                                inmuebles && inmuebles.map((inm) => (
                                    <LikeCard key={inm.data.ficha_id0} inmueble={inm} />
                                ))
                            }
                        </Box>
                        {
                            !inmuebles && (
                                <Typography variant="body1" color="text.secondary">No le has dado like a ningún inmueble</Typography>
                            )
                        }
                    </Grid>
                </Grid>
            </Box>
        </Layout>
    )
}
interface LikeCardProps {
    inmueble: Inmueble;
}
const LikeCard: FC<LikeCardProps> = ({ inmueble }) => {
    const [favorite, setFavorite] = useState<boolean>(true);

    const router = useRouter();

    const redirect = (path: string) => {
        window.open(window.origin + "/inmueble/" + path, "_blank")
    }
    const userData = useContext(AuthContext);

    const dislike = async () => {
        const url = `/api/likes/`

        const body = JSON.stringify({
            id: inmueble.data.key,
            ficha_id0: inmueble.data.ficha_id0,
            user_id: userData.id,
            action: 'dislike',
        })

        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body
        }

        try {
            const respuesta = await fetch(url, options);
            switch (respuesta.status) {
                case 200:
                    setFavorite(false);
                    break;
                case 400:
                    Swal.fire({
                        title: "Error",
                        toast: true,
                        icon: "error",
                        showConfirmButton: false,
                        timer: 2000,
                        timerProgressBar: true,
                        position: "bottom-start"
                    })
                    break;
                case 204:
                    Swal.fire({
                        title: "Error",
                        toast: true,
                        icon: "error",
                        showConfirmButton: false,
                        timer: 2000,
                        timerProgressBar: true,
                        position: "bottom-start"
                    })
                default:
                    Swal.fire({
                        title: "Error del servidor",
                        toast: true,
                        icon: "error",
                        showConfirmButton: false,
                        timer: 2000,
                        timerProgressBar: true,
                        position: "bottom-start"
                    })
                    break;
            }
        } catch (error) {
            console.log(error);
            Swal.fire({
                title: "Error de conexion",
                toast: true,
                icon: "error",
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
                position: "bottom-start"
            })
        }

    }

    const undo = async () => {
        const url = `/api/likes/`

        const body = JSON.stringify({
            id: inmueble.data.key,
            ficha_id0: inmueble.data.ficha_id0,
            user_id: userData.id,
            action: 'like',
        })

        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body
        }

        try {
            const respuesta = await fetch(url, options);
            switch (respuesta.status) {
                case 200:
                    setFavorite(true);
                    break;
                case 400:
                    Swal.fire({
                        title: "Error",
                        toast: true,
                        icon: "error",
                        showConfirmButton: false,
                        timer: 2000,
                        timerProgressBar: true,
                        position: "bottom-start"
                    })
                    break;
                case 204:
                    Swal.fire({
                        title: "Error",
                        toast: true,
                        icon: "error",
                        showConfirmButton: false,
                        timer: 2000,
                        timerProgressBar: true,
                        position: "bottom-start"
                    })
                default:
                    Swal.fire({
                        title: "Error del servidor",
                        toast: true,
                        icon: "error",
                        showConfirmButton: false,
                        timer: 2000,
                        timerProgressBar: true,
                        position: "bottom-start"
                    })
                    break;
            }
        } catch (error) {
            console.log(error);
            Swal.fire({
                title: "Error de conexion",
                toast: true,
                icon: "error",
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
                position: "bottom-start"
            })
        }
    }

    const localStyles = {

        card: {
            background: "#FFF",
            minWidth: 250,
            maxWidth: 250,
            minHeight: 380,
            maxHeight: "100%",
            overflow: "hidden",
            mb: 2,
            boxShadow: "0 8px 32px 0 rgba(0,0,0,0.1)",
            transition: "0.5s ease all",
            borderRadius: 5,
            "&:hover": {
                boxShadow: "0 8px 10px 0 rgba(0,0,0,0.2)"
            },
            zIndex: 9
        },
        content: {
            p: 2,
            minHeight: 180,
            maxHeight: 180,
            overflow: "hidden"
        }
    }
    return (
        <Box sx={localStyles.card} >
            {
                favorite ? (
                    <>
                        <CustomImage src={`https://consolitex.org/newImg.php?nowatermark=1&url=${inmueble.url_inmueble}`} alt={inmueble.data.nombre} upperBoxStyles={{ width: "100%", minHeight: 200, maxHeight: 200, overflow: "hidden", borderRadius: "20px 20px 0 0 " }} />
                        <Box sx={localStyles.content} >
                            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexFlow: "row nowrap", mb: 1 }}>
                                <Chip label={inmueble.data.inmueble} color="primary" size="small" />
                                <IconButton sx={{ zIndex: 9999 }} onClick={dislike}>
                                    <LikeIcon color="error" />
                                </IconButton>
                            </Box>
                            <Typography variant="subtitle1">{`${inmueble.data.nombre.length > 29 ? ucfirst(inmueble.data.nombre.toLocaleLowerCase()).substring(0, 29) + "..." : ucfirst(inmueble.data.nombre.toLocaleLowerCase())}`}</Typography>
                            <Typography variant="subtitle2" color="text.secondary" fontWeight="bold" >{`${inmueble.data.urbanizacion}, ${inmueble.data.municipio}, ${inmueble.data.Estado}`}</Typography>
                            <Typography variant="subtitle2" sx={{ color: green[500] }} fontWeight="bold">REF {inmueble.data.ref}</Typography>
                        </Box>
                    </>
                ) : (
                    <>
                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "inherit" }}>
                            <Button onClick={undo} variant="outlined" sx={{ color: "grey", borderRadius: 5 }} disableElevation startIcon={<ArrowBack />}>Deshacer</Button>
                        </Box>
                    </>
                )
            }
            <Button sx={{ borderRadius: "0 0 20px 20px", textTransform: "none" }} variant="contained" disableElevation fullWidth onClick={() => redirect(inmueble.data.ficha_id)} >Ver inmueble</Button>
        </Box >
    )
}
export const getServerSideProps: GetServerSideProps = async (ctx) => {

    const user = await validarToken(ctx);

    const url = `${process.env.BASE_URL}/likes/all?user_id=${user.id}`;

    try {
        const respuesta = await fetch(url);
        switch (respuesta.status) {
            case 200:
                const data = await respuesta.json();
                return {
                    props: {
                        validatedUser: {
                            logged: user.id === 0 ? false : true,
                            user,
                        },
                        inmuebles: data
                    }
                }
            default:
                return {
                    props: {
                        validatedUser: {
                            logged: user.id === 0 ? false : true,
                            user,
                        }
                    }
                }
        }
    } catch (error) {
        console.log({ error });
        return {
            props: {
                validatedUser: {
                    logged: user.id === 0 ? false : true,
                    user
                }
            }
        }
    }

}

export default MisLikesPage

const styles = {
    mainContainer: {
        minHeight: "100vh",
        width: "80%",
        margin: "20px auto"
    },
    inmueblesContainer: {
        display: "flex",
        flexFlow: "row wrap",
        justifyContent: "space-between",
        alignItems: "center"
    }
}