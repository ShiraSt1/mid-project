import { useEffect, useState ,useRef} from "react"
import axios from 'axios'
import Post from './Post'
import Dialog from '@mui/material/Dialog';
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid2';
import PostAddIcon from '@mui/icons-material/PostAdd';
import { Alert } from '@mui/material';

const Posts = () => {
    const [postsData, setPostsData] = useState([])
    const [newArr, setNewArr] = useState([...postsData])
    const searchRef=useRef(null)
    const [open, setOpen] = React.useState(false);
    const [alertOpen, setAlertOpen] = useState(false);
    
    const handleShowAlert = () => {
        setAlertOpen(true);  
        setTimeout(() => setAlertOpen(false), 3000);  
      };
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const getData = async () => {
        try {
            const res = await axios.get('http://localhost:3005/api/post/getPosts')
            if (res.status === 200) {
                setPostsData(res.data.sort((a, b) => a._id - b._id))
                setNewArr(res.data.sort((a, b) => a._id - b._id))
            }
        } catch (e) {
            // <Alert variant="outlined" severity="error">can not add this post</Alert>
            console.error(e)
        }
    }

    const addPost = async (newPost) => {
        try {
            const res = await axios.post(`http://localhost:3005/api/post/addPost`, newPost)
            if (res.status === 200) {
                setPostsData(res.data.sort((a, b) => a._id - b._id))
                setNewArr(res.data.sort((a, b) => a._id - b._id))
            }
        } catch (error) {
            handleShowAlert()
            console.error(`error:${error}`)
        }
    }

    const searchPost = (title) => {
        setNewArr(postsData.filter((post)=>{return post.title.indexOf(title)!=-1}))
    }

    useEffect(() => {
        getData()
    }, [])
    return (
        <>
            <React.Fragment>
                <Button variant="contained" onClick={handleClickOpen} sx={{position:"fixed",bottom:40,left:50,zIndex:1000}}
                style={{padding: '10px 25px' }}><PostAddIcon fontSize="large" /></Button>
                <TextField inputRef={searchRef} onChange={() => searchPost(searchRef.current.value)} label="Search Box" color="secondary" focused
                    sx={{ position: "fixed", bottom: 40, left: 150, zIndex: 1000, backgroundColor: "white", '& .MuiInputBase-root': { backgroundColor: 'white' } }} />
                <Dialog
                    open={open}
                    onClose={handleClose}
                    PaperProps={{
                        component: 'form',
                        onSubmit: (event) => {
                            event.preventDefault();
                            const formData = new FormData(event.currentTarget);
                            const formJson = Object.fromEntries(formData.entries());
                            // console.log(formJson);
                            addPost(formJson)
                            handleClose();
                        },
                    }}
                >
                    <DialogTitle>Add Post</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            To add a new post, please enter your post here.
                        </DialogContentText>
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="title"
                            name="title"
                            label="Title"
                            type="text"
                            fullWidth
                            variant="standard"
                        />
                        <TextField
                            required
                            margin="dense"
                            id="body"
                            name="body"
                            label="Body"
                            type="text"
                            fullWidth
                            variant="standard"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button type="submit" >Add Post</Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>
            {alertOpen && <Alert severity="error" sx={{position:"fixed",top:50,left:0}}>post can not be added</Alert>}
            <Grid container spacing={2} sx={{paddingLeft:11.4}}>
                {
                    newArr.map(post =>
                    (
                        <Grid size={6}>
                            <Post post={post} key={post._id} setPostsData={setPostsData} setNewArr={setNewArr}/>
                        </Grid>
                    ))
                }
            </Grid>
        </>
    )
}
export default Posts