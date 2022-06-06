import { Box, Divider, Drawer, IconButton, Input, InputAdornment, List, ListItem, ListItemIcon, ListItemText, ListSubheader } from "@mui/material"
import HomeRepairServiceRoundedIcon from '@mui/icons-material/HomeRepairServiceRounded';

import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

import { useContext } from "react";
import { UiContext } from "../../context/ui";
import { useRouter } from "next/router";

export const SideMenu = () => {
    const router = useRouter()
    const { isMenuOpen, toggleSideMenu } = useContext(UiContext)

    const navigateTo = (url: string) => {
        console.log('hola')
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
            <Box sx={{ width: 250, mt: 10 }}>

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
                    <ListItem button
                        onClick={() => navigateTo('/cv')}>
                        <ListItemIcon>
                            <AccountBoxIcon />
                        </ListItemIcon>
                        <ListItemText primary={'CV'} />
                    </ListItem>
                </List>
            </Box>
        </Drawer>
    )
}