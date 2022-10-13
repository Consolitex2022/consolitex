import { FC, useState, Suspense } from 'react';
import dynamic from "next/dynamic";
import { Box, LinearProgress, Typography } from '@mui/material';

import { Inmueble } from '../../pages';

import PlaceholderGrid from "../placeholders/InmuebleCardGridPlaceholder";
import PlaceholderNoGrid from "../placeholders/InmuebleCardNoGridPlaceholder";
import InfinityScroll from "react-infinite-scroll-component";
import { SeccionSuperior } from './';

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
    const fetchData = async () => {
        const url = `/api/infiniteScroll?lastItem=${lastItemKey}`;

        const respuesta = await fetch(url);

        const data = await respuesta.json();

        const inm = data.data;
        const lastPosition = inm.length - 1;
        const newLastItemKey = inm[lastPosition].data.key;
        const newInmuebles = [...inmueblesState, ...inm]
        console.log(newInmuebles);
        setInmueblesState(newInmuebles);
        setLastItemKey(newLastItemKey);
        if (inm.length < 20) {
            setHasMore(false);
        } else {
            setHasMore(true);
        }
    }
    const onApply = async () => {

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
        const urlParams = new URLSearchParams(params).toString();
        const url = new URL(`https://consolitex.org/api/v1/inmuebles.php`);
        url.search = urlParams;
    }
    return (
        <>
            <SeccionSuperior squared={squared} toggleSquare={toggleSquare} setFilters={setFilters} filters={filters} />
            <InfinityScroll
                dataLength={inmueblesState.length}
                hasMore={hasMore}
                loader={
                    <LinearProgress />
                }
                endMessage={
                    <p style={{ textAlign: 'center' }}>
                        ¡Lo has visto todo!
                    </p>
                }
                next={fetchData}
            >

                {
                    inmuebles?.length > 0
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
                        : (<Typography>Nada de nada</Typography>)
                }
            </InfinityScroll>
        </>
    )
}
