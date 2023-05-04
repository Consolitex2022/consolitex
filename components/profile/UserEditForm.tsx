import { FC, useContext, useState } from 'react'
import { Box, CircularProgress, Grid, Typography, TextField, Button } from '@mui/material';
import { FormikValues, FormikState, Formik, Form } from 'formik';
import Swal from 'sweetalert2';
import { AuthContext } from '../../context/authcontext';
import { UserData } from '../../interfaces/user-type';
import * as Yup from 'yup';


const userEditSchema = Yup.object().shape({
    nombres: Yup.string()
        .matches(/(?<primernombre>[a-zA-ZáéíóúÁÉÍÓÚ])+ (?<segundonombre>[a-zA-ZáéíóúÁÉÍÓÚ])+$/g, "Escriba ambos nombres")
        .min(3, 'Muy corto')
        .max(24, 'Muy largo'),
    apellidos: Yup.string()
        .matches(/(?<primerapellido>[a-zA-ZáéíóúÁÉÍÓÚ])+ (?<segundoapellido>[a-zA-ZáéíóúÁÉÍÓÚ])+$/g, "Escriba ambos apellidos")
        .min(3, 'Muy corto')
        .max(24, 'Muy largo'),
    email: Yup.string()
        .email('Email inválido'),
    telefono: Yup.string()
        .matches(/^(\+{1})?[0-9]+$/g, "Sólo se aceptan números")
        .min(10, 'Muy corto')
        .max(15, 'Muy largo'),
})

const styles = {
    input: {
        "& fieldset": { borderRadius: 10 },
        background: "#FFF",
        borderRadius: 5,
    },
    formContainer: {
        display: "flex",
        flexFlow: "row wrap",
        justifyContent: {
            xs: "center",
            sm: "space-evenly",
            md: "space-between"
        },
        background: "#FFF",
        p: 2,
        borderRadius: 5,
        boxShadow: "0 8px 32px 0 rgba(0,0,0,0.1)"
    }
}
export const UserEditForm: FC = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const { editData, id, nombres, apellidos, telefono, cedula, email, color, created_at, ref, rol, status, token } = useContext(AuthContext);

    const userInfo = { id, nombres, apellidos, telefono, cedula, email, color, created_at, ref, rol, status, token };
    const initialValues = { nombres, apellidos, email, telefono }
    /**
        * Funcion para enviar los datos a la API para editar informacion de usuario
        * @param values Datos del form
        * @param resetForm Funcion para reiniciar el formulario luego de enviar exitosamente los datos
        * @returns false si ocurre alguna novedad
    */
    const onSubmit = async (values: FormikValues, resetForm: (nextState?: Partial<FormikState<UserData>> | undefined) => void) => {
        setLoading(true);
        const url = `/api/profile/edit`;

        const body = JSON.stringify({
            nombres: values.nombres ? values.nombres : '',
            apellidos: values.apellidos ? values.apellidos : '',
            email: values.email ? values.email : '',
            telefono: values.telefono ? values.telefono : '',
            id
        });

        const newUserData = {
            ...userInfo,
            nombres: values.nombres ? values.nombres : nombres,
            apellidos: values.apellidos ? values.apellidos : apellidos,
            telefono: values.telefono ? values.telefono : telefono,
            email: values.email ? values.email : email,
        }
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
                    Swal.fire({
                        title: "Exito",
                        text: "Se han editado los datos exitosamente",
                        icon: "success",
                    });
                    editData(newUserData);
                    setLoading(false);
                    break;
                case 400:
                    console.log(await respuesta.json())
                    Swal.fire({
                        title: "Error",
                        text: "No se logró enviar los datos",
                        icon: "error",
                    });
                    setLoading(false);
                    break;
                default:
                    Swal.fire({
                        title: "Error",
                        text: "Error en el servidor",
                        icon: "error",
                    });
                    setLoading(false);
                    break;
            }
        } catch (err) {
            console.log(err);
            Swal.fire({
                title: "Error",
                text: "No se logró contectar al servidor",
                icon: "error",
            });
            setLoading(false);
        }
    }
    return (
        <>
            <Typography variant="overline" fontWeight="bold">Editar información de usuario</Typography>
            <Box sx={styles.formContainer}>

                <Formik
                    initialValues={initialValues}
                    onSubmit={(values, { resetForm }) => onSubmit(values, resetForm)}
                    validationSchema={userEditSchema}
                >
                    {({ handleChange, handleSubmit, values, errors, touched }) => (
                        <Form onSubmit={handleSubmit}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField name="nombres" color="primary" onChange={handleChange} error={/[^ a-zA-ZáéíóúÁÉÍÓÚ]/g.test(values.nombres) ? true : errors.nombres && touched.nombres ? true : false} variant="outlined" helperText={/[^ a-zA-ZáéíóúÁÉÍÓÚ]/g.test(values.nombres) ? 'Sólo se aceptan letras' : errors.nombres && touched.nombres ? errors.nombres : ''} sx={styles.input} InputProps={{ sx: { borderRadius: 5 } }} label="Nombres" fullWidth value={values.nombres} />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField name="apellidos" color="primary" onChange={handleChange} error={/[^ a-zA-ZáéíóúÁÉÍÓÚ]/g.test(values.apellidos) ? true : errors.apellidos && touched.apellidos ? true : false} variant="outlined" helperText={/[^ a-zA-ZáéíóúÁÉÍÓÚ]/g.test(values.apellidos) ? 'Sólo se aceptan letras' : errors.apellidos && touched.apellidos ? errors.apellidos : ''} sx={styles.input} InputProps={{ sx: { borderRadius: 5 } }} label="Apellidos" fullWidth value={values.apellidos} />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField name="email" color="primary" onChange={handleChange} error={errors.email && touched.email ? true : false} variant="outlined" helperText={errors.email && touched.email ? errors.email : ''} sx={styles.input} InputProps={{ sx: { borderRadius: 5 } }} label="Email" fullWidth value={values.email} />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField name="telefono" color="primary" onChange={handleChange} error={errors.telefono && touched.telefono ? true : false} variant="outlined" helperText={errors.telefono && touched.telefono ? errors.telefono : ''} sx={styles.input} InputProps={{ sx: { borderRadius: 5 } }} label="Teléfono" fullWidth value={values.telefono} />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button disabled={loading} type="submit" fullWidth disableElevation variant="contained" color="primary" sx={{ p: 2, borderRadius: 10, textTransform: "none" }}>{loading ? <CircularProgress sx={{ width: 20, height: 20 }} /> : 'Editar información'}</Button>
                                </Grid>
                            </Grid>
                        </Form>
                    )}
                </Formik>
            </Box>
        </>
    )
}
