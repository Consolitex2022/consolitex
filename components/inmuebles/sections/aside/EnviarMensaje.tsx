import { FC, useState } from 'react';

import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';

import { Formik, Form, FormikValues } from 'formik';

import Swal from 'sweetalert2';

import { CustomImage } from '../../../images/CustomImage';

import { styles } from '../styles';
import { TerminosCondiciones } from '.';

interface Props {
    data: any;
}

export const EnviarMensaje: FC<Props> = ({ data }) => {

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    /**
     * Funcion para poder enviar un mensaje de un usuario sobre un inmueble al correo
     * @param values Valores del form
     * @param resetForm Funcion para reiniciar los valores del form
     * @param data Datos del inmueble
     */
    const onSubmit = async (values: FormikValues, resetForm: () => void, data: any) => {

        let errors = [];

        setIsSubmitting(true);

        const { fullname = "", phone = "", message = "", email = "" } = values;

        if (!fullname) {
            errors.push("Debe indicar su nombre");
        }
        if (!phone) {
            errors.push("Debe proporcionar un número de contacto");
        }
        if (!message) {
            errors.push("Debe escribir un mensaje");
        }

        if (errors.length === 0) {

            const body = JSON.stringify({ fullname, phone, message, email, ficha_id: data.ficha_id, key: data.key })
            const options = {
                method: "POST",
                headers: {
                    "Content-Type": 'application/json'
                },
                body
            }

            try {
                const url = `/api/messages`
                const respuesta = await fetch(url, options);

                switch (respuesta.status) {
                    case 405:
                        Swal.fire({
                            title: "Error",
                            icon: "error",
                            html: "Error al conectar con el servidor",
                        });
                        setIsSubmitting(false);
                        break;
                    case 200:
                        const data = await respuesta.json();
                        Swal.fire({
                            title: "Éxito",
                            icon: "success",
                            html: "Mensaje enviado exitosamente",
                        });
                        setIsSubmitting(false);
                        break;
                    default: {
                        setIsSubmitting(false);
                    }
                }


            } catch (error) {
                console.log(error);
                Swal.fire({
                    title: "Error",
                    icon: "error",
                    html: "No se logró conectar",
                });
                setIsSubmitting(false)
            }
        } else {
            let errorString = ``;
            errors.map((error: string) => (errorString += `<div>-${error}</div>`));
            Swal.fire({
                title: "Error",
                icon: "error",
                html: errorString,
            });
            setIsSubmitting(false);
        }
    }
    return (
        <Box sx={{ ...styles.contentBox, }}>
            <Box sx={{ ...styles.gradientBoxSizes, ...styles.gradiantBoxShadow }}>
                <Box component="div" sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <CustomImage upperBoxStyles={{ borderRadius: 5, width: "100%", overflow: "hidden" }} src={`/likes.jpg`} alt={`Enviar mensaje interés - Consolitex`} />
                </Box>
                <Typography fontWeight="bold" variant="h6" sx={{ fontFamily: "Oxygen", fontSize: 16 }}>¿Te interesa este inmueble?</Typography>
                <Typography fontWeight="400" variant="subtitle2" sx={{ fontFamily: "Oxygen" }}>¡Envíanos un mensaje!</Typography>
                <Formik
                    initialValues={{
                        fullname: "",
                        phone: "",
                        email: "",
                        message: "",
                    }}
                    onSubmit={(values, { resetForm }) => onSubmit(values, resetForm, data)}
                    validateOnMount={false}
                    validateOnChange={false}
                    validateOnBlur={false}
                >
                    {({ values, handleSubmit, handleChange }) => (
                        <Form onSubmit={handleSubmit}>
                            <Grid container spacing={1} sx={{ mt: 2 }}>
                                <Grid item xs={12} sm={6}>
                                    <TextField InputProps={{ sx: { ...styles.input } }} fullWidth value={values.fullname} name="fullname" onChange={handleChange} label="Nombre" />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField InputProps={{ sx: { ...styles.input } }} fullWidth value={values.phone} name="phone" onChange={handleChange} label="Telefono" />
                                </Grid>
                                <Grid item xs={12} >
                                    <TextField InputProps={{ sx: { ...styles.input } }} fullWidth value={values.email} name="email" onChange={handleChange} label="Email" />
                                </Grid>
                                <Grid item xs={12} >
                                    <TextField InputProps={{ sx: { ...styles.input } }} multiline fullWidth value={values.message} name="message" onChange={handleChange} label="Mensaje" />
                                </Grid>
                                <Grid item xs={12} display="flex" flexDirection="column" >
                                    <LoadingButton loading={isSubmitting} fullWidth variant="contained" sx={{ p: 2, borderRadius: 5, textTransform: "none" }} type="submit" component="button" disableElevation>Enviar</LoadingButton>
                                    <Box sx={{ display: "flex", flexFlow: "column nowrap", margin: "auto", justifyContent: "center" }}>
                                        <Typography variant="subtitle2" color="text.secondary" fontWeight="bold" sx={{ mt: 1, fontFamily: "Oxygen" }}>Al clickear &quot;Enviar&quot; aceptas los</Typography>
                                        <TerminosCondiciones />
                                    </Box>
                                </Grid>
                            </Grid>
                        </Form>
                    )}
                </Formik>

            </Box>
        </Box>
    )
}