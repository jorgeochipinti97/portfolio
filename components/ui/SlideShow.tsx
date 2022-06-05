import { FC } from 'react'
import { Slide } from 'react-slideshow-image'
import Image from 'next/image';
import 'react-slideshow-image/dist/styles.css';
import styles from './ProductSlideshow.module.css';
import { Box, Card, CardContent, Typography } from "@mui/material"

interface Props {
    images: string[],
    width_?: number,
    heigth_?: number,
}

export const SlideShow: FC<Props> = ({ images, width_, heigth_ }) => {

    return (
        <Box>
            <Slide
                easing="ease"
                duration={2000}
                arrows={false}


            >
                {
                    images.map(image => {
                        return (
                            <div className={styles['each-slide']} key={image}>

                                <Image width={heigth_ ? heigth_ : 1800} height={width_ ? width_ : 1000} src={image} alt={image} />

                            </div>
                        )

                    })
                }

            </Slide>
        </Box>
    )
}