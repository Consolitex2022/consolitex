import { Suspense, useContext, useEffect } from 'react';
import { NextPage, GetServerSideProps } from 'next';

import Layout from '../../../components/ui/Layout';

import { AuthContext } from '../../../context/authcontext';
import { validarToken, validateSession } from '../../../utils/functions';
import { ValidatedUser } from '../..';

import dynamic from 'next/dynamic';

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
    const ImagesContainer = dynamic(import('../../../components/imageEdition').then((mod) => mod.ImagesContainer));

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
                <Suspense fallback="Cargando...">
                    <ImagesContainer baseUrl={urls.uno} images={photos.imagenes.uno} id={id} carpeta={2} />
                </Suspense>
            )}
            {photos.imagenes.dos && (
                <Suspense fallback="Cargando...">
                    <ImagesContainer baseUrl={urls.dos} images={photos.imagenes.dos} id={id} carpeta={3} />
                </Suspense>
            )}
            {photos.imagenes.tres && (
                <Suspense fallback="Cargando...">
                    <ImagesContainer baseUrl={urls.tres} images={photos.imagenes.tres} id={id} carpeta={4} />
                </Suspense>
            )}
            {photos.imagenes.cuatro && (
                <Suspense fallback="Cargando...">
                    <ImagesContainer baseUrl={urls.cuatro} images={photos.imagenes.cuatro} id={id} carpeta={5} />
                </Suspense>
            )}
            {photos.imagenes.cinco && (
                <Suspense fallback="Cargando...">
                    <ImagesContainer baseUrl={urls.cinco} images={photos.imagenes.cinco} id={id} carpeta={6} />
                </Suspense>
            )}
            {photos.imagenes.seis && (
                <Suspense fallback="Cargando...">
                    <ImagesContainer baseUrl={urls.seis} images={photos.imagenes.seis} id={id} carpeta={7} />
                </Suspense>
            )}
        </Layout>
    )
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