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
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Alert } from '@mui/material';
import { useState } from "react"

const Todo = (props) => {
    const [open, setOpen] = React.useState(false);
    const [alertOpen, setAlertOpen] = useState(false);
    const [color,setColor]= React.useState(
        props.todo.completed===false?"disabled":"success"
    );
    const handleShowAlert = () => {
        setAlertOpen(true);  
        setTimeout(() => setAlertOpen(false), 3000);  
      };
    const [editTodo, setEditTodo] = React.useState({
        title:props.todo.title,
        tags:props.todo.tags
    });
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const deleteTodo = async (id) => {
        // console.log("Attempting to delete todo:", { id });
        try {
            const res = await axios.delete(`http://localhost:3005/api/todo/deleteTodo/${id}`);
            if (res.status === 200) {
                props.setTodosData(res.data.sort((a, b) => a._id - b._id))
                props.setNewArr(res.data.sort((a, b) => a._id - b._id))
            }
        } catch (error) {
            console.error("Error deleting todo:", error);
        }
    }
    const completeTodo=()=>{
        if(props.todo.completed===true){
            updateTodo({...props.todo,completed:false,id:props.todo._id})
            setColor("disabled")
        }
        else{
            updateTodo({...props.todo,completed:true,id:props.todo._id})
            setColor("success")
        }
    }

    const updateTodo = async (todo) => {
        try{
            const res= await axios.put(`http://localhost:3005/api/todo/updateTodo`,todo)
            if (res.status === 200) {
            props.setTodosData(res.data);
            props.setNewArr(res.data)
            }
            // console.log(res.data);
        }catch(error){
            handleShowAlert()
            setEditTodo({...editTodo,title:props.todo.title})
            console.error("Error deleting todo:", error);
        }
    }

    return (
        <>
            {alertOpen && <Alert severity="error" sx={{position:"fixed",top:50,left:0}}>task can not be updated</Alert>}
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <Typography variant="h5">
                       {props.todo.title}
                    </Typography>
                    <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                        {props.todo.tags.map((tag)=>{
                            // console.log(tag) 
                            return `${tag}, `})}
                    </Typography>
                    <Typography>
                        {props.todo.completed}
                    </Typography>
                </CardContent>
                <CardActions>
                    {/* <Button size="small">More Details</Button> */}
                    <DeleteIcon color={"error"} sx={{cursor:"pointer"}} fontSize="large" onClick={() => deleteTodo(props.todo._id)} />
                    <CheckCircleIcon color={color} sx={{cursor:"pointer"}} fontSize="large" onClick={() => completeTodo(props.todo._id)}/>
                    <React.Fragment>
                        <ModeEditOutlineOutlinedIcon color={"info"} fontSize="large" sx={{cursor:"pointer"}} variant="outlined" onClick={handleClickOpen}></ModeEditOutlineOutlinedIcon>
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
                                    updateTodo({...formJson,id:props.todo._id})
                                    handleClose();
                                },
                            }}>
                            <DialogTitle>Update</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    To update your task, please change your task here.
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
                                    value={editTodo.title}
                                    onChange={(e)=>setEditTodo({...editTodo,title:e.target.value})}
                                />
                                <TextField
                                required
                                    margin="dense"
                                    id="tags"
                                    name="tags"
                                    label="Tags"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    value={editTodo.tags}
                                    onChange={(e)=>setEditTodo({...editTodo,tags:e.target.value})}
                                />
                                
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose}>Cancel</Button>
                                <Button type="submit" >Save</Button>
                            </DialogActions>
                        </Dialog>
                    </React.Fragment>
                </CardActions>
            </Card>
        </>
    )
}
export default Todo