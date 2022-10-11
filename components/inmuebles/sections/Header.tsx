import { FC, useState } from 'react'
import Image from 'next/image'
import { Box, Typography, Button } from '@mui/material';
import GalleryIcon from '@mui/icons-material/CollectionsRounded';
import { styles } from './styles';
import { ImagesModal } from '../ImagesModal';

interface Props {
    url_inmueble: string;
    data: any;
    imagenes: any;
}

export const Header: FC<Props> = ({ url_inmueble, data, imagenes }) => {
    const [open, setOpen] = useState<boolean>(false);
    const handleClose = () => {
        setOpen(false);
    }
    const handleOpen = () => {
        setOpen(true);
    }
    const imagesModalProps = { imagenes, handleClose, open, data }

    return (
        <Box sx={{ ...styles.mainContainer }}>
            <Box id="img" sx={{
                ...styles.mainContainer,
                "&:after": {
                    content: "''",
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    top: 0,
                    left: 0,
                    transition: ".2s ease all",
                    zIndex: 90,
                    background: "rgba(0,0,0,0.5)"
                }
            }}>
                <Image id="imagen" quality={50} src={`https://consolitex.org/newImg.php?nowatermark=1&url=${encodeURI(url_inmueble)}`} layout="fill" objectFit='cover' alt={data.nombre} priority />
            </Box>
            <Box component="div" sx={{ transition: ".2s ease all", zIndex: 200, position: "absolute", top: 0, left: 0, display: "flex", flexFlow: "row" }}>
                <Box id="secondary-content1" sx={{ ml: 4, mt: 5, position: "relative", width: 20 }}>
                    <Box sx={{ width: { xs: 5, md: 10 }, height: 200, background: "#FFF" }}></Box>
                </Box>
                <Box component="div" sx={{ mt: { xs: 3, md: 2 } }}>
                    <Typography id="secondary-content2" sx={{ transition: ".2s ease all", color: "#FFF", fontSize: { xs: "2em", md: "6em" }, fontFamily: "montserrat" }}>Consolitex<sup>®</sup></Typography>
                    <Typography id="secondary-content3" sx={{ transition: ".6s ease all", color: "#FFF", fontSize: { xs: "1em", md: "2em" }, fontFamily: "montserrat", fontStyle: "italic" }}>Bienes raíces #hogarfamiliabienestar</Typography>
                </Box>
            </Box>
            <Box id="ver-mas" sx={{ transition: ".2s ease all", position: "absolute", top: "50%", left: "50%", background: { xs: "transparent", md: "#FFF" }, borderRadius: 5, border: { xs: "1px solid #FFF", md: "none" }, overflow: "hidden", transform: { xs: "translateX(-50%) translateY(-50%) scale(1)", md: "translateX(-50%) translateY(-50%) scale(0)" }, p: 2, zIndex: 91 }}>
                <Button sx={{ textTransform: "none", p: 1.8, color: { xs: "#FFF", md: "dodgerblue" } }} color="primary" onClick={handleOpen}>
                    Ver fotos &nbsp;
                    <GalleryIcon />
                </Button>
            </Box>
            <ImagesModal {...imagesModalProps} />
        </Box>
    )
}
