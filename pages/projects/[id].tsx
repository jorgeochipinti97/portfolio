import { Box, Typography } from '@mui/material';
import { GetServerSideProps, NextPage } from 'next';
import { IProject } from '../../interfaces';
import { getProjectsById } from '../../database/dbProjects';
import { CardProject } from '../../components/Cards/CardProject';
import { UserLayout } from '../../components/Layout';

interface Props {
    projects: IProject
}

const ProjectID: NextPage<Props> = ({ projects }) => {
    return (
        <UserLayout>
            <Box sx={{pt:10,backgroundColor:'rgba(0, 0, 0, 1)'}}>
                <CardProject project={projects} />
            </Box>
        </UserLayout>
    )
}

export default ProjectID

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {

    const { id = '' } = query;
    const projects = await getProjectsById(id.toString())
    return {
        props: {
            projects
        },
    }
}
