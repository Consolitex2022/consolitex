import { FC, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { Box, Typography, CircularProgress } from "@mui/material";
import Layout from "../components/ui/Layout";
import { AuthContext } from "../context/authcontext";

const EndPage: FC = () => {
    const router = useRouter();
    const { logOut } = useContext(AuthContext);
    useEffect(() => {
        logOut();
        router.push("/auth/login")
    }, [])
    return (
        <Layout title="Cerrando sesion" description="Cerrar sesion">
            <Box sx={styles.mainContainer}>
                <Box sx={styles.content}>
                    <Typography>Cerrando sesion</Typography>
                    <CircularProgress />
                </Box>

            </Box>
        </Layout>
    )
}
export default EndPage;
const styles = {
    mainContainer: {
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        flexAlign: "center",
        justifyContent: "center",
    },
    content: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2
    }
}