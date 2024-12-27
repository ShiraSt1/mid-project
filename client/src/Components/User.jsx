import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios'
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import { Alert } from '@mui/material';
import { useState } from "react"
import Avatar from '@mui/material/Avatar';
import { deepOrange } from '@mui/material/colors';

const User = (props) => {
    const [open, setOpen] = React.useState(false);
    const [alertOpen, setAlertOpen] = useState(false);
    const [editUser, setEditUser] = React.useState({
        name: props.user.name,
        userName: props.user.userName,
        email: props.user.email,
        phone: props.user.phone,
        address: props.user.address,
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

    const deleteUser = async (id) => {
        // console.log("Attempting to delete user:", { id });
        try {
            const res = await axios.delete(`http://localhost:3005/api/user/deleteUser/${id}`);
            if (res.status === 200) {
                props.setUsersData(res.data.sort((a, b) => a._id - b._id))
                props.setNewArr(res.data.sort((a, b) => a._id - b._id))
            }
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    }
    const updateUser = async (user) => {
        try {
            const res = await axios.put(`http://localhost:3005/api/user/updateUser`, user)
            if (res.status === 200) {
                props.setUsersData(res.data);
                props.setNewArr(res.data);
            }
            
            // console.log(res.data);
        } catch (error) {
            handleShowAlert()
            setEditUser({...editUser,userName: props.user.userName})
        }
    }

    return (
        <>
            {alertOpen && <Alert severity="error" sx={{position:"fixed",top:50,left:0}}>user can not be updated</Alert>}
            <Card sx={{ minWidth: 275}} >
                <Paper variant="outlined" elevation={10}>
                    <CardContent>
                        <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                        <Avatar>{props.user.name.split("")[0]}</Avatar>user name: {props.user.userName}
                        {/* ????????????????????????????????????////////////////// */}
                        </Typography>
                        <Typography variant="h5">
                            {props.user.name}
                        </Typography>
                        <Typography>
                            {props.user.email}
                        </Typography>
                        <Typography>
                            {props.user.phone}
                        </Typography>
                        <Typography>
                            {props.user.address}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button onClick={() => deleteUser(props.user._id)} color={"error"} variant="outlined" startIcon={<DeleteIcon />}>
                            Delete
                        </Button>
                        <React.Fragment>
                            <Button onClick={handleClickOpen} color={"success"} variant="outlined" startIcon={<ModeEditOutlineOutlinedIcon />}>
                                Update
                            </Button>
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
                                        updateUser({ ...formJson, id: props.user._id })
                                        handleClose();
                                    },
                                }}>
                                <DialogTitle>Update</DialogTitle>
                                <DialogContent>
                                    <DialogContentText>
                                        To update your details, please change your details here.
                                    </DialogContentText>
                                    <TextField
                                        autoFocus
                                        required
                                        margin="dense"
                                        id="name"
                                        name="name"
                                        label="full name"
                                        type="text"
                                        fullWidth
                                        variant="standard"
                                        value={editUser.name}
                                        onChange={(e) => setEditUser({ ...editUser, name: e.target.value })}
                                    />
                                    <TextField
                                        required
                                        margin="dense"
                                        id="userName"
                                        name="userName"
                                        label="user name"
                                        type="text"
                                        fullWidth
                                        variant="standard"
                                        value={editUser.userName}
                                        onChange={(e) => setEditUser({ ...editUser, userName: e.target.value })}
                                    />
                                    <TextField
                                        required
                                        margin="dense"
                                        id="email"
                                        name="email"
                                        label="Email Address"
                                        type="email"
                                        fullWidth
                                        variant="standard"
                                        value={editUser.email}
                                        onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
                                    />
                                    <TextField
                                        required
                                        margin="dense"
                                        id="address"
                                        name="address"
                                        label="address"
                                        type="text"
                                        fullWidth
                                        variant="standard"
                                        value={editUser.address}
                                        onChange={(e) => setEditUser({ ...editUser, address: e.target.value })}
                                    />
                                    <TextField
                                        margin="dense"
                                        id="phone"
                                        name="phone"
                                        label="phone"
                                        type="text"
                                        fullWidth
                                        variant="standard"
                                        value={editUser.phone}
                                        onChange={(e) => setEditUser({ ...editUser, phone: e.target.value })}
                                    />
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleClose}>Cancel</Button>
                                    <Button type="submit" >Save</Button>
                                </DialogActions>
                            </Dialog>
                        </React.Fragment>
                    </CardActions>
                </Paper>
            </Card>
        </>
    )
}
export default User