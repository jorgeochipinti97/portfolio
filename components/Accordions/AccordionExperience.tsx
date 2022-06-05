import { Box, Typography } from '@mui/material';
import { FC } from 'react';
import { IExperience } from '../../interfaces';
import { AccordionPage } from '../ui';

interface Props {
    experiences: IExperience[]
}

export const AccordionExperience: FC<Props> = ({ experiences }) => {
    return (
        <>
            <Box display='flex' justifyContent='center'>
                <Typography variant='h4' sx={{ m: 4, fontFamily: 'Bree Serif' }}>Experience</Typography>
            </Box>
            <Box display='flex' justifyContent='center'>
                <Box display='flex' flexDirection='column'>
                    {
                        experiences.map(e => (
                            <AccordionPage title={e.title} body={e.body} />
                        ))
                    }
                </Box>
            </Box>
        </>
    )
}


