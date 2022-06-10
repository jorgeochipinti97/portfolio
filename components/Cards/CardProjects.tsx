import { Card, CardMedia, Box, Typography, Button, Link } from "@mui/material"
import NextLink from "next/link"
import { FC } from "react"
import { IProject } from "../../interfaces"
import GitHubIcon from '@mui/icons-material/GitHub';
import { SliderFade, SlideShow } from "../ui";

interface Props {
    project: IProject,
}

export const CardProjects: FC<Props> = ({ project }) => {
    return (
        <Card sx={{ m: 4, width: { xs: 300, md: 400 }, height: { xs: 600, md: 600 } }}>
            <SliderFade images={project.image} />
            {/* <SlideShow images={project.image} /> */}
            <Box display='flex' justifyContent='center'>
                <Typography variant='subtitle1'>{project.title}</Typography>
            </Box>
            <Box display='flex' justifyContent='center'>
                <Box display='flex' justifyContent='center' sx={{ m: 2 }} >
                    <Typography align="center" variant='body1' sx={{ display: { xs: 'block', md: 'block' } }}>{project.description.slice(0, 100)}...</Typography>
                </Box>
            </Box>
            <Box display='flex' justifyContent='center' >
                <Box display='flex' flexDirection='column'>
                    <Box display='flex' justifyContent='center' >
                        <NextLink href={`/projects/${project._id}`} passHref>
                            <Link>
                                <Button variant='contained' sx={{ mt: 2 }}>See More!</Button>
                            </Link>
                        </NextLink>
                    </Box>

                    <Box display='flex' justifyContent='center' >
                        <NextLink href={`${project.link}`} passHref>
                            <Link>
                                <Button variant='contained' sx={{ mt: 2 }}>Go To Page!</Button>
                            </Link>
                        </NextLink>
                    </Box>
                    <Box display='flex' justifyContent='center' >
                        <NextLink href={`${project.github}`} passHref>
                            <Link>
                                <Button variant='contained' sx={{ mt: 2 }}><GitHubIcon /></Button>
                            </Link>
                        </NextLink>
                    </Box>
                </Box>
            </Box>
        </Card>
    )
}

