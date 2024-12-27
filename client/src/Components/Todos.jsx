import { useEffect, useState ,useRef} from "react"
import axios from 'axios'
import Todo from './Todo'
import Dialog from '@mui/material/Dialog';
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid2';
import AddTaskIcon from '@mui/icons-material/AddTask';
import { Alert } from '@mui/material';

const Todos = () => {
    const [todosData, setTodosData] = useState([])
    const [newArr, setNewArr] = useState([...todosData])
    const [alertOpen, setAlertOpen] = useState(false);
    const searchRef=useRef(null)
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleShowAlert = () => {
        setAlertOpen(true);  
        setTimeout(() => setAlertOpen(false), 3000);  
      };
    const handleClose = () => {
        setOpen(false);
    };

    const getData = async () => {
        try {
            const res = await axios.get('http://localhost:3005/api/todo/getTodos')
            if (res.status === 200) {
                // res.sortById()
                setTodosData(res.data.sort((a, b) => a._id - b._id))
                setNewArr(res.data.sort((a, b) => a._id - b._id))
            }
        } catch (e) {
            // <Alert variant="outlined" severity="error">can not add this post</Alert>
            console.error(e)
        }
    }

    const addTodo = async (newTodo) => {
        try {
            const res = await axios.post(`http://localhost:3005/api/todo/addTodo`, newTodo)
            if (res.status === 200) {
                setTodosData(res.data.sort((a, b) => a._id - b._id))
                setNewArr(res.data.sort((a, b) => a._id - b._id))
            }
        } catch (error) {
            handleShowAlert()
            console.error(`error:${error}`)
        }
    }
    const searchTodo = (title) => {
        setNewArr(todosData.filter((todo)=>{return todo.title.indexOf(title)!=-1}))
    }
    useEffect(() => {
        getData()
    }, [])
    return (
        <>
            <React.Fragment>
                <Button variant="contained" onClick={handleClickOpen} sx={{position:"fixed",bottom:40,left:50,zIndex:1000}}
                style={{padding: '10px 25px' }}><AddTaskIcon fontSize="large" /></Button>
                <TextField inputRef={searchRef} onChange={() => searchTodo(searchRef.current.value)} label="Search Box" color="secondary" focused
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
                            addTodo(formJson)
                            handleClose();
                        },
                    }}
                >
                    <DialogTitle>Add Task</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            To add a new task, please enter your task here.
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
                            id="tags"
                            name="tags"
                            label="Tags"
                            type="text"
                            fullWidth
                            variant="standard"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button type="submit" >Add Task</Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>
            {alertOpen && <Alert severity="error" sx={{position:"fixed",top:50,left:0}}>task can not be added</Alert>}
            <Grid container spacing={2} sx={{paddingLeft:11.3}}>
                {
                    newArr.map(todo =>
                    (
                        <Grid size={3}>
                            <Todo todo={todo} key={todo._id} setTodosData={setTodosData} setNewArr={setNewArr}/>
                        </Grid>
                    ))
                }
            </Grid>
        </>
    )
}
export default Todos