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

            <Box display='flex' justifyContent='center' sx={{ flexWrap: 'wrap' }}>

                {
                    projects.map(e => (

                        <Box key={e.title}>
                            <CardProjects project={e} />
                        </Box>


                    ))
                }



            </Box>
        </>
    )
}

export default GridProjects

function useState(arg0: boolean): [any, any] {
    throw new Error('Function not implemented.')
}
