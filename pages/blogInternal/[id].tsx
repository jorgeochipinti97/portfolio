import { GetServerSideProps, NextPage } from 'next';
import { IBlog } from '../../interfaces';
import { useState } from 'react';
import { Box, Card, Chip, Typography, TextField, Button } from '@mui/material';
import Image from 'next/image';
import { SaveOutlined, RemoveOutlined } from '@mui/icons-material';
import portfolioApi from '../../api/portfolioApi';
import { useRouter } from 'next/router';
import { getBlogById } from '../../database/dbBlog';
import { LayoutInternal } from '../../components/Layout/LayoutInternal';

interface Props {
    blog: IBlog
}

const BlogID: NextPage<Props> = ({ blog }) => {
    const router = useRouter()
    const [newTagValue, setNewTagValue] = useState('');
    const [newBlog, setNewBlog] = useState<IBlog>({
        _id: blog._id,
        title: blog.title,
        tags: blog.tags,
        subtitle: blog.subtitle,
        body: blog.body,
        image: blog.image
    })
    const onNewTag = () => {
        try {

            const newTag = newTagValue.trim().toLocaleLowerCase();
            setNewTagValue('');
            const currentTags: string[] = newBlog.tags

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
            const updatedTags = newBlog.tags.filter(t => t !== tag);
            setNewBlog({
                _id: newBlog._id,
                title: newBlog.title,
                tags: updatedTags,
                subtitle: newBlog.subtitle,
                body: newBlog.body,
                image: newBlog.image
            })
        }
        catch (err) {
            alert(err)
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
    const onSubmitBlog = async (form: IBlog) => {
        try {


            const { data } = await portfolioApi({

                url: '/blog',
                method: 'PUT',
                data: form
            })

            console.log(data)

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <LayoutInternal>

                <Box display='flex' justifyContent='center' sx={{mt:4}}>
                    <Card >
                        <Box display='flex' justifyContent='center'>
                            <Button
                                color="secondary"
                                variant='contained'
                                startIcon={<SaveOutlined />}
                                sx={{ width: '150px', m: 3 }}
                                onClick={() => onSubmitBlog(newBlog)}
                            >
                                Guardar
                            </Button>
                            <Button
                                color="secondary"
                                variant='contained'
                                startIcon={<RemoveOutlined />}
                                sx={{ width: '150px', m: 3 }}
                                onClick={() => onSubmitDelete(blog)}
                            >
                                Eliminar
                            </Button>
                        </Box>
                        <Box display='flex' justifyContent='center'>
                            {
                                newBlog.image &&
                                newBlog.image.map((e: string) => (
                                    <Image src={e} width={300} height={300} key={e} />
                                ))
                            }
                        </Box>
                        <Box display='flex' justifyContent='center'>
                            <Typography variant='h1'>{newBlog.title}</Typography>
                        </Box>
                        <Box display='flex' justifyContent='center'>
                            <Typography variant='subtitle1'>{newBlog.subtitle}</Typography>
                        </Box>
                        <Box display='flex' justifyContent='center'>
                            <Typography variant='body1'>{newBlog.body}</Typography>
                        </Box>
                        {
                            newBlog.tags &&
                            newBlog.tags.map(e => (
                                <Chip
                                    key={e}
                                    label={e}
                                    onDelete={() => onDeleteTag(e)}
                                    color="primary"
                                    size='small'
                                    sx={{ ml: 1, mt: 1 }} />
                            ))
                        }
                    </Card>
                </Box>
                <Box display='flex' justifyContent='center'>
                    <Typography variant='h1' sx={{ mt: 3 }}>Edit Blog</Typography>
                </Box>
                <Box display='flex' justifyContent='center'>
                    <Box sx={{ m: 10, mt: 1 }} display='flex' justifyContent='center'>
                        <Box display='flex' flexDirection='column'>
                            <TextField
                                sx={{ m: 1 }}
                                label="New Title"
                                variant="filled"
                                value={newBlog.title}
                                onChange={({ target }) => setNewBlog({
                                    _id: newBlog._id,
                                    title: target.value,
                                    tags: newBlog.tags,
                                    subtitle: newBlog.subtitle,
                                    body: newBlog.body,
                                    image: newBlog.image
                                })}
                            />
                            <TextField
                                sx={{ m: 1 }}
                                label="New Subtitle"
                                variant="filled"
                                value={newBlog.subtitle}
                                onChange={({ target }) => setNewBlog({
                                    _id: newBlog._id,
                                    title: newBlog.title,
                                    tags: newBlog.tags,
                                    subtitle: target.value,
                                    body: newBlog.body,
                                    image: newBlog.image
                                })}
                            />
                            <TextField
                                sx={{ m: 1 }}
                                label="New Body"
                                variant="filled"
                                value={newBlog.body}
                                onChange={({ target }) => setNewBlog({
                                    _id: newBlog._id,
                                    title: newBlog.title,
                                    tags: newBlog.tags,
                                    subtitle: newBlog.subtitle,
                                    body: target.value,
                                    image: newBlog.image
                                })}
                                multiline
                                rows={4}
                            />
                            <TextField
                                label="tags"
                                variant="filled"
                                helperText="Presiona [spacebar] "
                                value={newTagValue}
                                onChange={({ target }) => setNewTagValue(target.value)}
                                onKeyUp={({ code }: any) => code === 'Space' ? onNewTag() : undefined}
                            />
                        </Box>
                    </Box>
                </Box>
            </LayoutInternal>


        </>
    )
}

export default BlogID

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {

    const { id = '' } = query;
    const blog = await getBlogById(id.toString())
    console.log(blog)
    return {
        props: {
            blog
        },
    }
}