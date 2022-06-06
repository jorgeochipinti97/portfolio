import { Box } from "@mui/material"
import { UserLayout } from "../components/Layout"

const cv = () => {
    return (
        <>


                <UserLayout>
                    <Box sx={{mt:10}}/>
            <iframe style={{ width: '100%', height: '800px' }} src="/cv.pdf" >
            </iframe>
                </UserLayout>

        </>
    )
}

export default cv