import { GetServerSideProps, NextPage } from 'next';
import { getExperienceById } from '../../database/dbExperience';
import { IExperience } from '../../interfaces';
import { useState } from 'react';
import { Box, Card, Chip, Typography, TextField, Button } from '@mui/material';
import Image from 'next/image';
import { SaveOutlined, RemoveOutlined } from '@mui/icons-material';
import router from 'next/router';
import portfolioApi from '../../api/portfolioApi';
import { useRouter } from 'next/router';
import { LayoutInternal } from '../../components/Layout';

interface Props {
    experience: IExperience
}

const ExperienceID: NextPage<Props> = ({ experience }) => {
    const router = useRouter()
    const [newTagValue, setNewTagValue] = useState('');
    const [newExperience, setNewExperience] = useState<IExperience>({
        _id: experience._id,
        title: experience.title,
        tags: experience.tags,
        subtitle: experience.subtitle,
        body: experience.body,
        image: experience.image
    })
    const onNewTag = () => {
        try {

            const newTag = newTagValue.trim().toLocaleLowerCase();
            setNewTagValue('');
            const currentTags: string[] = newExperience.tags

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
            const updatedTags = newExperience.tags.filter(t => t !== tag);
            setNewExperience({
                _id: newExperience._id,
                title: newExperience.title,
                tags: updatedTags,
                subtitle: newExperience.subtitle,
                body: newExperience.body,
                image: newExperience.image
            })
        }
        catch (err) {
            alert(err)
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
    const onSubmitExperience = async (form: IExperience) => {
        try {


            const { data } = await portfolioApi({

                url: '/experience',
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
                                onClick={() => onSubmitExperience(newExperience)}
                            >
                                Guardar
                            </Button>
                            <Button
                                color="secondary"
                                variant='contained'
                                startIcon={<RemoveOutlined />}
                                sx={{ width: '150px', m: 3 }}
                                onClick={() => onSubmitDelete(experience)}
                            >
                                Eliminar
                            </Button>
                        </Box>
                        <Box display='flex' justifyContent='center'>
                            {
                                newExperience.image &&
                                newExperience.image.map((e: string) => (
                                    <Image src={e} width={300} height={300} key={e} />
                                ))
                            }
                        </Box>
                        <Box display='flex' justifyContent='center'>
                            <Typography variant='h1'>{newExperience.title}</Typography>
                        </Box>
                        <Box display='flex' justifyContent='center'>
                            <Typography variant='subtitle1'>{newExperience.subtitle}</Typography>
                        </Box>
                        <Box display='flex' justifyContent='center'>
                            <Typography variant='body1'>{newExperience.body}</Typography>
                        </Box>
                        {
                            newExperience.tags &&
                            newExperience.tags.map(e => (
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
                    <Typography variant='h1' sx={{ mt: 3 }}>Edit Experience</Typography>
                </Box>
                <Box display='flex' justifyContent='center'>
                    <Box sx={{ m: 10, mt: 1 }} display='flex' justifyContent='center'>
                        <Box display='flex' flexDirection='column'>
                            <TextField
                                sx={{ m: 1 }}
                                label="New Title"
                                variant="filled"
                                value={newExperience.title}
                                onChange={({ target }) => setNewExperience({
                                    _id: newExperience._id,
                                    title: target.value,
                                    tags: newExperience.tags,
                                    subtitle: newExperience.subtitle,
                                    body: newExperience.body,
                                    image: newExperience.image
                                })}
                            />
                            <TextField
                                sx={{ m: 1 }}
                                label="New Subtitle"
                                variant="filled"
                                value={newExperience.subtitle}
                                onChange={({ target }) => setNewExperience({
                                    _id: newExperience._id,
                                    title: newExperience.title,
                                    tags: newExperience.tags,
                                    subtitle: target.value,
                                    body: newExperience.body,
                                    image: newExperience.image
                                })}
                            />
                            <TextField
                                sx={{ m: 1 }}
                                label="New Body"
                                variant="filled"
                                value={newExperience.body}
                                onChange={({ target }) => setNewExperience({
                                    _id: newExperience._id,
                                    title: newExperience.title,
                                    tags: newExperience.tags,
                                    subtitle: newExperience.subtitle,
                                    body: target.value,
                                    image: newExperience.image
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

export default ExperienceID

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {

    const { id = '' } = query;
    const experience = await getExperienceById(id.toString())
    console.log(experience)
    return {
        props: {
            experience
        },
    }
}
