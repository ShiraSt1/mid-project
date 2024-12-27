import { useEffect, useState ,useRef} from "react"
import axios from 'axios'
import User from './User'
import Dialog from '@mui/material/Dialog';
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import { Alert } from '@mui/material';
import Box from '@mui/material/Box'

const Users = () => {
    const [usersData, setUsersData] = useState([])
    const [newArr, setNewArr] = useState([...usersData])
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
            const res = await axios.get('http://localhost:3005/api/user/getUsers')
            if (res.status === 200) {
                setUsersData(res.data.sort((a, b) => a._id - b._id))
                setNewArr(res.data.sort((a, b) => a._id - b._id))
                // console.log(newArr)
            }
        } catch (e) {
            console.error(e)
        }
    }

    const searchUser=async(name)=>{
        // setNewArr(name?usersData.filter((user)=>{return user.name.indexOf(name)!=-1}):[...usersData])
        setNewArr(usersData.filter((user)=>{return user.name.indexOf(name)!==-1}))
    }

    const addUser = async (newUser) => {
        try {
            const res = await axios.post(`http://localhost:3005/api/user/addUser`, newUser)
            if (res.status === 200) {
                setUsersData(res.data.sort((a, b) => a._id - b._id))
                setNewArr(res.data.sort((a, b) => a._id - b._id))
            }
        } catch (error) {
            handleShowAlert()
            console.error(`error:${error}`)
        }
    }

    useEffect(() => {
        getData()
    }, [])
    return (
        <>
            <React.Fragment>
                <Button variant="contained" onClick={handleClickOpen} 
                sx={{position:"fixed",bottom:40,left:50,zIndex:1000}}
                style={{padding: '10px 25px' }}><PersonAddAlt1Icon fontSize="large"/> </Button>
                <TextField inputRef={searchRef} onChange={()=>searchUser(searchRef.current.value)} label="Search Box" color="secondary" focused 
                sx={{position:"fixed",bottom:40,left:150,zIndex:1000,backgroundColor: "white", '& .MuiInputBase-root': {backgroundColor: 'white'}}}/>
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
                            addUser(formJson)
                            handleClose();
                        },
                    }}
                >
                    <DialogTitle>Subscribe</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            To subscribe to this website, please enter your details here.
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
                        />
                        <TextField
                            margin="dense"
                            id="phone"
                            name="phone"
                            label="phone"
                            type="text"
                            fullWidth
                            variant="standard"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button type="submit" >Subscribe</Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>
            {alertOpen && <Alert severity="error" sx={{position:"fixed",top:50,left:0}}>user can not be subscribed</Alert>}
           <Box sx={{paddingLeft:11.3}}>
            {
                newArr.map(user=>
                    (<User key={user._id} user={user} setUsersData={setUsersData} setNewArr={setNewArr}/>)
                    // 
                )
            }
            </Box>
        </>
    )
}
export default Users