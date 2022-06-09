import { Box, Typography } from '@mui/material';
import { useState, useEffect, FC } from 'react';
import { IProject } from '../../interfaces';
import { CarouselPage, FullScreenLoading } from '../ui';

interface Props {
    data: IProject[]
}

export const ProjectsCarousel: FC<Props> = ({ data }) => {
    const [isLoading, setIsLoading] = useState(false)
    useEffect(() => {
        const timeout = setTimeout(() => {
            let counter = 0
            counter++
            if (counter > 0) {
                setIsLoading(true)
                clearInterval(timeout)
            }
        }, 200);
    }, [])
    return (

        <>

            {
                isLoading
                    ? (
                        <>
                            <Box display='flex' justifyContent='center'>
                                <Typography variant='h4' sx={{ m: 4, fontFamily: 'Bree Serif',color:'aliceblue' }}>Projects</Typography>
                            </Box>
                            <CarouselPage data={data} />
                        </>
                    )
                    : <FullScreenLoading />
            }

        </>
    )
}
