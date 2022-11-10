import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

import blue from '@mui/material/colors/blue'

import { NextPage } from 'next'
import Layout from '../../components/ui/Layout'
import ArrowBackRounded from '@mui/icons-material/ArrowBackRounded'
import WhatsApp from '@mui/icons-material/WhatsApp'
import Instagram from '@mui/icons-material/Instagram'
import Twitter from '@mui/icons-material/Twitter'
import Facebook from '@mui/icons-material/Facebook'
import green from '@mui/material/colors/green'
import { lightBlue } from '@mui/material/colors'
import { useRouter } from 'next/router'
import { Form, Formik, FormikState, FormikValues } from 'formik'
import Swal from 'sweetalert2'

const initialValues = {
    email: "",
    password: "",
}

const LoginPage: NextPage = () => {
    const router = useRouter();
    const onSubmit = async (values: FormikValues, resetForm: (nextState?: Partial<FormikState<{ email: string; password: string; }>> | undefined) => void) => {
        const url = "/api/auth/login";

        const body = JSON.stringify({
            email: values.email,
            password: values.password,
        })
        const options = {
            method: "POST",
            body
        }

        try {
            const respuesta = await fetch(url, options)
            switch (respuesta.status) {
                case 200:
                    const data = await respuesta.json();

                    break;
                case 400:
                    const { errors } = await respuesta.json();
                    let errorString = "";
                    errors.forEach((e: string) => errorString += `<p>- ${e}</p>`)
                    Swal.fire({
                        title: "Error",
                        html: errorString,
                        icon: "error",
                    })
                    break;
                case 500:
                    break;
                default:
                    break;
            }
        } catch (error) {
            console.log(error);
            Swal.fire({
                title: "Error",
                text: "No se logró conectar al servidor",
                icon: "error"
            })
        }
    }

    return (
        <Layout title='Iniciar sesión' description='' footer={false}>
            <Box sx={styles.mainContainer}>
                <Box sx={styles.loginContainer}>
                    <Button onClick={() => router.push("/")} startIcon={<ArrowBackRounded />} sx={{ ...styles.link, mb: 4 }}>Volver al inicio</Button>
                    <Typography variant="h4" sx={{ fontFamily: "Plus Jakarta Sans", fontWeight: "800" }}>Iniciar sesión</Typography>
                    <Typography variant="subtitle2" color="text.secondary" sx={{ fontFamily: "Plus Jakarta Sans", mb: 4 }}>Inicia para poder acceder a diferentes caracteristicas dentro de nuestro sitio web!</Typography>
                    <Formik
                        initialValues={initialValues}
                        onSubmit={(values, { resetForm }) => onSubmit(values, resetForm)}
                    >
                        {({ values, handleSubmit, handleChange }) => (
                            <Form onSubmit={handleSubmit}>

                                <TextField label="Email" name="email" value={values.email} onChange={handleChange} fullWidth sx={styles.input} />
                                <TextField label="Contraseña" name="password" value={values.password} onChange={handleChange} fullWidth sx={styles.input} />
                                <Button type="submit" color="primary" variant="contained" sx={styles.button} disableElevation fullWidth>Iniciar</Button>
                            </Form>
                        )}
                    </Formik>
                    <Box sx={styles.linkContainer}>
                        <Typography variant="subtitle1" sx={{ p: 1 }}>¿No tienes cuenta? &nbsp;</Typography>
                        <Button sx={{ ...styles.link }} onClick={() => router.push("/auth/register")}>Registrate aquí</Button>
                    </Box>

                    <Box sx={styles.redesContainer}>
                        <Typography variant="subtitle2" color="text.secondary" sx={{ width: "100%", textAlign: "center", mt: 3 }}>Síguenos en nuestras redes</Typography>
                        <IconButton component="a" href="https://wa.me/5804144029820" target="_blank" sx={styles.whatsapp}>
                            <WhatsApp style={{ color: "white" }} />
                        </IconButton>
                        <IconButton component="a" href="https://instagram.com/consolitex" target="_blank" sx={styles.instagram}>
                            <Instagram style={{ color: "white" }} />
                        </IconButton>
                        <IconButton component="a" href="https://twitter.com/consolitex" target="_blank" sx={styles.twitter}>
                            <Twitter style={{ color: "white" }} />
                        </IconButton>
                        <IconButton component="a" href="https://facebook.com/consolitex" target="_blank" sx={styles.facebook}>
                            <Facebook style={{ color: "white" }} />
                        </IconButton>
                    </Box>
                </Box>
            </Box>
        </Layout >
    )
}
export default LoginPage;
const styles = {
    mainContainer: {
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    loginContainer: {
        width: { xs: "100%", sm: 400, md: 600 },
        margin: "auto",
        p: 2
    },
    input: {
        mb: 1,
        "& fieldset": {
            borderRadius: "30px",
        },
        "& input": {
            fontFamily: "Plus Jakarta Sans"
        },
    },
    button: {
        borderRadius: "30px",
        p: 1.8,
        textTransform: "none",
        "&:hover": {
            boxShadow: `0 0 20px ${blue[200]}`
        }
    },
    link: {
        textTransform: "none",
        borderRadius: "30px",
        fontWeight: "bold",
        fontFamily: "Plus Jakarta Sans"
    },
    linkContainer: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        mt: 1
    },
    redesContainer: {
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexFlow: "row wrap"
    },
    instagram: {
        background: `radial-gradient(circle farthest-corner at 35% 90%, #fec564, transparent 50%),
        radial-gradient(circle farthest-corner at 0 140%, #fec564, transparent 50%), 
        radial-gradient(ellipse farthest-corner at 0 -25%, #5258cf, transparent 50%), 
        radial-gradient(ellipse farthest-corner at 20% -50%, #5258cf, transparent 50%), 
        radial-gradient(ellipse farthest-corner at 100% 0, #893dc2, transparent 50%), 
        radial-gradient(ellipse farthest-corner at 60% -20%, #893dc2, transparent 50%), 
        radial-gradient(ellipse farthest-corner at 100% 100%, #d9317a, transparent), 
        linear-gradient(#6559ca, #bc318f 30%, #e33f5f 50%, #f77638 70%, #fec66d 100%)`,
        mr: 2, "&:hover": { opacity: 0.8 }
    },
    whatsapp: {
        background: green[500],
        mr: 2,
        "&:hover": {
            background: green[700]
        }
    },
    twitter: {
        background: lightBlue[500],
        mr: 2,
        "&:hover": {
            background: lightBlue[700]
        }
    },
    facebook: {
        background: blue[800],
        "&:hover": {
            background: blue[700]
        }
    }
}