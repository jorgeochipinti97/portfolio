import { Box, Grid } from '@mui/material'

import React, { FC } from 'react'
import { IProject } from '../../interfaces'
import { CardProjects } from '../Cards'

interface Props {
    projects: IProject[]
}

const GridProjects: FC<Props> = ({ projects }) => {
    return (
        <>
            <Box display='flex' justifyContent='center'>
            <Box>


                <Grid container spacing={1}>
                    {
                        projects.map(e => (
                            <Grid item
                                xs={10}
                                sm={4}
                                key={e.title}
                            >
                                <Box display='flex' justifyContent='center'>
                                    <Box>
                                        <CardProjects project={e} />
                                    </Box>
                                </Box>
                            </Grid>
                        ))
                    }
                </Grid>
            </Box>
            </Box>
        </>
    )
}

export default GridProjects

function useState(arg0: boolean): [any, any] {
    throw new Error('Function not implemented.')
}
