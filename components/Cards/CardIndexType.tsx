import { Card, CardMedia, Box, Typography } from "@mui/material"
import Image from 'next/image'
import { useState, useEffect } from "react"
import { Contact, FullScreenLoading } from "../ui"

export const CardIndexType = () => {
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
                    ? <Card sx={{ backgroundColor: 'rgba(20, 239, 0, 0.29)' }}>
                        <CardMedia image='/background-index.png'>
                            <Box display='flex' justifyContent='center' sx={{ display: { xs: 'block', sm: 'block', md: 'none' } }}>
                                <Image src='/me.png' width={330} height={420} />
                            </Box>
                            <Box display='flex' justifyContent='center'>
                                <Box display='flex' alignSelf='center' sx={{ display: { xs: 'none', sm: 'none', md: 'block' } }}>
                                    <Box sx={{ backgroundColor: 'rgba(0, 0, 0, 0.1)', }}>
                                        <Typography variant='h4' sx={{ m: 1 }} className='typeWriter'>Hi! I m Jorge Ochipinti. Thanks for visit my web!</Typography>
                                    </Box>
                                    <Box >
                                        <Contact />
                                    </Box>
                                </Box>
                                <Box display='flex' alignSelf='center' sx={{ display: { xs: 'block', sm: 'block', md: 'none' } }}>
                                    <Box sx={{ backgroundColor: 'rgba(0, 0, 0, 0.1)', }}>
                                        <Typography variant='body1' sx={{ m: 1, }} className='typeWriter'>Hi! I m Jorge Ochipinti. Thanks for visit my web!</Typography>
                                    </Box>
                                </Box>
                                <Box display='flex' justifyContent='center' sx={{ display: { xs: 'none', sm: 'none', md: 'block' } }}>
                                    <Image src='/me.png' width={330} height={420} />
                                </Box>
                            </Box>
                        </CardMedia>
                    </Card>
                    :
                    <Card sx={{ backgroundColor: 'rgba(20, 239, 0, 0.29)' }}>
                        <FullScreenLoading />
                    </Card>
            }
        </>

    )
}

