import { FC } from 'react';
import Image from 'next/image';
import { Box } from '@mui/material';
import styles from './CustomImage.module.css';

interface Props {
    src: string;
    alt: string;
    upperBoxStyles?: any;
}

export const CustomImage: FC<Props> = ({ upperBoxStyles, src, alt }) => {
    return (
        <Box sx={upperBoxStyles && { ...upperBoxStyles }}>
            <Box component="div" sx={{ position: "relative", width: "100%", height: "auto" }} className={styles["unset-img"]}>
                <Image src={src} layout='fill' className={styles["custom-img"]} alt={alt} placeholder="blur" blurDataURL='/placeholder/placeholder.gif' />
            </Box>
        </Box>
    )
}
