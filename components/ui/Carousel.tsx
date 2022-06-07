import { Box } from '@mui/material';
import { GetStaticProps, GetStaticPaths, GetServerSideProps, NextPage } from 'next'
import { FC, useEffect } from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { getAllProjects } from "../../database/dbProjects";
import { IProject } from "../../interfaces";
import { CardProjects } from '../Cards/CardProjects';


interface Props {
    data: IProject[]
}

export const CarouselPage: FC<Props> = ({ data }) => {
    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3,
            slidesToSlide: 1 // optional, default to 1.
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
            slidesToSlide: 1 // optional, default to 1.
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
            slidesToSlide: 1 // optional, default to 1.
        }
    };
    return (

        <Carousel
            ssr
            partialVisbile
            itemClass="image-item"
            responsive={responsive}
            infinite
            autoPlay={true}
            arrows={false}
            autoPlaySpeed={3000}
            transitionDuration={1500}


        >

            {
                data.map(e => (
                    <Box display='flex' justifyContent='center'>
                        <CardProjects key={e.title} project={e} />
                    </Box>
                ))
            }





        </Carousel>

    )
}

