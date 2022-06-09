import { Box } from '@mui/system';
import Image from 'next/image';
import { FC } from 'react';
import { Fade } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'

interface Props {
    images: string[],
    heigth?: number,
    width?: number
}



export const SliderFade: FC<Props> = ({ images, heigth, width }) => {
    return (
        <div className="slide-container">
            <Fade
            duration={1000}
            arrows={false}
            indicators={true}
            >
                {images.map((e) => (
                    <div className="each-slide" key={e}>
                        <Box  display='flex' justifyContent='center'>
                            <Box >
                                <Image src={e} width={heigth ? heigth : 1800} height={width ? width : 1000} />
                            </Box>
                        </Box>
                    </div>
                ))}
            </Fade>
        </div>
    )
}