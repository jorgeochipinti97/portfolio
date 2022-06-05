import { Box } from '@mui/material';
import { GetStaticProps, NextPage } from 'next'
import { AccordionExperience } from '../components/Accordions';
import { CardIndexType } from '../components/Cards';
import { ProjectsCarousel } from '../components/Carouseles';
import { UserLayout } from '../components/Layout';
import { ListBlog } from '../components/List';
import { getAllExperience } from '../database/dbExperience';
import { getAllProjects } from '../database/dbProjects';
import { IExperience, IProject } from '../interfaces';

interface Props {
  projects: IProject[],
  experiences: IExperience[]
}

const Home: NextPage<Props> = ({ projects, experiences }) => {

  return (
    <>
      <UserLayout>
        <Box sx={{ mt: 6 }}>
          <CardIndexType />
        </Box>
        <Box sx={{backgroundColor:'rgba(130, 151, 244, 0.29)'}}>
          <ProjectsCarousel data={projects} />
        </Box>
        <Box sx={{ pt: 5, backgroundColor:'rgba(245, 92, 0, 0.29)' }}>

          <AccordionExperience experiences={experiences} />
        </Box>
      </UserLayout>
    </>
  )
}

export default Home


export const getStaticProps: GetStaticProps = async (context) => {

  const data = await getAllProjects()
  const dataExperience = await getAllExperience()
  console.log(data)
  return {
    props: {
      experiences: dataExperience.reverse(),
      projects: data
    }

  }
}