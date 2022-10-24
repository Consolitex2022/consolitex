import { FC, useState, Suspense } from 'react';
import dynamic from "next/dynamic";
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import { Inmueble } from '../../pages';

import PlaceholderGrid from "../placeholders/InmuebleCardGridPlaceholder";
import PlaceholderNoGrid from "../placeholders/InmuebleCardNoGridPlaceholder";
import InfinityScroll from "react-infinite-scroll-component";
import { ModalFiltros, SeccionSuperior } from './';
import { CustomImage } from '../images/CustomImage';
import search from '../../pages/search';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';

interface Props {
    inmuebles: Inmueble[];
}


export const InmuebleList: FC<Props> = ({ inmuebles }) => {
    const [squared, setSquared] = useState<boolean>(true);
    const InmuebleCard = dynamic(() => import('./').then((mod) => mod.InmuebleCard));
    const InmuebleCardGrid = dynamic(() => import('./').then((mod) => mod.InmuebleCardGrid));
    const [inmueblesState, setInmueblesState] = useState<any>(inmuebles);
    const [lastItemKey, setLastItemKey] = useState<any>(inmuebles[inmuebles.length - 1].data.key);
    const [hasMore, setHasMore] = useState<any>(inmuebles.length < 20 ? false : true);

    const [filters, setFilters] = useState<any>({
        banos: '',
        habitaciones: '',
        estacionamientos: '',
        from: 0,
        to: 0,
        localidad: '',
        negocio: '',
    })

    const toggleSquare = () => {
        setSquared(prev => !prev)
    }
    const router = useRouter();
    const search = (data: string) => {
        router.push({
            pathname: `/search`,
            query: {
                query: data
            }
        })
    }
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
        if (filters.from && filters.from !== 0) {
            params.push(['from', String(filters.from)])
        }
        if (filters.to && filters.to !== 0) {
            params.push(['to', String(filters.to)])
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
    // Control modal de filtros
    const [open, setOpen] = useState<boolean>(false);
    const props = { open, setOpen, filters, setFilters, setInmueblesState, inmueblesState, setLastItemKey, setHasMore }
    const propsSeccion = { filters, setFilters, setInmueblesState, setLastItemKey, setHasMore, toggleSquare, squared, setOpen }

    return (
        <Box sx={{ width: { xs: "100%", md: "90%" }, margin: "20px auto" }}>

            {/* Modal de filtros */}
            <ModalFiltros {...props} />
            <SeccionSuperior {...propsSeccion} />
            <InfinityScroll
                dataLength={inmueblesState && inmueblesState.length > 0 ? inmueblesState.length : 0}
                hasMore={hasMore}
                loader={
                    <LinearProgress />
                }
                endMessage={
                    <Box sx={{ display: "flex", flexFlow: "row wrap", width: "100%", justifyContent: "center", p: 2, borderRadius: 5 }}>
                        <CustomImage upperBoxStyles={{ width: 300 }} src="/searching-done.png" alt="No hay mas resultados - Consolitex" />
                        <Box sx={{ flexGrow: 1, textAlign: "center", }}>
                            <Typography variant="subtitle1" fontWeight="bold" sx={{ fontFamily: "Oxygen" }}>¡No hay más resultados!</Typography>
                            <Typography variant="subtitle2" sx={{ fontFamily: "Oxygen" }}>Al parecer se han agotado los resultados para tu búsqueda, te invitamos a ver algunas de las búsquedas más frecuentes</Typography>
                            <Button sx={{ textTransform: "none", mr: 1, mt: 1, borderRadius: 5 }} size="small" variant="outlined" onClick={() => fetchNewData('Apartamentos en Valencia')}>Apartamentos en Valencia</Button>
                            <Button sx={{ textTransform: "none", mr: 1, mt: 1, borderRadius: 5 }} size="small" variant="outlined" onClick={() => fetchNewData('Apartamentos en San Diego')}>Apartamentos en San Diego</Button>
                            <Button sx={{ textTransform: "none", mr: 1, mt: 1, borderRadius: 5 }} size="small" variant="outlined" onClick={() => fetchNewData('Apartamentos en Naguanagua')}>Apartamentos en Naguanagua</Button>
                            <Button sx={{ textTransform: "none", mr: 1, mt: 1, borderRadius: 5 }} size="small" variant="outlined" onClick={() => fetchNewData('Quintas en Valencia')}>Quintas en Valencia</Button>
                            <Button sx={{ textTransform: "none", mr: 1, mt: 1, borderRadius: 5 }} size="small" variant="outlined" onClick={() => fetchNewData('Townhouse en San Diego')}>Townhouse en San Diego</Button>
                            <Button sx={{ textTransform: "none", mr: 1, mt: 1, borderRadius: 5 }} size="small" variant="outlined" onClick={() => fetchNewData('Quintas en Naguanagua')}>Quintas en Naguanagua</Button>
                        </Box>
                    </Box>
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

                            : (<Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "space-evenly", width: "100%" }}>
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
