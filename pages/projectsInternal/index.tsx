import { useState, useEffect, useRef, ChangeEvent } from 'react';
import { GetStaticProps, GetStaticPaths, GetServerSideProps, NextPage } from 'next'

import { Box, Button, Card, CardActionArea, Chip, TextField, Typography } from "@mui/material";
import { SaveOutlined, UploadOutlined } from '@mui/icons-material';
import { useForm } from 'react-hook-form';

import { IProject } from '../../interfaces/IProject';
import portfolioApi from "../../api/portfolioApi";
import { getAllProjects } from '../../database/dbProjects';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { LayoutInternal } from '../../components/Layout';

interface ISection {
    title: string,
    body: string,
    step: string,
    image: string,
}

interface Props {
    projects: IProject[]
}

const Internal: NextPage<Props> = ({ projects }) => {
    const router = useRouter()
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [images_, setImages] = useState<string[]>([])
    const [sections__, setSections] = useState<ISection[]>([])
    const [newTagValue, setNewTagValue] = useState('');
    const [section, setSection] = useState<ISection>({
        title: '',
        body: '',
        step: '',
        image: '',
    })

    const initialValues: IProject = {
        title: '',
        description: '',
        image: [''],
        tags: [],
        github: '',
        link: '',
        section:
            [{
                title: '',
                body: '',
                step: '',
                image: '',
            }]

    }

    const { register, handleSubmit, formState: { errors }, getValues, setValue, watch } = useForm<IProject>({
        defaultValues: initialValues
    })



    const onNewSection = () => {
        try {


            if (sections__.includes(section)) {
                return;
            }


            sections__.push(section)
            console.log(sections__)

        } catch (err) {
            alert(err)
        }
    }

    const onDeleteSection = (e: any) => {
        const a = sections__.filter((s: any) => s.step != e.step)
        setSections(a)
    }

    const onEditSection = (s: any) => {
        onDeleteSection(s)
        setSection({
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

    const onNewTag = () => {
        try {

            const newTag = newTagValue.trim().toLocaleLowerCase();
            setNewTagValue('');
            const currentTags: string[] = getValues('tags');

            if (currentTags.includes(newTag)) {
                return;
            }

            currentTags.push(newTag);
        } catch (err) {
            alert(err)
        }
    }
    const onDeleteTag = (tag: string) => {

        try {
            const updatedTags = getValues('tags').filter(t => t !== tag);
            setValue('tags', updatedTags, { shouldValidate: true });
        }
        catch (err) {
            alert(err)
        }
    }
    const onSubmitNewProject = async (form: IProject) => {
        try {

            console.log('hi')
            form.section = sections__
            form.image = images_
            console.log(form.section)
            console.log(form)

            const { data } = await portfolioApi({


                url: '/projects',
                method: 'POST',
                data: form
            })


            console.log(data)

        } catch (error) {
            console.log(error);
        }
    }

    const onFilesSelected = async ({ target }: ChangeEvent<HTMLInputElement>) => {
        if (!target.files || target.files.length === 0) {
            return;
        }

        try {
            for (const file of target.files) {
                const formData = new FormData();
                formData.append('file', file);
                const { data } = await portfolioApi.post<{ message: string }>('/upload', formData);
                images_.push(data.message)
                console.log(images_)
            }


        } catch (error) {
            console.log({ error });
        }
    }

    return (
        <>
            <LayoutInternal>

                <Box sx={{ mt: 4 }}>
                    <Box display='flex' justifyContent='center'>

                        <Typography variant='h3' sx={{ mb: 3 }}>Create a new Project</Typography>
                    </Box>
                    <Box sx={{ width: '100vw' }}>
                        <form onSubmit={handleSubmit(onSubmitNewProject)}>
                            <Box display='flex' justifyContent='center' sx={{ m: 4 }}>

                                <Button
                                    color="secondary"
                                    variant='contained'
                                    startIcon={<SaveOutlined />}
                                    sx={{ width: '150px', mb: 3 }}
                                    type="submit"
                                >
                                    Guardar
                                </Button>
                            </Box>
                            <Box display='flex' justifyContent='center' sx={{width:'100vw'}}>
                                <Box display='flex' flexDirection='column' sx={{width:'70%'}}>
                                    <Button
                                        color="secondary"
                                        variant='contained'
                                        fullWidth
                                        startIcon={<UploadOutlined />}
                                        sx={{ mb: 3 }}
                                        onClick={() => fileInputRef.current?.click()}
                                    >
                                        Cargar imagen
                                    </Button>
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        multiple
                                        accept='image/png, image/gif, image/jpeg'
                                        style={{ display: 'none' }}
                                        onChange={onFilesSelected}
                                    />

                                    <TextField
                                        label="Título"
                                        variant="filled"
                                        sx={{ mb: 1 }}
                                        {...register('title', {
                                            required: 'Este campo es requerido',
                                            minLength: { value: 2, message: 'Mínimo 2 caracteres' }
                                        })}
                                        error={!!errors.title}
                                        helperText={errors.title?.message}
                                    />
                                    <TextField
                                        label="Descripcion"
                                        variant="filled"
                                        sx={{ mb: 1 }}
                                        {...register('description', {
                                            required: 'Este campo es requerido',
                                            minLength: { value: 2, message: 'Mínimo 2 caracteres' }
                                        })}
                                        error={!!errors.description}
                                        helperText={errors.description?.message}
                                        multiline
                                        rows={4}
                                    />
                                    <TextField
                                        label="Github link"
                                        variant="filled"
                                        sx={{ mb: 1 }}
                                        {...register('github', {
                                            required: 'Este campo es requerido',
                                            minLength: { value: 2, message: 'Mínimo 2 caracteres' }
                                        })}
                                        error={!!errors.image}
                                    />
                                    <TextField
                                        label="link"
                                        variant="filled"
                                        sx={{ mb: 1 }}
                                        {...register('link', {
                                            required: 'Este campo es requerido',
                                            minLength: { value: 2, message: 'Mínimo 2 caracteres' }
                                        })}
                                        error={!!errors.image}
                                    />
                                    <TextField
                                        label="tags"
                                        variant="filled"
                                        helperText="Presiona [spacebar] para agregar"
                                        value={newTagValue}
                                        onChange={({ target }) => setNewTagValue(target.value)}
                                        onKeyUp={({ code }: any) => code === 'Space' ? onNewTag() : undefined}
                                    />
                                    <Box sx={{
                                        display: 'flex',
                                        flexWrap: 'wrap',
                                        listStyle: 'none',
                                        p: 0,
                                        m: 0,
                                    }}
                                        component="ul">
                                        {
                                            getValues('tags').map((tag) => {

                                                return (
                                                    <Chip
                                                        key={tag}
                                                        label={tag}
                                                        onDelete={() => onDeleteTag(tag)}
                                                        color="primary"
                                                        size='small'
                                                        sx={{ ml: 1, mt: 1 }}
                                                    />
                                                );
                                            })}
                                    </Box>
                                </Box>

                            </Box>
                            <Box display='flex' justifyContent='center' sx={{width:'100vw'}}>
                                <Box display='flex' flexDirection='column' sx={{width:'70%'}}>
                                    <Typography variant='h5' sx={{ mt: 3, mb: 1 }}>Create a section</Typography>
                                    <TextField
                                        sx={{ m: 1 }}
                                        label="Section Title"
                                        variant="filled"
                                        value={section.title}
                                        onChange={({ target }) => setSection({
                                            title: target.value,
                                            body: section.body,
                                            image: section.image,
                                            step: section.step,
                                        })}

                                    />
                                    <TextField
                                        sx={{ m: 1 }}
                                        label="Section Image"
                                        variant="filled"
                                        value={section.image}
                                        onChange={({ target }) => setSection({
                                            title: section.title,
                                            body: section.body,
                                            image: target.value,
                                            step: section.step,
                                        })}

                                    />
                                    <TextField
                                        sx={{ m: 1 }}
                                        label="Section body"
                                        variant="filled"
                                        multiline
                                        fullWidth
                                        value={section.body}
                                        onChange={({ target }) => setSection({
                                            title: section.title,
                                            image: section.image,
                                            body: target.value,
                                            step: section.step,
                                        })}
                                        rows={10}

                                    />
                                    <TextField
                                        sx={{ m: 1 }}
                                        label="Section step"
                                        variant="filled"
                                        value={section.step}
                                        onChange={({ target }) => setSection({
                                            title: section.title,
                                            image: section.image,
                                            step: target.value,
                                            body: section.body,
                                        })}


                                    />
                                    <Box display='flex' justifyContent='center' sx={{ mb: 4, mt: 3 }}>

                                        <Button
                                            variant='contained'
                                            sx={{ widht: 500 }}
                                            onClick={() => onNewSection()}>Create a Section</Button>
                                    </Box>
                                </Box>
                                <Box display='flex' justifyContent='center'>

                                    <Box sx={{
                                        display: 'flex',
                                        listStyle: 'none',
                                        flexWrap: 'wrap',

                                        p: 0,
                                        m: 0,
                                    }}
                                        component="ul">
                                        {/* {
                                            sections__.map((e) => {

                                                return (
                                                    <Box sx={{ m: 1 }} key={e.step} >
                                                        <CardSection section={e} />
                                                        <Button variant='contained' color='error' sx={{ m: 2 }}
                                                            onClick={() => onDeleteSection(e)}
                                                        >Delete</Button>
                                                        <Button variant='contained' color='secondary' sx={{ m: 2 }}
                                                            onClick={() => onEditSection(e)}
                                                        >Edit</Button>
                                                    </Box>
                                                );
                                            })} */}
                                    </Box>
                                </Box>
                            </Box>
                        </form>
                        <Box display='flex' justifyContent='center' sx={{ mt: 10, mb: 4 }}>
                            <Typography variant='h3'>My Projects</Typography>
                        </Box>
                        <Box>
                            <Box sx={{
                                display: 'flex',
                                listStyle: 'none',
                                flexWrap: 'wrap',

                                p: 0,
                                m: 2,
                            }}
                                component="ul">
                                {
                                    projects.map(e => (
                                        <Card key={e.title} sx={{ width: 400, height: 200 }}>
                                            <Box>
                                                <Box display='flex' justifyContent='center'>
                                                    <Typography variant='h3'>{e.title}</Typography>
                                                </Box>
                                                <Box display='flex' justifyContent='center'>
                                                    <Typography variant='body1'>{e.description.slice(0,10)}..</Typography>
                                                </Box>
                                            </Box>
                                            <Box display='flex' justifyContent='center'>
                                                <Link href={`/projectsInternal/${e._id}`}>
                                                    <Button sx={{ mt: 2 }} variant='contained'>Edit</Button>
                                                </Link>
                                            </Box>
                                            <Box display='flex' justifyContent='center'>
                                                <Button sx={{ mt: 2 }}
                                                    onClick={() => onSubmitDelete(e)}
                                                    variant='contained'>Delete</Button>
                                            </Box>
                                        </Card>
                                    ))
                                }
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </LayoutInternal>

        </>
    )
}

export default Internal

export const getStaticProps: GetStaticProps = async (context) => {

    const data = await getAllProjects()
    console.log(data)
    return {
        props: {

            projects: data
        }

    }
}