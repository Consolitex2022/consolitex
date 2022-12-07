import { FC, useState, MouseEvent, KeyboardEvent } from 'react'

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/MenuRounded';
import Image from 'next/image';

import { DrawerComponent } from './mobileMenu';

export const MenuMobile: FC = () => {
    const [state, setState] = useState<boolean>(false);

    const toggleDrawer =
        (open: boolean) =>
            (event: KeyboardEvent | MouseEvent) => {
                if (
                    event.type === 'keydown' &&
                    ((event as KeyboardEvent).key === 'Tab' ||
                        (event as KeyboardEvent).key === 'Shift')
                ) {
                    return;
                }

                setState(open);
            };
    return (<>
        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'flex' }, alignItems: "center", justifyContent: "space-between" }}>
            <IconButton onClick={toggleDrawer(true)} >
                <MenuIcon />
            </IconButton>
            <Box sx={{ mr: 2, display: { xs: 'flex', md: 'flex' }, flexGrow: 1, textDecoration: 'none', }}>
                <Image src='/logo.png' width='100' height='100' />
            </Box>
        </Box>
        <DrawerComponent toggleDrawer={toggleDrawer} state={state} />
    </>
    )
}