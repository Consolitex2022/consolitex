import { FC, useState, useContext, useEffect, ChangeEvent, useRef } from 'react';
import { NextPage, GetServerSideProps } from 'next';

import Layout from '../../../components/ui/Layout';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

import SaveRoundedIcon from '@mui/icons-material/SaveRounded';
import PlusIcon from '@mui/icons-material/AddCircleOutlineRounded';
import TrashRoundedIcon from '@mui/icons-material/DeleteRounded';
import ImageRoundedIcon from '@mui/icons-material/AddAPhoto';

import { CustomImage } from '../../../components/images/CustomImage';
import { AuthContext } from '../../../context/authcontext';
import { validarToken, validateSession } from '../../../utils/functions';
import { ValidatedUser } from '../..';

import { red, blue } from '@mui/material/colors';

import Swal from 'sweetalert2';
import axios from 'axios';

interface Props {
    id: string;
    photos: ObjectImagenes;
    validatedUser: ValidatedUser;
}
interface ObjectImagenes {
    imagenes: Imagenes;
}
interface Imagenes {
    uno?: string[];
    dos?: string[];
    tres?: string[];
    cuatro?: string[];
    cinco?: string[];
    seis?: string[];
}
const PhotoEditPage: NextPage<Props> = ({ id, photos, validatedUser }) => {

    console.log(validatedUser)
    const userData = useContext(AuthContext)
    useEffect(() => {
        validateSession(userData, validatedUser);
    }, [])

    const urls = {
        uno: `https://consolitex.org/newImg.php?nowatermark=1&url=fotos/${id}/2/`,
        dos: `https://consolitex.org/newImg.php?nowatermark=1&url=fotos/${id}/3/`,
        tres: `https://consolitex.org/newImg.php?nowatermark=1&url=fotos/${id}/4/`,
        cuatro: `https://consolitex.org/newImg.php?nowatermark=1&url=fotos/${id}/5/`,
        cinco: `https://consolitex.org/newImg.php?nowatermark=1&url=fotos/${id}/6/`,
        seis: `https://consolitex.org/newImg.php?nowatermark=1&url=fotos/${id}/7/`,
    }
    return (
        <Layout title={'Editar fotos | Consolitex'} description={'Edicion de fotos del inmueble'}>

            {photos.imagenes.uno && (
                <ImagesContainer baseUrl={urls.uno} images={photos.imagenes.uno} id={id} carpeta={2} />
            )}
            {photos.imagenes.dos && (
                <ImagesContainer baseUrl={urls.dos} images={photos.imagenes.dos} id={id} carpeta={3} />
            )}
            {photos.imagenes.tres && (
                <ImagesContainer baseUrl={urls.tres} images={photos.imagenes.tres} id={id} carpeta={4} />
            )}
            {photos.imagenes.cuatro && (
                <ImagesContainer baseUrl={urls.cuatro} images={photos.imagenes.cuatro} id={id} carpeta={5} />
            )}
            {photos.imagenes.cinco && (
                <ImagesContainer baseUrl={urls.cinco} images={photos.imagenes.cinco} id={id} carpeta={6} />
            )}
            {photos.imagenes.seis && (
                <ImagesContainer baseUrl={urls.seis} images={photos.imagenes.seis} id={id} carpeta={7} />
            )}
        </Layout>
    )

}

