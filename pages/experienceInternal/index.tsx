import React, { ChangeEvent, useRef, useState } from 'react'
import Image from 'next/image';
import { GetStaticProps, NextPage } from 'next'

import { SaveOutlined, UploadOutlined } from '@mui/icons-material';
import { Button, Chip, TextField, Typography, Card, CardActionArea, CardMedia } from '@mui/material';
import { Box } from '@mui/system'
import { useForm } from 'react-hook-form';

import portfolioApi from '../../api/portfolioApi';
import { getAllExperience } from '../../database/dbExperience';
import { IExperience } from '../../interfaces';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { LayoutInternal } from '../../components/Layout';

interface Props {
    experience: IExperience[]
}

const ExperienceInternal: NextPage<Props> = ({ experience }) => {
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [images_, setImages] = useState<string[]>([])
    const [newTagValue, setNewTagValue] = useState('');
    const router = useRouter()


    const initialValues: IExperience = {
        title: '',
        subtitle: '',
        body: '',
        image: [''],
        tags: [''],

    }

    const { register, handleSubmit, formState: { errors }, getValues, setValue, watch } = useForm<IExperience>({
        defaultValues: initialValues
    })

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

    const onSubmitNewExperience = async (form: IExperience) => {
        try {

            form.image = images_
            const { data } = await portfolioApi({


                url: '/experience',
                method: 'POST',
                data: form
            })

            console.log(data)
            router.reload()

        } catch (error) {
            console.log(error);
        }
    }

    const onSubmitDelete = async (form: IExperience) => {


        try {
            const { data } = await portfolioApi({
                url: '/experience',
                method: 'DELETE',
                data: form
            });
            router.replace(`/experienceInternal`);
        } catch (error) {
            console.log(error);

        }

    }
    return (
        <>
            <LayoutInternal>

                <Box display='flex' justifyContent='center' sx={{mt:4}}>
                    <Box>
                        <Typography sx={{ mb: 5 }} variant='h1'>New Experience</Typography>
                        <form onSubmit={handleSubmit(onSubmitNewExperience)}>
                            <Box display='flex' flexDirection='column'>
                                <Box display='flex' justifyContent='center'>
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
                                <Box display='flex' justifyContent='center'>
                                    <Button
                                        color="secondary"
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
                                    <Box>
                                        {
                                            images_.length > 0 &&
                                            images_.map(e => (
                                                <Image src={e} key={e} width={50} height={50} />
                                            ))
                                        }
                                    </Box>
                                </Box>
                            </Box>

                            <Box display='flex' flexDirection='column'>
                                <Box display='flex' justifyContent='center'>
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
                                </Box>
                                <Box display='flex' justifyContent='center'>
                                    <TextField
                                        label="Subtitulo"
                                        variant="filled"
                                        sx={{ mb: 1 }}
                                        {...register('subtitle', {
                                            required: 'Este campo es requerido',
                                            minLength: { value: 2, message: 'Mínimo 2 caracteres' }
                                        })}
                                        error={!!errors.title}
                                        helperText={errors.title?.message}
                                    />
                                </Box>
                                <Box display='flex' justifyContent='center'>
                                    <TextField
                                        label="Body"
                                        variant="filled"
                                        sx={{ mb: 1 }}
                                        {...register('body', {
                                            required: 'Este campo es requerido',
                                            minLength: { value: 2, message: 'Mínimo 2 caracteres' }
                                        })}
                                        error={!!errors.title}
                                        helperText={errors.title?.message}
                                    />
                                </Box>
                                <Box display='flex' justifyContent='center'>
                                    <TextField
                                        label="tags"
                                        variant="filled"
                                        helperText="Presiona [spacebar] "
                                        value={newTagValue}
                                        onChange={({ target }) => setNewTagValue(target.value)}
                                        onKeyUp={({ code }) => code === 'Space' ? onNewTag() : undefined}
                                    />
                                </Box>
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
                        </form>
                    </Box>
                </Box>
                <Box display='flex' justifyContent='space-around' >

                    {
                        experience.map((e: IExperience) => (
                            <>
                                <Box key={e.title} display='flex' flexDirection='column' sx={{ m: 5 }}>
                                    <Card >
                                        <Box display='flex' justifyContent='center'>
                                            {
                                                e.image.length > 0 &&
                                                e.image.map((f: string) => (
                                                    <Image src={f} key={f} width={200} height={200} />
                                                ))

                                            }
                                        </Box>
                                        <CardActionArea>
                                            <Box display='flex' justifyContent='center'>
                                                <Typography variant='h3'>{e.title}</Typography>
                                            </Box>
                                            <Box display='flex' justifyContent='center'>
                                                <Typography variant='subtitle1'>{e.subtitle}</Typography>
                                            </Box>
                                            <Box display='flex' justifyContent='center'>
                                                <Typography variant='body1'>{e.body}</Typography>
                                            </Box>
                                        </CardActionArea>
                                        <Box display='flex' justifyContent='center'>
                                            <Link href={`/experienceInternal/${e._id}`}>
                                                <Button sx={{ mt: 2 }} variant='contained'>Edit</Button>
                                            </Link>
                                            <Box display='flex' justifyContent='center'>
                                                <Button sx={{ mt: 2 }}
                                                    onClick={() => onSubmitDelete(e)}
                                                    variant='contained'>Delete</Button>
                                            </Box>
                                        </Box>
                                    </Card>
                                </Box>
                            </>
                        ))
                    }

                </Box>
            </LayoutInternal>
        </>
    )
}

export default ExperienceInternal

export const getStaticProps: GetStaticProps = async (context) => {

    const data = await getAllExperience()
    console.log(data)
    return {
        props: {

            experience: data
        }

    }
}