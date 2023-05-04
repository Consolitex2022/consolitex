import { FC, useState, Suspense } from 'react';

import dynamic from "next/dynamic";

import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import InfinityScroll from "react-infinite-scroll-component";

import Swal from 'sweetalert2';

import PlaceholderGrid from "../placeholders/InmuebleCardGridPlaceholder";
import PlaceholderNoGrid from "../placeholders/InmuebleCardNoGridPlaceholder";
import { ModalFiltros, SeccionSuperior, EndMessage } from './';
import { CustomImage } from '../images/CustomImage';
import { Inmueble } from '../../pages';
import { IFilter } from '../../interfaces';

interface Props {
    inmueblesSSR: Inmueble[] | null;
    toSSR?: string | number;
    fromSSR?: string | number;
    tipoSSR?: string;
    banosSSR?: string;
    querySSR?: string;
    negocioSSR?: string;
    localidadSSR?: string;
    habitacionesSSR?: string;
    estacionamientosSSR?: string;
}

export const InmuebleList: FC<Props> = ({ inmueblesSSR, localidadSSR = '', querySSR = '', negocioSSR = '', habitacionesSSR = '', banosSSR = '', fromSSR = 0, toSSR = 0, tipoSSR = '', estacionamientosSSR = '' }) => {
    const InmuebleCard = dynamic(() => import('./').then((mod) => mod.InmuebleCard));
    const InmuebleCardGrid = dynamic(() => import('./').then((mod) => mod.InmuebleCardGrid));

    // Tipo de card de inmueble (squared = true -> Card / squared = false -> CardGrid )
    const [squared, setSquared] = useState<boolean>(false);

    // Inmuebles a mostrar
    const [inmueblesState, setInmueblesState] = useState<any>(inmueblesSSR);

    // Key del ultimo inmueble, necesario para seguir la busqueda a partir de ese inmueble
    const [lastItemKey, setLastItemKey] = useState<any>(inmueblesSSR ? inmueblesSSR[inmueblesSSR.length - 1].data.key : 0);

    // Si está en true, al hacer scroll infinito se buscan más inmuebles
    const [hasMore, setHasMore] = useState<any>(inmueblesSSR && inmueblesSSR.length < 20 ? false : true);

    // Filtros recibidos por url
    const [initialFilter] = useState<IFilter>({
        to: toSSR,
        from: fromSSR,
        banos: banosSSR,
        query: querySSR,
        negocio: negocioSSR,
        localidad: localidadSSR,
        habitaciones: habitacionesSSR,
        estacionamientos: estacionamientosSSR,
        tipo: tipoSSR,
        filterAnterior: null,
    })

    // Filtros aplicados
    const [filters, setFilters] = useState<IFilter>(initialFilter)

    /**
     * Funcion para cambiar la vista de inmuebles (cards grandes o pequeñas)
     */
    const toggleSquare = () => {
        setSquared(prev => !prev)
    }

    /**
     * Funcion para buscar inmuebles al hacer scroll al bottom
     */
    const fetchData = async () => {
        const params = [];
        if (filters.tipo && filters.tipo !== '0') {
            params.push(['tipo', String(filters.tipo)])
        }
        if (filters.negocio && filters.negocio !== '0') {
            params.push(['negocio', String(filters.negocio)])
        }
        if (filters.habitaciones && filters.habitaciones !== '0') {
            params.push(['habitaciones', String(filters.habitaciones)])
        }
        if (filters.banos && filters.banos !== '0') {
            params.push(['banos', String(filters.banos)])
        }
        if (filters.estacionamientos && filters.estacionamientos !== '0') {
            params.push(['estacionamientos', String(filters.estacionamientos)])
        }
        if (filters.localidad && filters.localidad !== '0') {
            params.push(['localidad', String(filters.localidad)])
        }
        if (filters.from && Number(filters.from.toString().replace(/[^0-9]/g, '')) !== 0) {
            params.push(['from', String(filters.from.toString().replace(/[^0-9]/g, ''))])
        }
        if (filters.to && Number(filters.to.toString().replace(/[^0-9]/g, '')) !== 0) {
            params.push(['to', String(filters.to.toString().replace(/[^0-9]/g, ''))])
        }
        if (filters.query && filters.query !== '0') {
            params.push(['query', String(filters.query)])
        }
        const url = params.length > 0 ? new URL(`/api/infiniteScroll?lastItem=${lastItemKey}`, window.location.origin) : new URL(`/api/filter`, window.location.origin);
        params.push(["lastItem", String(lastItemKey)]);

        const urlParams = new URLSearchParams(params).toString();
        url.search = urlParams;

        try {

            const respuesta = await fetch(url);
            switch (respuesta.status) {
                case 200:
                    const data = await respuesta.json();
                    const inm = data.data;
                    const lastPosition = inm.length - 1;
                    const newLastItemKey = inm[lastPosition].data.key;
                    const newInmuebles = [...inmueblesState, ...inm]
                    setInmueblesState(newInmuebles);
                    setLastItemKey(newLastItemKey);
                    if (inm.length < 20) {
                        setHasMore(false);
                    } else {
                        setHasMore(true);
                    }
                    break;
                case 204:
                    Swal.fire({
                        title: "Oops!",
                        text: "No se encontraron resultados",
                        icon: "error"
                    })
                    setLastItemKey(0);
                    setInmueblesState(null);
                    setHasMore(false);
                    break;
                default:
                    Swal.fire({
                        title: "Oops!",
                        text: "No se encontraron resultados",
                        icon: "error"
                    })
                    setLastItemKey(0);
                    setInmueblesState(null);
                    setHasMore(false);
                    break;
            }
        } catch (error) {
            console.log(error);
            Swal.fire({
                title: "Oops!",
                text: "No se encontraron resultados",
                icon: "error"
            })
            setLastItemKey(0);
            setInmueblesState(null);
            setHasMore(false);
        }
    }
    /**
     * Funcion para buscar inmuebles al pulsar los botones de busquedas recomendadas
     * @param query datos a buscar
     */
    const fetchNewData = async (query: string) => {
        const url = `/api/infiniteScroll?query=${query}`;

        const respuesta = await fetch(url);

        const data = await respuesta.json();

        const inm = data.data;
        const lastPosition = inm.length - 1;
        const newLastItemKey = inm[lastPosition].data.key;
        setInmueblesState(inm);
        setLastItemKey(newLastItemKey);
        if (inm.length < 20) {
            setHasMore(false);
        } else {
            setHasMore(true);
        }
    }

    const propsSeccion = { filters, setFilters, setInmueblesState, setLastItemKey, setHasMore, toggleSquare, squared, fetchData, initialFilter, inmueblesState }

    return (
        <Box sx={styles.mainContainer}>

            <SeccionSuperior {...propsSeccion} />
            <InfinityScroll
                dataLength={inmueblesState && inmueblesState.length > 0 ? inmueblesState.length : 0}
                hasMore={hasMore}
                loader={
                    <LinearProgress />
                }
                endMessage={
                    <EndMessage fetchNewData={fetchNewData} />
                }
                next={fetchData}
            >

                {
                    inmueblesState?.length > 0
                        ?
                        squared
                            ?
                            inmueblesState.map((inmueble: Inmueble) => (
                                <Suspense fallback={<PlaceholderNoGrid />} key={inmueble.data.key}>
                                    <InmuebleCard key={inmueble.data.key} inmueble={inmueble} />
                                </Suspense>
                            ))

                            : (<Box sx={styles.containerCardGrid}>
                                {
                                    inmueblesState.map((inmueble: Inmueble) => (
                                        <Suspense fallback={<PlaceholderGrid />} key={inmueble.data.key}>
                                            <InmuebleCardGrid inmueble={inmueble} />
                                        </Suspense>
                                    ))
                                }
                            </Box>)
                        : ''
                }
            </InfinityScroll>
        </Box>
    )
}

const styles = {
    mainContainer: {
        width: {
            xs: "100%",
            md: "90%"
        },
        margin: "20px auto"
    },
    containerCardGrid: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-evenly",
        width: "100%"
    }

}