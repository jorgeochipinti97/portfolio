import { Box, Typography } from '@mui/material';
import { GetServerSideProps, NextPage } from 'next';
import { IProject } from '../../interfaces';
import { getAllProjects } from '../../database/dbProjects';
import { UserLayout } from '../../components/Layout';
import GridProjects from '../../components/Grid/GridProjects';

interface Props {
    projects: IProject[]
}

const Project: NextPage<Props> = ({ projects }) => {
    return (
        <UserLayout>
            <Box>
                <GridProjects projects={projects}/>
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
