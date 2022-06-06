import { Box, Typography } from '@mui/material';
import { GetServerSideProps, NextPage } from 'next';
import { IProject } from '../../interfaces';
import { getAllProjects } from '../../database/dbProjects';
import { UserLayout } from '../../components/Layout';
import GridProjects from '../../components/Grid/GridProjects';
import { FullScreenLoading } from '../../components/ui';
import { useEffect, useState } from 'react';

interface Props {
    projects: IProject[]
}

const Project: NextPage<Props> = ({ projects }) => {
    const [isLoading, setIsLoading] = useState(false)
    useEffect(() => {
        const timeout = setTimeout(() => {
            let counter = 0
            counter++
            if (counter > 0) {
                setIsLoading(true)
                clearInterval(timeout)
            }
        }, 200);
    }, [])


    return (
        <UserLayout>
            <Box sx={{ pt: 10, backgroundColor: 'rgba(130, 151, 244, 0.29)' }}>
                {isLoading
                    ? <GridProjects projects={projects} />
                    : <FullScreenLoading />
                }
            </Box>
        </UserLayout>
    )
}

export default Project

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
    const { id = '' } = query;
    const projects = await getAllProjects()
    return {
        props: {
            projects
        },
    }
}
