import { TextField, Typography, Box, Chip, Button, Card, CardActionArea } from '@mui/material';
import { GetStaticProps, NextPage } from 'next';
import { getAllBlog } from "../../database/dbBlog"
import { IBlog } from '../../interfaces';
import { useForm } from 'react-hook-form';
import portfolioApi from '../../api/portfolioApi';
import Image from 'next/image';

import Link from 'next/link';

import { useRouter } from 'next/router';
import { ChangeEvent, useRef, useState } from 'react';
import { UploadOutlined } from '@mui/icons-material';
import { SaveOutlined } from '@mui/icons-material';
import { LayoutInternal } from '../../components/Layout';

interface Props {
    blogs: IBlog[]
}

const BlogInternal: NextPage<Props> = ({ blogs }) => {
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [images_, setImages] = useState<string[]>([])
    const [newTagValue, setNewTagValue] = useState('');
    const router = useRouter()

    const initialValues: IBlog = {
        title: '',
        subtitle: '',
        body: '',
        image: [''],
        tags: [''],

    }

    const { register, handleSubmit, formState: { errors }, getValues, setValue, watch } = useForm<IBlog>({
        defaultValues: initialValues
    })

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

    const onSubmitNewBlog = async (form: IBlog) => {
        try {

            form.image = images_
            const { data } = await portfolioApi({


                url: '/blog',
                method: 'POST',
                data: form
            })

            console.log(data)
            router.reload()

        } catch (error) {
            console.log(error);
        }
    }
    const onSubmitDelete = async (form: IBlog) => {


        try {
            const { data } = await portfolioApi({
                url: '/blog',
                method: 'DELETE',
                data: form
            });
            router.replace(`/blogInternal`);
        } catch (error) {
            console.log(error);

        }

    }
    return (
        <>
            <LayoutInternal>
                <Box sx={{mt:4}} >
                    <Box display='flex' justifyContent='center'>
                        <Typography variant='h1' sx={{ mb: 4 }}>New Blog</Typography>
                    </Box>
                    <form onSubmit={handleSubmit(onSubmitNewBlog)}>
                        <Box display='flex' flexDirection='column'>
                            <Box display='flex' justifyContent='center'>
                                <Box display='flex' justifyContent='space-around'>
                                    <Box display='flex' justifyContent='center'>
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
                                    </Box>
                                </Box>
                                <Box display='flex' justifyContent='center'>
                                    <Box display='flex' justifyContent='center'>
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
                                    </Box>
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
                        </Box>
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
                                sx={{ mb: 1, width: 500 }}
                                {...register('body', {
                                    required: 'Este campo es requerido',
                                    minLength: { value: 2, message: 'Mínimo 2 caracteres' }
                                })}
                                error={!!errors.title}
                                helperText={errors.title?.message}
                                multiline
                                rows={10}
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
                            justifyContent='center'
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
                    </form>
                </Box>

                {
                    blogs.map((e: IBlog) => (
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
                                        <Link href={`/blogInternal/${e._id}`}>
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
            </LayoutInternal>
        </>

    )
}

export default BlogInternal

export const getStaticProps: GetStaticProps = async (context) => {

    const data = await getAllBlog()
    console.log(data)
    return {
        props: {
            blogs: data
        }

    }
}