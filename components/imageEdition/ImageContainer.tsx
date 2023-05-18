import { FC, useState, useRef, Suspense } from "react";

import axios from "axios";

import SaveRoundedIcon from '@mui/icons-material/SaveRounded';
import PlusIcon from '@mui/icons-material/AddCircleOutlineRounded';

import { Box, Typography, Tooltip, IconButton } from "@mui/material";
import { red, blue } from "@mui/material/colors";

import Swal from "sweetalert2";
import dynamic from "next/dynamic";

interface PropsImages {
    baseUrl: string;
    images: any[];
    carpeta: number;
    id: string;
}
export const ImagesContainer: FC<PropsImages> = ({ baseUrl, images, carpeta, id }) => {
    const SingleImage = dynamic(import('.').then((mod) => mod.SingleImage));

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
                            text: "Se subieron las imagenes",
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
                    <Suspense key={imagen + "-" + i} fallback="Cargando...">
                        <SingleImage key={imagen + "-" + i} baseUrl={baseUrl} imagen={imagen} carpeta={carpeta} id={id} />
                    </Suspense>
                )
                )}
            </Box>
        </Box>)
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