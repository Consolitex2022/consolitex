import { FC, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export const TerminosCondiciones: FC = () => {
    const [open, setOpen] = useState<boolean>(false)

    const handleClose = () => {
        setOpen(false);
    }
    return (
        <>
            <Button component="p" color="primary" onClick={() => setOpen(true)} sx={{ p: 0, textTransform: "none", ml: 1, borderRadius: 5 }}>Términos y condiciones</Button>
            <Dialog fullScreen open={open} onClose={handleClose} PaperProps={{ sx: { background: "#f5f5f5" } }}>
                <AppBar sx={{ position: 'sticky', top: 0, left: 0, boxShadow: "0 0 5px rgba(0,0,0,0.1)", background: "#FFF" }} color="neutral" elevation={0}>
                    <Toolbar>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            Términos y condiciones
                        </Typography>
                        <Button
                            color="success"
                            onClick={handleClose}
                            aria-label="close"
                            variant="contained"
                            disableElevation
                            sx={{ paddingBlock: 0, paddingInline: 1, textTransform: "none", borderRadius: 5 }}
                        >
                            ¡Comprendido!
                        </Button>
                    </Toolbar>
                </AppBar>
                <Box sx={{ width: { xs: "100%", md: "80%" }, margin: "20px auto", background: "#FFF", borderRadius: 5, p: 2 }}>
                    <Typography component="p" sx={{ textAlign: "justify" }}>
                        Los datos enviados en el formulario son almacenados en la base de datos de la empresa CONSOLITEX® para el posterior contacto con el cliente através de los datos introducidos. La empresa CONSOLITEX®, no almacena ningún dato personal del usuario aparte de los introducidos en el formulario.
                        Al clickear en el boton &quot;Enviar&quot;, concede permiso a la empresa CONSOLITEX® para poder realizar llamadas al número introducido y enviar correos electrónicos al correo electrónico introducido, con el único propósito de contactar al cliente para otorgar información o llegar a una posible negociación del inmueble en cuestión.
                        Al clickear en el boton &quot;Enviar&quot;, se da fé que los datos introducidos son efectivamente propiedad del usuario que envío el formulario.
                    </Typography>
                </Box>
            </Dialog>
        </>
    )
}
