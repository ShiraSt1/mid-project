import * as React from 'react';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios'
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Alert } from '@mui/material';
import { useState } from "react"
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
const Post = (props) => {
    const [open, setOpen] = React.useState(false);
    const [alertOpen, setAlertOpen] = useState(false);
    const [editPost, setEditPost] = React.useState({
        title: props.post.title,
        body: props.post.body
    });
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

    const deletePost = async (id) => {
        // console.log("Attempting to delete post:", { id });
        try {
            const res = await axios.delete(`http://localhost:3005/api/post/deletePost/${id}`);
            if (res.status === 200) {
                props.setPostsData(res.data.sort((a, b) => a._id - b._id))
                props.setNewArr(res.data.sort((a, b) => a._id - b._id))
            }
        } catch (error) {
            console.error("Error deleting post:", error);
        }
    }
    const updatePost = async (post) => {
        try {
            const res = await axios.put(`http://localhost:3005/api/post/updatePost`, post)
            if (res.status === 200) {
                props.setPostsData(res.data);
                props.setNewArr(res.data);
            }
            // console.log(res.data);
        } catch (error) {
            handleShowAlert()
            setEditPost({ ...editPost, title: props.post.title })
            console.error("Error deleting post:", error);
        }
    }

    return (
        <>
            {alertOpen && <Alert severity="error" sx={{ position: "fixed", top: 50, left: 0 }}>post can not be updated</Alert>}
            <Accordion >
                <AccordionSummary 
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                    >
                    <div>{props.post.title}</div>
                    <DeleteIcon sx={{ cursor: "pointer" }} color={"error"} onClick={() => deletePost(props.post._id)} />
                    <ModeEditOutlineOutlinedIcon sx={{ cursor: "pointer" }} color={"success"} variant="outlined" onClick={handleClickOpen}></ModeEditOutlineOutlinedIcon>
                </AccordionSummary>
                <AccordionDetails>
                    {props.post.body}
                </AccordionDetails>
                <React.Fragment>
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
                                updatePost({ ...formJson, id: props.post._id })
                                handleClose();
                            },
                        }}
                    >
                        <DialogTitle>Update</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                To update your post, please change your post here.
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
                                value={editPost.title}
                                onChange={(e) => setEditPost({ ...editPost, title: e.target.value })}
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
                                value={editPost.body}
                                onChange={(e) => setEditPost({ ...editPost, body: e.target.value })}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button type="submit" >Save</Button>
                        </DialogActions>
                    </Dialog>
                </React.Fragment>
            </Accordion>
            {/* <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <Typography variant="h5">
                        title: {props.post.title}
                    </Typography>
                    <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                        {props.post.body}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">More Details</Button>
                    <DeleteIcon sx={{ cursor: "pointer" }} color={"error"} onClick={() => deletePost(props.post._id)} />
                    <React.Fragment>
                        <ModeEditOutlineOutlinedIcon sx={{ cursor: "pointer" }} color={"success"} variant="outlined" onClick={handleClickOpen}></ModeEditOutlineOutlinedIcon>
                        <Dialog
                            open={open}
                            onClose={handleClose}
                            PaperProps={{
                                component: 'form',
                                onSubmit: (event) => {
                                    event.preventDefault();
                                    const formData = new FormData(event.currentTarget);
                                    const formJson = Object.fromEntries(formData.entries());
                                    console.log(formJson);
                                    updatePost({ ...formJson, id: props.post._id })
                                    handleClose();
                                },
                            }}
                        >
                            <DialogTitle>Update</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    To update your post, please change your post here.
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
                                    value={editPost.title}
                                    onChange={(e) => setEditPost({ ...editPost, title: e.target.value })}
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
                                    value={editPost.body}
                                    onChange={(e) => setEditPost({ ...editPost, body: e.target.value })}
                                />
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose}>Cancel</Button>
                                <Button type="submit" >Save</Button>
                            </DialogActions>
                        </Dialog>
                    </React.Fragment>
                </CardActions>
            </Card> */}
        </>
    )
}
export default Post