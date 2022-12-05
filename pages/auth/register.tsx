import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

import blue from '@mui/material/colors/blue'

import { NextPage } from 'next'
import Head from 'next/head'
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
import { useState } from 'react'
import InputAdornment from '@mui/material/InputAdornment'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import Grid from '@mui/material/Grid'
import * as Yup from 'yup';

type NewUser = {
    nombres: string;
    apellidos: string;
    email: string;
    telefono: string;
    password: string;
    confirmPassword: string;
}

const initialValues: NewUser = {
    nombres: "",
    apellidos: "",
    email: "",
    telefono: "",
    password: "",
    confirmPassword: "",
}

const SignupSchema = Yup.object().shape({
    nombres: Yup.string()
        .matches(/(?<primernombre>[a-zA-ZáéíóúÁÉÍÓÚ])+ (?<segundonombre>[a-zA-ZáéíóúÁÉÍÓÚ])+$/g, "Escriba ambos nombres")
        .min(3, 'Muy corto')
        .max(24, 'Muy largo')
        .required('Campo obligatorio'),
    apellidos: Yup.string()
        .matches(/(?<primerapellido>[a-zA-ZáéíóúÁÉÍÓÚ])+ (?<segundoapellido>[a-zA-ZáéíóúÁÉÍÓÚ])+$/g, "Escriba ambos apellidos")
        .min(3, 'Muy corto')
        .max(24, 'Muy largo')
        .required('Campo obligatorio'),
    email: Yup.string()
        .email('Email inválido')
        .required('Campo obligatorio'),
    telefono: Yup.string()
        .matches(/^(\+{1})?[0-9]+$/g, "Sólo se aceptan números")
        .min(10, 'Muy corto')
        .max(15, 'Muy largo')
        .required('Campo obligatorio'),
    password: Yup.string()
        .min(10, 'Muy corta (min. 10)')
        .required('Campo obligatorio'),
    confirmPassword: Yup.string()
        .min(10, 'Muy corta (min. 10)')
        .required('Campo obligatorio'),
});
const RegisterPage: NextPage = () => {
    const [show, setShow] = useState<boolean>(false)
    const router = useRouter();
    const onSubmit = async (values: FormikValues, resetForm: (nextState?: Partial<FormikState<{ nombres: string; apellidos: string; email: string; password: string; confirmPassword: string; telefono: string; }>> | undefined) => void) => {
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
    const handleClickShowPassword = () => {
        setShow(!show);
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    return (
        <>
            <Head>
                <meta charSet="UTF-8" />
                <meta name="author" content="Linz Web Development (Jose Linares)" />
                <meta name="description" content="Registro de cuenta de Consolitex" />
                <meta name="copyright" content="Consolitex®" />
                {/* Link canónico */}
                <link rel="canonical" href={'https://consolitex.org'} />
                {/* Geolocalizacion */}
                <meta name="geo.region" content="VE" />
                <meta name="robots" content="follow, index" />
                <meta name="googlebot" content="follow, index" />

                <title>{`Crear cuenta | Consolitex®`}</title>
            </Head>
            <Box sx={styles.mainContainer}>
                <Box sx={styles.loginContainer}>
                    <Button onClick={() => router.push("/")} startIcon={<ArrowBackRounded />} sx={{ ...styles.link, mb: 4 }}>Volver al inicio</Button>
                    <Typography variant="h4" sx={{ fontFamily: "Plus Jakarta Sans", fontWeight: "800" }}>Regístrate</Typography>
                    <Typography variant="subtitle2" color="text.secondary" sx={{ fontFamily: "Plus Jakarta Sans", mb: 4 }}>Obtén diferentes herramientas adicionales en nuestro sitio web!</Typography>
                    <Formik
                        initialValues={initialValues}
                        onSubmit={(values, { resetForm }) => onSubmit(values, resetForm)}
                        validationSchema={SignupSchema}
                    >
                        {({ values, handleSubmit, handleChange, errors, touched }) => (
                            <Form onSubmit={handleSubmit}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField label="Nombres" name="nombres" value={values.nombres} onChange={handleChange} fullWidth sx={styles.input} error={/[^ a-zA-ZáéíóúÁÉÍÓÚ]/g.test(values.nombres) ? true : errors.nombres && touched.nombres ? true : false} helperText={/[^ a-zA-ZáéíóúÁÉÍÓÚ]/g.test(values.nombres) ? 'Sólo se aceptan letras' : errors.nombres && touched.nombres ? errors.nombres : ''} />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField label="Apellidos" name="apellidos" value={values.apellidos} onChange={handleChange} fullWidth sx={styles.input} error={/[^ a-zA-ZáéíóúÁÉÍÓÚ]/g.test(values.apellidos) ? true : errors.apellidos && touched.apellidos ? true : false} helperText={/[^ a-zA-ZáéíóúÁÉÍÓÚ]/g.test(values.apellidos) ? 'Sólo se aceptan letras' : errors.apellidos && touched.apellidos ? errors.apellidos : ''} />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField label="Email" name="email" value={values.email} onChange={handleChange} fullWidth sx={styles.input} error={errors.email && touched.email ? true : false} helperText={errors.email && touched.email ? errors.email : ''} />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField label="Telefono" name="telefono" value={values.telefono} onChange={handleChange} fullWidth sx={styles.input} error={errors.telefono && touched.telefono ? true : false} helperText={errors.telefono && touched.telefono ? errors.telefono : ''} />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField type={show ? "text" : "password"} InputProps={{
                                            endAdornment: <InputAdornment position="end" sx={{ mr: 1 }}>
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                >
                                                    {show ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }} label="Contraseña" name="password" value={values.password} onChange={handleChange} fullWidth sx={styles.input}
                                            error={errors.password && touched.password ? true : false} helperText={errors.password && touched.password ? errors.password : ''}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField type={show ? "text" : "password"} InputProps={{
                                            endAdornment: <InputAdornment position="end" sx={{ mr: 1 }}>
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                >
                                                    {show ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }} label="Confirmar contraseña" name="confirmPassword" value={values.confirmPassword} onChange={handleChange} fullWidth sx={styles.input}
                                            error={errors.confirmPassword && touched.confirmPassword ? true : (values.password !== values.confirmPassword ? true : false)} helperText={errors.confirmPassword && touched.confirmPassword ? errors.confirmPassword : (values.password !== values.confirmPassword ? 'Las contraseñas no coinciden' : '')}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button type="submit" color="primary" variant="contained" sx={styles.button} disableElevation fullWidth>Iniciar</Button>
                                    </Grid>
                                </Grid>
                            </Form>
                        )}
                    </Formik>
                    <Box sx={styles.linkContainer}>
                        <Typography variant="subtitle1" sx={{ p: 1 }}>¿Ya tienes cuenta? &nbsp;</Typography>
                        <Button sx={{ ...styles.link }} onClick={() => router.push("/auth/login")}>Inicia sesión</Button>
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
        </>
    )
}
export default RegisterPage;
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
        "& fieldset": {
            borderRadius: "30px",
        },
        "& input": {
            fontFamily: "Plus Jakarta Sans",
            borderRadius: "30px"
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