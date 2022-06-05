import { Box, Divider, Drawer, IconButton, Input, InputAdornment, List, ListItem, ListItemIcon, ListItemText, ListSubheader } from "@mui/material"
import HomeRepairServiceRoundedIcon from '@mui/icons-material/HomeRepairServiceRounded';
import { SearchOutlined } from "@mui/icons-material";
import BookRoundedIcon from '@mui/icons-material/BookRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import AccountTreeRoundedIcon from '@mui/icons-material/AccountTreeRounded';
import Link from "next/link";
import { useContext } from "react";
import { UiContext } from "../../context/ui";
import { useRouter } from "next/router";

export const SideMenu = () => {
    const router = useRouter()
    const { isMenuOpen, toggleSideMenu } = useContext(UiContext)

    const navigateTo = (url: string) => {
        toggleSideMenu();
        router.push(url);
    }

    return (
        <Drawer
            open={isMenuOpen}
            anchor='left'
            sx={{ backdropFilter: 'blur(4px)', transition: 'all 0.5s ease-out'}}
            onClose={toggleSideMenu}
            
        >
            <Box sx={{ width: 250, paddingTop: 5 }}>

                <List>
                    <ListItem button
                        onClick={() => navigateTo('/')}
                    >
                        <ListItemIcon>
                            <HomeRoundedIcon />
                        </ListItemIcon>
                        <ListItemText primary={'Home'} />
                    </ListItem>

                    <ListItem button
                        onClick={() => navigateTo('/projects')}
                    >
                        <ListItemIcon>
                            <HomeRepairServiceRoundedIcon />
                        </ListItemIcon>
                        <ListItemText primary={'Projects'} />
                    </ListItem>

                    <ListItem button
                        onClick={() => navigateTo('/about')}>
                        <ListItemIcon>
                            <InfoRoundedIcon />
                        </ListItemIcon>
                        <ListItemText primary={'About'} />
                    </ListItem>
                </List>
            </Box>
        </Drawer>
    )
}