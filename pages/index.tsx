import { Box } from '@mui/material';
import { GetStaticProps, NextPage } from 'next'
import { useState, useEffect } from 'react';
import { AccordionExperience } from '../components/Accordions';
import { CardIndexType } from '../components/Cards';
import { ProjectsCarousel } from '../components/Carouseles';
import { UserLayout } from '../components/Layout';
import { ListBlog } from '../components/List';
import { FullScreenLoading } from '../components/ui';
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
        <Box sx={{pt:4}}>
          <CardIndexType />
        </Box>
        <Box sx={{ backgroundColor: 'rgba(0, 0, 0, 1)' }}>
          <ProjectsCarousel data={projects} />
        </Box>
        <Box sx={{ pt: 5, backgroundColor: 'rgba(0, 0, 0, 1)' }}>

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