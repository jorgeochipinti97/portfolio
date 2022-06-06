import { Box } from "@mui/material"
import { UserLayout } from "../components/Layout"

const cv = () => {
    return (
        <>

                    <iframe style={{ width: '100%', height: '800px' }} src="/cv.pdf" >
                    </iframe>
            <UserLayout>
            </UserLayout>
        </>
    )
}

export default cv