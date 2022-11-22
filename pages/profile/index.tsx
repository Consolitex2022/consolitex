import { useContext, useEffect } from 'react'
import { Grid, Box, Avatar, Typography, Divider } from '@mui/material';
import { GetServerSideProps, NextPage } from 'next';
import { ValidatedUser } from '..';
import { AuthContext } from '../../context/authcontext';
import { ColorPicker } from '../../components/profile/ColorPicker';
import { UserEditForm, UserInfo } from '../../components/profile';
import blue from '@mui/material/colors/blue';
import Layout from '../../components/ui/Layout';
import { validarToken, validateSession } from '../../utils/functions';

interface Props {
    validatedUser: ValidatedUser
}

const ProfilePage: NextPage<Props> = ({ validatedUser }) => {

    const userData = useContext(AuthContext)
    useEffect(() => {
        validateSession(userData, validatedUser);
    }, [])
    return (
        <Layout title="Mi perfil" description="">
            <Grid container spacing={1} sx={{ width: "90%", margin: "20px auto", minHeight: "100%", }}>
                <Grid item xs={12} sx={{ borderRadius: 5, background: "#FFF", boxShadow: '0 8px 32px 0 rgba(100,100,100,0.1)' }} >
                    <Box sx={{ display: "flex", flexFlow: "row wrap", justifyContent: { xs: "center", sm: "space-evenly", md: "space-between" }, p: 2 }}>
                        <Box sx={{ display: "flex", flexFlow: "row wrap", alignItems: "center" }}>
                            {userData.id !== 0 ? (<Avatar sx={{ bgcolor: userData.color ? userData.color : blue[700], mr: 2 }}>{userData.nombres.substring(0, 1)}</Avatar>) : (<></>)}
                            <Typography variant="subtitle1" color="text.primary" fontWeight="bold" >Color del avatar</Typography>
                        </Box>
                        <ColorPicker />
                    </Box>
                    <Divider sx={{ marginBlock: 2 }} />
                    <UserInfo />
                </Grid>
                <Grid item xs={12} >
                    <UserEditForm />
                </Grid>
            </Grid>
        </Layout>
    )
}


export const getServerSideProps: GetServerSideProps = async (ctx) => {

    const user = await validarToken(ctx);
    return {
        props: {
            validatedUser: {
                logged: user.id === 0 ? false : true,
                user
            }
        }
    }

}

export default ProfilePage;