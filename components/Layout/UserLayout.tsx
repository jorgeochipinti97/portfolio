import NextLink from 'next/link'

import { Box, Card, CardMedia, Typography, Link, Button, AppBar, Toolbar } from '@mui/material'
import { Footer, Contact, SideMenu } from '../ui'
import MenuIcon from '@mui/icons-material/Menu';
import { useRouter } from 'next/router';
import { useContext } from "react";
import { UiContext } from "../../context/ui";


export const UserLayout = ({ children }: any) => {
    const router = useRouter()
    const {toggleSideMenu} = useContext(UiContext)

    return (
        <Box>

            <SideMenu />
            <AppBar position="fixed" >
                <Toolbar >

                    <Box sx={{ display: { xs: 'block', sm: 'none' }, mt: 1 }}
                        className="fadeIn">
                        <NextLink href='/' passHref>
                            <Link>
                                <Button onClick={ toggleSideMenu}>
                                    <MenuIcon />
                                </Button>
                            </Link>
                        </NextLink>
                    </Box>
                    <Box flex={1} />

                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}
                        className="fadeIn">
                        <NextLink href='/' passHref>
                            <Link>
                                <Button variant='contained' sx={{ fontWeight: 700, m: 1, color:router.asPath  == '/' ? 'white': 'black' }} color={router.asPath == '/' ? 'primary' : 'info'} >Home</Button>
                            </Link>
                        </NextLink>
                        <NextLink href='/projects' passHref>
                            <Link>
                                <Button variant='contained' sx={{ fontWeight: 700, m: 1,color:router.asPath  == '/projects' ? 'white': 'black'  }} color={router.asPath == '/projects' ? 'primary' : 'info'} >Projects</Button>
                            </Link>
                        </NextLink>
                        <NextLink href='/about' passHref>
                            <Link>
                                <Button variant='contained' sx={{ fontWeight: 700, m: 1,color:router.asPath  == '/about' ? 'white': 'black'  }}color={router.asPath == '/about' ? 'primary' : 'info'} >About</Button>
                            </Link>
                        </NextLink>
                    </Box>

                    <Box flex={1} />
                    <Typography variant='body1' sx={{ color: 'black', display: { xs: 'block', sm: 'none', md: 'none' } }}>Jorge Ochipinti</Typography>
                </Toolbar>
            </AppBar>

            {children}

            <Footer />
        </Box>
    )
}
