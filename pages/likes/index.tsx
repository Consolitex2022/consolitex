import { useState, useEffect, useContext, FC } from 'react'
import { GetServerSideProps, NextPage } from 'next'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'

import LikeIcon from '@mui/icons-material/FavoriteRounded'
import LikeOutlineIcon from '@mui/icons-material/FavoriteBorderRounded'

import Layout from '../../components/ui/Layout'

import { ucfirst, validarToken, validateSession } from '../../utils/functions'
import { AuthContext } from '../../context/authcontext'
import { Inmueble, ValidatedUser } from '..'
import { InmuebleCard } from '../../components/inmuebles'
import { CustomImage } from '../../components/images/CustomImage'
import Chip from '@mui/material/Chip'
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

    const router = useRouter();

    const redirect = (path: string) => {
        window.open(window.origin + "/inmueble/" + path, "_blank")
    }

    const localStyles = {

        card: {
            cursor: "pointer",
            background: "#FFF",
            minWidth: 250,
            maxWidth: 250,
            minHeight: 380,
            maxHeight: 380,
            mb: 1,
            boxShadow: "0 8px 32px 0 rgba(0,0,0,0.1)",
            transition: "0.5s ease all",
            borderRadius: 5,
            "&:hover": {
                boxShadow: "0 8px 10px 0 rgba(0,0,0,0.2)"
            },
            zIndex: 9
        },
        content: {
            p: 2
        }
    }
    return (
        <Box sx={localStyles.card} >
            <CustomImage src={`https://consolitex.org/newImg.php?nowatermark=1&url=${inmueble.url_inmueble}`} alt={inmueble.data.nombre} upperBoxStyles={{ width: "100%", minHeight: 200, maxHeight: 200, overflow: "hidden", borderRadius: "20px 20px 0 0 " }} />
            <Box sx={localStyles.content} >
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexFlow: "row nowrap", mb: 1 }}>
                    <Chip label={inmueble.data.inmueble} color="primary" size="small" />
                    <IconButton sx={{ zIndex: 9999 }}>
                        <LikeIcon color="error" />
                    </IconButton>
                </Box>
                <Typography variant="subtitle1">{ucfirst(inmueble.data.nombre)}</Typography>
                <Typography variant="subtitle2" color="text.secondary" fontWeight="bold" >{`${inmueble.data.urbanizacion}, ${inmueble.data.municipio}, ${inmueble.data.Estado}`}</Typography>
                <Typography variant="subtitle2" sx={{ color: green[500] }} fontWeight="bold">REF {inmueble.data.ref}</Typography>
            </Box>
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