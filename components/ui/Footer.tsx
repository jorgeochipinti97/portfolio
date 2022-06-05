import { Box, Divider, Typography } from '@mui/material'
import React from 'react'
import MoodRoundedIcon from '@mui/icons-material/MoodRounded';import { Contact } from './Contact';
export const Footer = () => {
    return (
        <footer  style={{backgroundColor:'rgba(208, 100, 0, 0.9)'}}>
            <Box sx={{ mt: 5, pb: 5 }} >
                <Divider sx={{ my: 1 }} />
                <Contact />
                <Box display='flex' justifyContent='center'>
                    <Box display='flex'>
                <Typography variant='subtitle1'>Thanks for coming. </Typography><MoodRoundedIcon/>
                    </Box>
                </Box>
            </Box>
        </footer>
    )
}
