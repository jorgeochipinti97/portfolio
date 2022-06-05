import { FC } from "react"
import { Box, Typography, Button, Toolbar, AppBar, IconButton, Link } from '@mui/material';
import NextLink from "next/link";
import MenuIcon from '@mui/icons-material/Menu';

export const LayoutInternal = ({ children }: any) => {
    return (
        <>
            <Box>
                <AppBar position="static">
                <Toolbar sx={{ backgroundColor: 'rgba(208, 100, 0, 0.9)' }}>
                        <Box flexGrow={1}/>
                        <NextLink href='/blogInternal'>
                            <Link sx={{m:3}}>
                                <Button variant='contained'>New Blog</Button>
                            </Link>
                        </NextLink>
                        <NextLink href='/experienceInternal'>
                            <Link sx={{m:3}}>
                                <Button variant='contained'>New Experience</Button>
                            </Link>
                        </NextLink>
                        <NextLink href='/projectsInternal'>
                            <Link sx={{m:3}}>
                                <Button variant='contained'>New Project</Button>
                            </Link>
                        </NextLink>
                        <Box flexGrow={1}/>
                    </Toolbar>
                </AppBar>
                <Box>
                    {children}
                </Box>

            </Box>
        </>
    )
}
