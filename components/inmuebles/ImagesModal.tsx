import Image from "next/image"
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import CloseIcon from "@mui/icons-material/Close";
import Masonry from "@mui/lab/Masonry";
import styles from "./ImagesModal.module.css";
import { CustomImage } from "../images/CustomImage";
interface Props {
    open: boolean;
    handleClose: () => void;
    imagenes: any;
    data: any;
}
export const ImagesModal: React.FC<Props> = ({ open, handleClose, imagenes, data }) => {
    return (
        <Dialog fullScreen open={open} onClose={handleClose} PaperProps={{ sx: { background: "#f5f5f5" } }}>
            <AppBar sx={{ position: 'sticky', top: 0, left: 0, boxShadow: "0 0 5px rgba(0,0,0,0.1)", background: "#FFF" }} color="neutral" elevation={0}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={handleClose}
                        aria-label="close"
                    >
                        <CloseIcon />
                    </IconButton>
                    <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                        Imágenes del inmueble
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box sx={{ display: { xs: "block", md: "block" } }}>
                <Box sx={{ width: "80%", margin: "20px auto", minHeight: "100vh", overflow: "hidden" }}>
                    <Masonry columns={{ xs: 1, md: 2 }} spacing={1}>
                        {
                            imagenes && imagenes.map((img: any) => (
                                img && img.map((i: any) => (
                                    <CustomImage key={i} upperBoxStyles={{ borderRadius: 5, overflow: "hidden" }} src={`https://images.consolitex.org/newImg.php?url=${encodeURI(i)}`} alt={data.nombre} />
                                )
                                ))
                            )
                        }
                        {/* <Box sx={{ background: "paleturquoise", maxWidth: 370, minHeight: 185, borderRadius: 5, display: "flex", alignItems: "center", flexFlow: "column wrap" }}>
                            <Image src='/logo.webp' alt='Logo Consolitex - Gallery' width='80' height='80' />
                            <Box>
                                <Typography variant="h6" sx={{ fontStyle: "italic", textAlign: "center" }} color="common.white">¡Siempre te damos más!</Typography>
                                <Typography variant="h6" sx={{ fontStyle: "italic", textAlign: "center" }} color="common.white">¿Te gusta lo que ves?</Typography>
                            </Box>
                        </Box>
                        <Box sx={{ background: "khaki", maxWidth: 370, minHeight: 185, borderRadius: 5, display: "flex", alignItems: "center", flexFlow: "column wrap" }}>
                            <Image src='/logo.webp' alt='Logo Consolitex - Gallery' width='80' height='80' />
                            <Box>
                                <Typography variant="h6" sx={{ fontStyle: "italic", textAlign: "center" }} color="common.white">¡Síguenos en las redes sociales! @consolitex</Typography>
                                <Typography variant="h6" sx={{ fontStyle: "italic", textAlign: "center" }} color="common.white">#hogarfamiliabienestar</Typography>
                            </Box>
                        </Box> */}
                    </Masonry>

                </Box>
            </Box>
        </Dialog>
    )
}

