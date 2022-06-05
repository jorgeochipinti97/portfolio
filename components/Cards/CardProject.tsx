import { Box, Card, Chip, Typography } from "@mui/material"
import { FC } from "react"
import { IProject } from "../../interfaces"
import { AccordionPage, SlideShow } from "../ui"
import { Button } from '@mui/material'
import GitHubIcon from '@mui/icons-material/GitHub';
import Link from "next/link"
interface Props {
    project: IProject
}

export const CardProject: FC<Props> = ({ project }) => {
    return (
        <>

            <Box display='flex' justifyContent='center' sx={{mt:3}}>
                <Card sx={{ width: 700 }}>
                    <SlideShow images={project.image} />
                    <Box display='flex' justifyContent='center' sx={{mt:3}}>
                        <Typography variant='h5'>{project.title}</Typography>
                    </Box>
                    <Box display='flex' justifyContent='center' sx={{m:2}}>
                        <Typography variant='body1' sx={{fontWeight:600}} align='justify'>{project.description}</Typography>
                    </Box>
                    <Box display='flex' justifyContent='center'>
                        <Box display='flex' flexDirection='column'>
                            <Box>
                                <Box display='flex' justifyContent='center'>
                                    <Box display='flex' justifyContent='space-around' sx={{ mt: 3, mb: 3 }}>
                                        <Button variant='contained' sx={{ m: 1 }}>
                                            <Link href={`${project.github}`}>
                                                <GitHubIcon />
                                            </Link>
                                        </Button>
                                        <Button variant='contained' sx={{ m: 1 }}>
                                            <Link href={`${project.link}`}>
                                                <Typography variant='button'>Go to web!</Typography>
                                            </Link>
                                        </Button>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Card>
            </Box>
            <Box display='flex' justifyContent='center' sx={{ mt: 8, flexWrap: 'wrap' }}>
                {project.tags.map(tag => (
                    <Chip
                        key={tag}
                        label={tag}
                        color="primary"
                        size='small'
                        sx={{ ml: 1, mt: 1 }}
                    />
                ))}
            </Box>

        </>
    )
}
