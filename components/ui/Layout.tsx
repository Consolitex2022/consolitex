import { ReactNode, FC, Suspense } from "react";
import dynamic from "next/dynamic";
import { Box } from "@mui/material";
import { AppBarComponent } from "./AppBarComponent";

import { Footer } from "./Footer";

import Head from 'next/head';


interface Props {
    title: string;
    description: string;
    transparent?: boolean;
    children: ReactNode;
    footer?: boolean;
}

const canonical = "https://consolitex.org";

const keywords = "casas en valencia, apartamentos en valencia, aparamentos en los guayos, paraparal, san diego, naguanagua, mañongo, apartamentos en naguanagua, apartamentos en carabobo, inmuebles en valencia, inmuebles en carabobo, empresa de inmuebles en valencia, empresa de inmuebles en carabobo, bienes y raices venezuela, inmobiliarias en valencia carabobo, bienes raices venezuela, consolitex, inmobiliarias en carabobo, inmobiliarias en valencia carabobo, bienes y raices venezuela, bienes raices venezuela, bienes raices, inmuebles, inmobiliaria, inversion, invertir, valencia, venezuela, carabobo, aragua, falcon, caracas, margarita, vacacionales, vacaciones, venta, alquiler, casas, quintas, apartamentos, town house, preventa, mercado, secundario, primario";

const og = {
    title: "Inmuebles en Carabobo | Consolitex® Bienes Raíces",
    url: "https://consolitex.org",
    image: "https://consolitex.org/assets/img/banner.webp",
    type: "website",
    description: "Gran variedad de inmuebles | Comprar, alquilar y vender apartamentos, casas, townhouses, terrenos y más ¡en Consolitex lo encuentras!"
}

const Layout: FC<Props> = ({ title, description, children, transparent = false, footer = true }) => {
    return (
        <Box sx={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", flexWrap: "nowrap" }}>

            {/* Header */}
            <Head>
                <meta charSet="UTF-8" />
                <meta name="author" content="Linz Web Development (Jose Linares)" />
                <meta name="description" content={description} />
                <meta name="copyright" content="Consolitex®" />
                {/* Palabras clave */}
                <meta name="news_keywords" content={keywords}></meta>
                {/* Link canónico */}
                <link rel="canonical" href={canonical} />
                {/* Geolocalizacion */}
                <meta name="geo.region" content="VE" />
                <meta name="robots" content="follow, index" />
                <meta name="googlebot" content="follow, index" />
                {/* Share media */}
                <meta property="og:title" content={og.title} />
                <meta property="og:url" content={og.url} />
                <meta property="og:image" content={og.image} />
                <meta property="og:type" content={og.type} />
                <meta property="og:description" content={og.description}></meta>
                <meta httpEquiv="Cache-Control" content="no-cache"></meta>
                <title>{`${title} | Consolitex®`}</title>
            </Head>


            {/* Navbar */}
            <Box sx={{ zIndex: "2" }}>
                <AppBarComponent title={title} transparent={transparent} />
            </Box>

            {/* Main content */}
            <Box sx={{ flexGrow: 1, minHeight: "100vh" }}>{children}</Box>

            {/* Footer */}
            {footer && (<Footer />)}
        </Box>
    )
}

export default Layout;