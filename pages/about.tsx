import { Box, Card, CardContent, CardMedia, Chip, Grid, Typography } from "@mui/material"
import { UserLayout } from "../components/Layout"
import { Contact, SlideShow } from "../components/ui"
import Image from 'next/image'

const About = () => {
    const skills = ['MongoDB', 'SQL', 'Solidity', 'Truffle', 'React Native', 'NextJs', 'NodeJs', 'Tailwind', 'MaterialUI', 'Bulma', 'NextAuth', 'NextUI', 'Bootstrap', 'Smart Contracts', 'Ganache', 'Tokens (ERC-20, ERC-721, ERC-1155)', 'Ableton Live', 'Piano', 'Guitar']
    return (
        <>
            <UserLayout>
                <Box display='flex' justifyContent='center' sx={{ mt: 4 }}>

                    <Card sx={{ backgroundColor: 'rgba(208, 100, 0, 0.9)', width: 600 }}>
                        <SlideShow width_={700} heigth_={700} images={['https://res.cloudinary.com/dfcqgpkvs/image/upload/v1654373350/goqzjbjtzef562f1vygo.jpg', 'https://res.cloudinary.com/dfcqgpkvs/image/upload/v1654373352/z300wrzo92ipzlzxu7rr.jpg', 'https://res.cloudinary.com/dfcqgpkvs/image/upload/v1654373350/mymgbhay9puepltbmni1.jpg']} />
                        <CardMedia image='/background-index.png' />
                    </Card>
                </Box>
                <Box display='flex' justifyContent='center' sx={{ m: 5 }}>
                    <Box display='flex' alignSelf='center' >
                        <Box sx={{ backgroundColor: 'rgba(0, 0, 0, 0.3)', p: 3 }}>
                            <Typography variant='button' sx={{ m: 1, color: 'white' }} align='justify' >After dedicating many years of my life to law, I decided to leave it and start programming, I graduated as a music producer at a licensed school in Ableton Live. I love sports, I play ball and train calisthenics. On the other hand I love music, I play piano and guitar, I produce mixes with Ableton Live. I love to travel, and that is why I also decided to start programming, and today I am building the projects I dreamed of as a child. </Typography>
                        </Box>
                    </Box>
                </Box>

                <Box display='flex' flexDirection='column'>
                    <Box display='flex' justifyContent='center'>
                        <Typography variant='h1' sx={{ fontWeigth: 700, mb: 5 }}>Skills</Typography>
                    </Box>
                    <Box>

                        <Grid
                            container
                            spacing={1}
                        >

                            {
                                skills.map(e => (
                                    <Grid
                                        item
                                        xs={4}
                                        sm={4}>
                                        <Box display='flex' justifyContent='center'>
                                            <Chip label={e} color="primary" sx={{ width: { md: '500px' } }} />
                                        </Box>
                                    </Grid>
                                ))
                            }
                        </Grid>

                    </Box>
                </Box>
            </UserLayout>
        </>
    )
}

export default About