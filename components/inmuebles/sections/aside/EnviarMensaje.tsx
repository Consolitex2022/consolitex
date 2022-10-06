import { Box, Typography, Grid, TextField, Button } from '@mui/material';
import { Formik, Form } from 'formik';
import { FC } from 'react';
import { styles } from '../styles';

interface Props {

}

export const EnviarMensaje: FC<Props> = () => {
    const onSubmit = async () => {

    }
    return (
        <Box sx={{ ...styles.contentBox, }}>
            <Box sx={{ ...styles.gradientBoxSizes, ...styles.gradiantBoxShadow }}>
                <Typography fontWeight="bold" variant="h6" sx={{ fontFamily: "Oxygen", fontSize: 16 }}>¿Te interesa este inmueble?</Typography>
                <Typography fontWeight="400" variant="subtitle2" sx={{ fontFamily: "Oxygen" }}>¡Envíanos un mensaje!</Typography>
                <Formik
                    initialValues={{
                        nombre: "",
                        telefono: "",
                        email: "",
                        mensaje: "",
                    }}
                    onSubmit={onSubmit}
                    validateOnMount={false}
                    validateOnChange={false}
                    validateOnBlur={false}
                >
                    {({ values, handleChange, handleSubmit }) => (
                        <Form>
                            <Grid container spacing={1} sx={{ mt: 2 }}>
                                <Grid item xs={12} sm={6}>
                                    <TextField fullWidth label="Nombre" />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField fullWidth label="Telefono" />
                                </Grid>
                                <Grid item xs={12} >
                                    <TextField fullWidth label="Email" />
                                </Grid>
                                <Grid item xs={12} >
                                    <TextField multiline fullWidth label="Mensaje" />
                                </Grid>
                                <Grid item xs={12} display="flex" flexDirection="column" >
                                    <Button fullWidth variant="contained" sx={{ p: 1.5 }}>Enviar</Button>
                                    <Typography variant="subtitle2" color="text.secondary" fontWeight="bold" sx={{ mt: 1, fontFamily: "Oxygen" }}>Al clickear &quot;Enviar&quot; aceptas los TERMINOS Y CONDICIONES</Typography>
                                </Grid>
                            </Grid>
                        </Form>
                    )}
                </Formik>

            </Box>
        </Box>
    )
}
