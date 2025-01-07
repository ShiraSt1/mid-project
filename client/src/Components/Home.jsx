import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Users from './Users';
import Todos from './Todos';
import Post from './Posts';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import DescriptionIcon from '@mui/icons-material/Description';

const Home = () => {
    const navigate = useNavigate();
    const [value, setValue] = React.useState(0);

    const handleClickUser = () => {
        navigate('/Users')
    }
    const handleClickPost = () => {
        navigate('/Posts')
    }
    const handleClickTask = () => {
        navigate('/Tasks')
    }
    const handleClickHome = () => {
        navigate('./')
    }
    return (
        <>
            <Box 
                sx={{display: 'flex', position:"fixed",bgcolor: '#cfd8dc',height:"100%"}}
            >
                <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={value}
                    aria-label="Vertical tabs example"
                    sx={{ borderRight: 1, borderColor: 'divider' }}>
                    <Tab icon={<HomeIcon />} label="home" onClick={handleClickHome} sx={{}}/>
                    <Tab icon={<PeopleAltIcon />} label="users" onClick={handleClickUser} />
                    <Tab icon={<TaskAltIcon />} label="posts" onClick={handleClickPost} />
                    <Tab icon={<DescriptionIcon />} label="tasks" onClick={handleClickTask} />
                </Tabs>
            </Box>
            <Routes>
                <Route path='/Users' element={<Users />} />
                <Route path='/tasks' element={<Todos />} />
                <Route path='/posts' element={<Post />} />
                <Route path='./home' element={<Home />} />
            </Routes>
        </>
    );
}
export default Home