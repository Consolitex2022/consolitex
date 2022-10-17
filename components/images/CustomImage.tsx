import Image from 'next/image';
import Box from '@mui/material/Box';
import styles from './CustomImage.module.css';

interface Props {
    src: string;
    alt: string;
    upperBoxStyles?: any;
    priority?: boolean;
}

export const CustomImage: React.FC<Props> = ({ upperBoxStyles, src, alt, priority = false }) => {
    return (
        <Box sx={upperBoxStyles && { ...upperBoxStyles }}>
            <Box component="div" sx={{ position: "relative", width: "100%", height: "auto" }} className={styles["unset-img"]}>
                {
                    priority
                        ? (<Image src={src} layout='fill' className={styles["custom-img"]} alt={alt} loading="lazy" />)
                        : (<Image src={src} layout='fill' className={styles["custom-img"]} alt={alt} loading="lazy" />)
                }
            </Box>
        </Box>
    )
}
