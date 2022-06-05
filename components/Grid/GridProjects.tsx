import { Grid  } from '@mui/material'

import React, { FC } from 'react'
import { IProject } from '../../interfaces'
import { CardProjects } from '../Cards'

interface Props {
    projects: IProject[]
}

const GridProjects: FC<Props> = ({ projects }) => {
    return (
        <>

            <Grid container spacing={1}>
                {
                    projects.map(e => (
                        <Grid item
                            xs={10}
                            sm={4}
                            key={e.title}
                        >
                            <CardProjects project={e} />
                        </Grid>
                    ))
                }
            </Grid>
        </>
    )
}

export default GridProjects

function useState(arg0: boolean): [any, any] {
    throw new Error('Function not implemented.')
}
