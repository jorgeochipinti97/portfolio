import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box } from '@mui/material';
import { FC } from 'react';

interface Props {
    title: string,
    body: string,
}

export const AccordionPage: FC<Props> = ({ title, body }) => {
    return (
        <div>
            <Box sx={{ width: '100vw' }} display='flex' justifyContent='center'>
                <Box sx={{ m: 3 }}>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                                <Typography variant='h6' sx={{fontWeigth:700}}>{title}</Typography>
      
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography align='justify' variant='body1' sx={{ m: 4 }}>
                                {body}
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                </Box>
            </Box>
        </div>
    );
}