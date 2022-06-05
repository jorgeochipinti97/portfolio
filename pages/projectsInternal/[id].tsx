import { Card, Typography, Box, TextField, Button } from '@mui/material'
import { GetServerSideProps, NextPage } from 'next'
import { useState } from 'react';
import portfolioApi from '../../api/portfolioApi';
import { getProjectsById } from '../../database/dbProjects'
import { IProject } from '../../interfaces'
import { RemoveOutlined, SaveOutlined } from '@mui/icons-material';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { LayoutInternal } from '../../components/Layout';

interface Props {
    project: IProject
}

const ProjectsId: NextPage<Props> = ({ project }) => {
    const router = useRouter()


    interface ISection {
        step: string,
        title: string,
        body: string,
        image: string,
    }

    const [newProject, setNewProject] = useState<IProject>({
        _id: project._id,
        image: project.image,
        title: project.title,
        description: project.description,
        section: project.section,
        tags: project.tags,
        link:project.link,
        github: project.github,
    })

    const [sectionEdit, setSectionEdit] = useState<ISection>({
        step: '',
        title: '',
        body: '',
        image: '',
    })

    const onSubmitNewProject = async (form: IProject) => {
        try {


            const { data } = await portfolioApi({


                url: '/projects',
                method: 'PUT',
                data: form
            })


            console.log(data)

        } catch (error) {
            console.log(error);
        }
    }

    const onDeleteSection = (e: any) => {
        const a = newProject.section.filter((s: any) => s.step != e.step)
        setNewProject({
            _id: project._id,
            image: newProject.image,
            title: newProject.title,
            description: newProject.description,
            section: a,
            tags: newProject.tags,
            link: newProject.link,
            github: newProject.github
        })
    }

    const onEditSection = (s: any) => {
        onDeleteSection(s)
        setSectionEdit({
            title: s.title,
            body: s.body,
            image: s.body,
            step: s.step,
        })
    }

    const onSubmitDelete = async (form: IProject) => {


        try {
            const { data } = await portfolioApi({
                url: '/projects',
                method: 'DELETE',
                data: form
            });
            router.replace(`/projectsInternal`);
        } catch (error) {
            console.log(error);

        }

    }

    return (
        <>
            <LayoutInternal>


                <Box display='flex' justifyContent='center' sx={{ mt: 4 }} >
                    <Card sx={{ p: 5 }}>
                        <Button
                            color="secondary"
                            variant='contained'
                            startIcon={<SaveOutlined />}
                            sx={{ width: '150px', mb: 3 }}
                            onClick={() => onSubmitNewProject(newProject)}
                        >
                            Guardar
                        </Button>
                        <Button
                            color="secondary"
                            variant='contained'
                            startIcon={<RemoveOutlined />}
                            sx={{ width: '150px', mb: 3 }}
                            onClick={() => onSubmitDelete(project)}
                        >
                            Eliminar
                        </Button>
                        <Box display='flex' justifyContent='center'>
                            <Typography variant='h1'>{newProject.title}</Typography>
                        </Box>
                        <Box display='flex' justifyContent='center'>
                            <Typography variant='body1'>{newProject.description}</Typography>
                        </Box>
                        <Box display='flex' justifyContent='center'>
                            <Typography variant='body1'>{newProject.link}</Typography>
                        </Box>
                        <Box display='flex' justifyContent='center'>
                            <Typography variant='body1'>{newProject.github}</Typography>
                        </Box>
                        <Box display='flex' justifyContent='center'>

                            {
                                newProject.image.length > 0 &&

                                newProject.image.map(f => (
                                    <Image width={500} height={500} src={f} key={f} />
                                ))
                            }
                        </Box>
                        <Box display='flex' justifyContent='center'>
                            {newProject.section.map(e => (

                                <Box key={e.title} sx={{ border: '1px solid black', p: 4, m: 5 }}>
                                    <Typography variant='h6'>{e.step}</Typography>
                                    <Typography variant='h6'>{e.title}</Typography>
                                    <Typography variant='h6'>{e.body}</Typography>
                                    <Button variant='contained' color='error' onClick={() => onDeleteSection(e)}>Delete</Button>
                                    <Button variant='contained' color='secondary' onClick={() => onEditSection(e)}>Edit</Button>
                                </Box>

                            ))}
                        </Box>
                    </Card>

                </Box >

                <Box display='flex' justifyContent='center'>
                    <Box display='flex' flexDirection='column' sx={{ width: 1000 }}>
                        <Typography sx={{ m: 4 }} variant='h4'>Edit Project</Typography>

                        <TextField
                            sx={{ m: 1 }}
                            label="new Title"
                            variant="filled"
                            value={newProject.title}
                            onChange={({ target }) => setNewProject({
                                _id: project._id,
                                image: newProject.image,
                                title: target.value,
                                description: newProject.description,
                                section: newProject.section,
                                tags: newProject.tags,
                                link: newProject.link,
                                github: newProject.github
                            })}
                        />
                        <TextField
                            sx={{ m: 1 }}
                            label="new description"
                            variant="filled"
                            value={newProject.description}
                            onChange={({ target }) => setNewProject({
                                _id: project._id,
                                image: newProject.image,
                                title: newProject.title,
                                description: target.value,
                                section: newProject.section,
                                tags: newProject.tags,
                                link: newProject.link,
                                github: newProject.github
                            })}
                            multiline
                            rows={4}
                        />
                        <TextField
                            sx={{ m: 1 }}
                            label="new Link"
                            variant="filled"
                            value={newProject.link}
                            onChange={({ target }) => setNewProject({
                                _id: newProject._id,
                                image: newProject.image,
                                title: newProject.title,
                                description: newProject.description,
                                section: newProject.section,
                                tags: newProject.tags,
                                link: target.value,
                                github: newProject.github
                            })}
                            multiline
                            rows={4}
                        />
                        <TextField
                            sx={{ m: 1 }}
                            label="new Github"
                            variant="filled"
                            value={newProject.github}
                            onChange={({ target }) => setNewProject({
                                _id: newProject._id,
                                image: newProject.image,
                                title: newProject.title,
                                description: newProject.description,
                                section: newProject.section,
                                tags: newProject.tags,
                                link: newProject.link,
                                github: target.value
                            })}
                            multiline
                            rows={4}
                        />

                    </Box>
                </Box>

                <Box display='flex' justifyContent='center'>
                    <Box display='flex' flexDirection='column' sx={{ width: 1000 }}>
                        <Typography variant='h5' sx={{ m: 4 }}>New Sections</Typography>
                        <TextField
                            sx={{ m: 1 }}
                            label="new title"
                            variant="filled"
                            value={sectionEdit.title}
                            onChange={({ target }) => setSectionEdit({
                                title: target.value,
                                body: sectionEdit.body,
                                image: sectionEdit.body,
                                step: sectionEdit.step,
                            })}
                        />
                        <TextField
                            sx={{ m: 1 }}
                            label="new body"
                            variant="filled"
                            value={sectionEdit.body}
                            onChange={({ target }) => setSectionEdit({
                                title: sectionEdit.title,
                                body: target.value,
                                image: sectionEdit.body,
                                step: sectionEdit.step,
                            })}
                            multiline
                            rows={4}
                        />
                        <TextField
                            sx={{ m: 1 }}
                            label="new step"
                            variant="filled"
                            value={sectionEdit.step}
                            onChange={({ target }) => setSectionEdit({
                                title: sectionEdit.title,
                                body: sectionEdit.body,
                                image: sectionEdit.image,
                                step: target.value,
                            })}
                        />
                        <Button variant='contained'
                            onClick={() => newProject.section.push(sectionEdit)}
                            sx={{ m: 4 }}>New Section</Button>
                    </Box>
                </Box>
            </LayoutInternal>
        </>
    )
}

export default ProjectsId



export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {

    const { id = '' } = query;
    const project = await getProjectsById(id.toString())
    console.log(project)
    return {
        props: {
            project
        },
    }
}