interface PropsImages {
    baseUrl: string;
    images: any[];
    carpeta: number;
    id: string;
}
const ImagesContainer: FC<PropsImages> = ({ baseUrl, images, carpeta, id }) => {
    const [imagesToUpload, setImagesToUpload] = useState<any>(null);
    const inputFileRef = useRef<HTMLInputElement>(null);
    // console.log({ imagesToUpload })
    const location = `${id}/${carpeta}`
    // Función para subir las imágenes al endpoint
    const subirImagenes = async () => {
        const alerta = await Swal.fire({ title: "¿Deseas subir las imagenes?", showCancelButton: true, showConfirmButton: true, cancelButtonColor: red[500], confirmButtonColor: blue[500] })

        if (alerta.isConfirmed) {
            try {
                // URL del endpoint donde se enviarán las imágenes
                const url = `https://consolitex.org/api/v1/fotos/multiple.php`;

                // Crea una instancia de FormData para almacenar las imágenes y otros datos
                const formData = new FormData();

                // Convierte el FileList en un array
                const imagesArray = Array.from(imagesToUpload as FileList);
                // console.log({ imagesArray })
                if (imagesArray.length > 1) {

                    let counter = 0;
                    // Itera sobre los archivos
                    imagesArray.forEach((image) => {
                        counter++;
                        formData.append(`images[${counter}]`, image);

                    });
                } else if (imagesArray.length === 1) {
                    formData.append(`images`, imagesArray[0]);
                }

                // Agrega otros datos necesarios al FormData
                formData.append('location', location);
                formData.append('accion', 'subirvarias');

                // Realiza la solicitud HTTP utilizando Axios
                const response = await axios.post(url, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                // Procesa la respuesta del servidor
                switch (response.status) {

                    case 200:
                        // const responseData = await response.json();
                        console.log(response);
                        Swal.fire({
                            title: "Exito",
                            text: "Se reemplazo la imagen",
                            icon: "success",
                            timer: 2000,
                            timerProgressBar: true,
                            showConfirmButton: false,
                        })
                        setImagesToUpload(null);
                        break;
                    case 204:
                        Swal.fire({
                            title: "Error",
                            text: "Ruta no existe",
                            icon: "warning",
                            timer: 2000,
                            timerProgressBar: true,
                            showConfirmButton: false,
                        })
                        break;
                    case 400:
                        Swal.fire({
                            title: "Error",
                            text: "No se subieron las imagenes",
                            icon: "error",
                            timer: 2000,
                            timerProgressBar: true,
                            showConfirmButton: false,
                        })
                        break;
                    default:
                        Swal.fire({
                            title: "Error",
                            text: "Error en el servidor",
                            icon: "error",
                            timer: 2000,
                            timerProgressBar: true,
                            showConfirmButton: false,
                        })
                        break;
                }
            } catch (error) {
                // Manejo de errores
                console.error(error);
                // Aquí puedes realizar acciones adicionales en caso de error al subir las imágenes
            }
        } else {
            setImagesToUpload(null);
        }
    };
    // // Función para manejar la selección de imágenes desde el input file
    // const handleFile = (event: ChangeEvent<HTMLInputElement>) => {
    //     const selectedImages = event.target.files;
    //     setImagesToUpload(selectedImages);
    // };

    // // Función para simular el click en el input-file
    // const chooseFile = () => {
    //     // Seleccionar el input del DOM utilizando una referencia

    //     if (inputFileRef.current) {
    //         // Añadir el listener al input para almacenar las imágenes en el state
    //         inputFileRef.current.addEventListener('change', handleFile);
    //         // Ejecutar un click en el input file oculto
    //         inputFileRef.current.click();
    //     }
    // };
    // Función para manejar la selección de imágenes desde el input file
    const handleFile = (event: Event & { target: HTMLInputElement }) => {
        const selectedImages = event.target.files;
        setImagesToUpload(selectedImages);
    };

    /**
     * Funcion para simular el click en el input-file
     */
    const chooseFile = () => {
        // Se selecciona el input del DOM
        const inputFile: HTMLElement = document.querySelector(`#multiple`) as HTMLElement;
        // Se añade el listener al input para almacenar las imagenes en el state
        inputFile.addEventListener('change', (e: Event) => handleFile(e as Event & { target: HTMLInputElement }));
        // Se ejecuta un click en el input file oculto
        inputFile.click();
    }
    return (
        <Box sx={styles.mainContainer}>
            <Box sx={{ display: "flex", alignItems: 'center', flexFlow: "row nowrap" }}>
                <Typography fontWeight="bold" fontSize={20} sx={{ fontFamily: "Plus Jakarta Sans" }}>Carpeta {carpeta}</Typography>
                {!imagesToUpload && (<Tooltip title="Subir varias imagenes">
                    <IconButton color="primary" onClick={chooseFile}>
                        <PlusIcon />
                    </IconButton>
                </Tooltip>)}
                {imagesToUpload && (<Tooltip title="Guardar imagenes">
                    <IconButton color="success" onClick={subirImagenes}>
                        <SaveRoundedIcon />
                    </IconButton>
                </Tooltip>)}
                <input type="file" id="multiple" ref={inputFileRef} multiple style={{ display: 'none' }} />
                {/* <input type="file" style={{ display: 'none' }} multiple id='multiple' accept="image/jpg, image/png, image/jpeg, image/webp" /> */}
            </Box>
            <Typography variant="subtitle2" sx={{ fontFamily: "Plus Jakarta Sans" }}>Imagenes de la carpeta {carpeta}</Typography>
            <Box sx={styles.imageContainer}>
                {images.map((imagen: string, i: number) => (
                    <SingleImage key={imagen + "-" + i} baseUrl={baseUrl} imagen={imagen} carpeta={carpeta} id={id} />
                )
                )}
            </Box>
        </Box>)
}
interface SingleImageProps {
    baseUrl: string;
    imagen: string;
    carpeta: number;
    id: string;
}
const SingleImage: FC<SingleImageProps> = ({ baseUrl, imagen, carpeta, id }) => {
    const [imageSelected, setImageSelected] = useState<File | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    // En donde se va a guardar la imagen
    const location = `${id}/${carpeta}`

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
            const url = `https://consolitex.org/api/v1/fotos/index.php`
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
            const url = `https://consolitex.org/api/v1/fotos/index.php?name=${imagen}&location=${location}`
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
export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { id } = ctx.query;
    const url = `https://consolitex.org/api/v1/fotos/index.php?codigo=${id}`;
    const user = await validarToken(ctx);
    const respuesta = await fetch(url);
    const photos = await respuesta.json();
    return {
        props: {
            id,
            photos,
            validatedUser: {
                logged: user.id === 0 ? false : true,
                user
            },
        }
    }
}
export default PhotoEditPage;