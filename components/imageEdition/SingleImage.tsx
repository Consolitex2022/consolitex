import { FC, useState } from "react";

import Swal from "sweetalert2";
import { CustomImage } from "../images/CustomImage";
import StarIcon from '@mui/icons-material/StarRounded';

import { Box, Tooltip, IconButton, Typography } from "@mui/material";
import { red, blue } from "@mui/material/colors";
import SaveRoundedIcon from '@mui/icons-material/SaveRounded';
import PlusIcon from '@mui/icons-material/AddCircleOutlineRounded';
import TrashRoundedIcon from '@mui/icons-material/DeleteRounded';
import ImageRoundedIcon from '@mui/icons-material/AddAPhoto';
import axios from "axios";

interface SingleImageProps {
    baseUrl: string;
    imagen: string;
    carpeta: number;
    id: string;
}
export const SingleImage: FC<SingleImageProps> = ({ baseUrl, imagen, carpeta, id }) => {
    const [imageSelected, setImageSelected] = useState<File | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    // En donde se va a guardar la imagen
    const location = `${id}/${carpeta}`

    /**
     * Funcion para simular el click en el input-file
     */
    const chooseFavoriteImage = async () => {
        const alerta = await Swal.fire({ title: "¿Deseas establecer esta imagen como principal?", showCancelButton: true, showConfirmButton: true, cancelButtonColor: red[500], confirmButtonColor: blue[500] })
        if (alerta.isConfirmed) {
            const imagePath = `${location}/${imagen}`;

            const url = `https://api.consolitex.org/v2/fotos/move.php?imagePath=${imagePath}&codigo=${id}`
            try {
                const respuesta = await axios.get(url);
                console.log({ respuesta })
                switch (respuesta.status) {
                    case 200:
                        Swal.fire({
                            title: "Exito",
                            text: "Se ha movido a la carpeta principal",
                            icon: "success",
                            timer: 2000,
                            timerProgressBar: true,
                            showConfirmButton: false,
                        })
                        break;
                    default:
                        Swal.fire({
                            title: "Error",
                            text: "Direccion erronea",
                            icon: "error",
                            timer: 2000,
                            timerProgressBar: true,
                            showConfirmButton: false,
                        })
                        break;

                }
            } catch (error) {
                console.log({ error })
            }
        }
    }
    /**
     * Funcion para manejar el archivo del input-file al state
     * @param event Evento del input-file
    */
    const handleFile = (event: Event & { target: HTMLInputElement },) => {

        // Validar que existan imagenes seleccionadas y de cantidad de imagenes
        if (!event.target.files?.length || event.target.files?.length > 1) {
            // Se devuelve al state inicial de imagenes y progress
            setImageSelected(imageSelected);

            // Si existen imagenes seleccionadas, entonces se muestra la SweetAlert
            event.target.files?.length && Swal.fire({ text: `Por favor seleccione 1 imagen`, icon: "warning" });

            // No se modifica mas nada
            return false;
        };
        // State de imagen seleccionada
        setImageSelected(event.target.files[0])
    }
    /**
     * Funcion para simular el click en el input-file
     */
    const chooseFile = () => {
        // Se selecciona el input del DOM
        const inputFile: HTMLElement = document.querySelector(`#reemplazar`) as HTMLElement;
        // Se añade el listener al input para almacenar las imagenes en el state
        inputFile.addEventListener('change', (e) => handleFile(e as Event & { target: HTMLInputElement }));
        // Se ejecuta un click en el input file oculto
        inputFile.click();
    }
    /**
     * Funcion para reemplazar una imagen en el servidor de imagenes
     * @param imagen Nombre de la imagen
     */
    const reemplazarImagen = async (imagen: string) => {
        const alerta = await Swal.fire({ title: "¿Deseas reemplazar esta imagen?", showCancelButton: true, showConfirmButton: true, cancelButtonColor: red[500], confirmButtonColor: blue[500] })

        if (alerta.isConfirmed) {
            const url = `https://api.consolitex.org/v2/fotos/index.php`
            const body = new FormData();
            body.append('imagen', imageSelected ? imageSelected : '')
            body.append('previous_name', imagen)
            body.append('location', location)
            body.append('accion', 'reemplazar')
            body.append('id', String(id))
            const options = {
                method: 'POST',
                headers: {
                    "Accept": "application/json"
                },
                body
            }
            try {
                const respuesta = await fetch(url, options);

                switch (respuesta.status) {
                    case 200:
                        Swal.fire({
                            title: "Exito",
                            text: "Se reemplazo la imagen",
                            icon: "success",
                            timer: 2000,
                            timerProgressBar: true,
                            showConfirmButton: false,
                        })
                        setImageSelected(null);
                        setLoading(false)
                        break;
                    case 204:
                        Swal.fire({
                            title: "Error",
                            text: "Direccion erronea",
                            icon: "error",
                            timer: 2000,
                            timerProgressBar: true,
                            showConfirmButton: false,
                        })
                        break;
                    case 400:
                        Swal.fire({
                            title: "Error",
                            text: "Revise la imagen seleccionada, debe ser valida",
                            icon: "error",
                            timer: 2000,
                            timerProgressBar: true,
                            showConfirmButton: false,
                        })
                        break;
                    default:
                        Swal.fire({
                            title: "Error",
                            text: "No se logro conectar con el servidor, intente nuevamente",
                            icon: "error",
                            timer: 2000,
                            timerProgressBar: true,
                            showConfirmButton: false,
                        })
                        break;
                }
            } catch (error) {
                console.log(error);
                Swal.fire({
                    title: "Error",
                    text: "No se logro conectar con el servidor, intente nuevamente",
                    icon: "error",
                    timer: 2000,
                    timerProgressBar: true,
                    showConfirmButton: false,
                })
            }
        } else {
            setImageSelected(null);
        }
    }
    const borrarImagen = async () => {
        const alerta = await Swal.fire({ title: "¿Deseas borrar esta imagen?", showCancelButton: true, showConfirmButton: true, cancelButtonColor: red[500], confirmButtonColor: blue[500] })
        if (alerta.isConfirmed) {
            const url = `https://api.consolitex.org/v2/fotos/index.php?name=${imagen}&location=${location}`
            const options = {
                method: 'DELETE',
                headers: {
                    "Accept": "application/json"
                },
            }
            try {
                const respuesta = await fetch(url, options);
                switch (respuesta.status) {
                    case 200:
                        Swal.fire({
                            title: "Exito",
                            text: "Se elimino la imagen exitosamente",
                            icon: "success",
                            timer: 2000,
                            timerProgressBar: true,
                            showConfirmButton: false,
                        })
                        break;
                    case 400:
                        Swal.fire({
                            title: "Error",
                            text: "No se logro eliminar la imagen",
                            icon: "error",
                            timer: 2000,
                            timerProgressBar: true,
                            showConfirmButton: false,
                        })
                        break;
                    default:
                        Swal.fire({
                            title: "Error",
                            text: "Ocurrio un error en el servidor",
                            icon: "error",
                            timer: 2000,
                            timerProgressBar: true,
                            showConfirmButton: false,
                        })
                        break;
                }
            } catch (error) {
                console.log(error)
                Swal.fire({
                    title: "Error",
                    text: "No se logro conectar con el servidor, intente nuevamente",
                    icon: "error",
                    timer: 2000,
                    timerProgressBar: true,
                    showConfirmButton: false,
                })
            }

        }
    }
    return (
        <Box sx={{ display: "flex", flexFlow: "column nowrap" }}>
            <CustomImage alt={'fotaxo'} upperBoxStyles={styles.image} src={`${baseUrl}${imagen}`} />
            <Box sx={styles.actions}>
                {!imageSelected && (

                    <Tooltip title="Reemplazar imagen">
                        <IconButton onClick={chooseFile} size="small" color="info">
                            <ImageRoundedIcon />
                        </IconButton>
                    </Tooltip>
                )}
                {imageSelected && (

                    <Tooltip title="Guardar cambios">
                        <IconButton onClick={() => reemplazarImagen(imagen)} size="small" color="success">
                            <SaveRoundedIcon />
                        </IconButton>
                    </Tooltip>
                )}
                <input type="file" style={{ display: 'none' }} id='reemplazar' accept="image/jpg, image/png, image/jpeg, image/webp" />
                <Tooltip title="Borrar imagen">
                    <IconButton onClick={borrarImagen} size="small" color="error">
                        <TrashRoundedIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Establecer imagen principal">
                    <IconButton color="warning" size="small" onClick={chooseFavoriteImage}>
                        <StarIcon />
                    </IconButton>
                </Tooltip>
                <input type="file" style={{ display: 'none' }} id='favorite' accept="image/jpg, image/png, image/jpeg, image/webp" />
                <Tooltip title={imagen}>
                    <Typography variant="subtitle2">{imagen.length > 30 ? imagen.substr(0, 30) + '...' : imagen}</Typography>
                </Tooltip>
            </Box>
        </Box>
    )
}
const styles = {
    mainContainer: { borderRadius: 3, background: "#FFF", boxShadow: '0 8px 32px rgba(0,0,0,0.1)', margin: 5, padding: 5, },
    imageContainer: { display: "flex", flexFlow: "row wrap", justifyContent: "center", alignItems: "center" },
    image: {
        width: 300,
        height: 300,
        borderRadius: 3,
        m: 2,
        overflow: "hidden"
    },
    actions: { display: "flex", justifyContent: 'center', alignItems: "center" }
}