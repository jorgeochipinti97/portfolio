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
            <Box sx={{pt:10,backgroundColor:'rgba(130, 151, 244, 0.29)'}}>
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
