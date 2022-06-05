import { Box, Button, } from '@mui/material'
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';import Link from 'next/link';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
export const Contact = () => {
    return (
        <>
            <Box display='flex' justifyContent='center' >
                <Box display='flex' justifyContent='space-around' sx={{ pt: 3, pb: 2, width: 400 }} >
                    <Box display='flex' justifyContent='center'>
                        <Button variant='contained'>
                            <Link href='https://www.linkedin.com/in/jorge-ochipinti-3232971a6/'>
                            <LinkedInIcon />
                            </Link>
                        </Button>
                    </Box>
                    <Box display='flex' justifyContent='center'>
                        <Button variant='contained'>
                            <Link href='https://github.com/jorgeochipinti97/'>
                            <GitHubIcon />
                            </Link>
                        </Button>
                    </Box>
                    <Box display='flex' justifyContent='center'>
                        <Button variant='contained'>
                            <Link href='mailto:ochipintijorge.dev@gmail.com'>
                            <EmailRoundedIcon />
                            </Link>
                        </Button>
                    </Box>
                    <Box display='flex' justifyContent='center'>
                        <Button variant='contained'>
                            <Link href='https://www.instagram.com/jorgeochipinti_/'>
                            <InstagramIcon />
                            </Link>
                        </Button>
                    </Box>
                    <Box display='flex' justifyContent='center'>
                        <Button variant='contained'>
                            <Link href='https://walink.co/c9b59b'>
                            <WhatsAppIcon />
                            </Link>
                        </Button>
                    </Box>
                </Box>
            </Box>
        </>
    )
}


