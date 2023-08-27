import React, {useState} from 'react';
import './App.css';
import {v1} from "uuid";
import Todolist, {TaskType} from "./Todolist";
import AddItemForm from "./AddItemForm";
import {AppBar, Container, Grid, IconButton, Paper, Toolbar} from "@mui/material";
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';

export type FilterValuesType = 'All' | 'completed' | 'active'
type ToDoValues = {
    id: string
    title: string
    filter: FilterValuesType
}

type TasksStateType = {
    [key: string]: Array<TaskType>
}


function App() {

    let todolist1 = v1();
    let todolist2 = v1();
    const [toDoLists, setToDoLists] = useState<Array<ToDoValues>>([
        {id: todolist1, title: 'What to study', filter: 'All'},
        {id: todolist2, title: 'What to buy', filter: 'All'},
    ])

    const [tasksObj, setTasks] = useState<TasksStateType>({
        [todolist1]: [
            {id: v1(), title: "CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "React", isDone: false},
        ],
        [todolist2]: [
            {id: v1(), title: "MacBook", isDone: true},
            {id: v1(), title: "Book", isDone: true},
            {id: v1(), title: "Pen", isDone: false},
        ],
    })

    function changeFilter(value: FilterValuesType, todolistId: string) {
        let todolist = toDoLists.find(tl => tl.id === todolistId)
        if (todolist) {
            todolist.filter = value;
        }
        setToDoLists([...toDoLists])
    }

    function removeTask(id: string, todolistId: string) {
        let tasks = tasksObj[todolistId];
        let filteredTasks = tasks.filter(t => t.id !== id)
        tasksObj[todolistId] = filteredTasks
        setTasks({...tasksObj})
    }

    function removeTDL(todolistId: string) {
        let filteredTDL = toDoLists.filter(tl => tl.id !== todolistId)
        setToDoLists([...filteredTDL])
    }

    function changeTaskTitle(taskId: string, newTask: string, todolistId: string) {
        let tasks = tasksObj[todolistId];
        let task = tasks.find(t => t.id === taskId)
        if (task) {
            task.title = newTask
            setTasks({...tasksObj})
        }

    }

    function changeTodolistTitle(id: string, newTitle: string) {
        let todolist = toDoLists.find(tl => tl.id === id)
        if (todolist) {
            todolist.title = newTitle;
            setToDoLists([...toDoLists])
        }
    }

    function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
        let tasks = tasksObj[todolistId];
        let task = tasks.find(t => t.id === taskId)
        if (task) {
            task.isDone = isDone
            setTasks({...tasksObj})
        }

    }

    function addTask(title: string, todolistId: string) {
        let task = {id: v1(), title: title, isDone: false}
        let tasks = tasksObj[todolistId];
        let newTasks = [task, ...tasks]
        tasksObj[todolistId] = newTasks
        setTasks({...tasksObj})
    }

    function addToDoList(title: string) {
        let todolist: ToDoValues = {id: v1(), title: title, filter: 'All'}
        setToDoLists([todolist, ...toDoLists])
        setTasks({[todolist.id]: [], ...tasksObj})
    }

    return (
        <div className='App'>
            <AppBar position="static">
                <Toolbar variant="dense">
                    <IconButton edge="start" color="inherit" aria-label="menu" sx={{mr: 2}}>
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" color="inherit" component="div">
                        LOGIN
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container fixed style={{padding: '10px'}}>
                <Grid container>
                    <AddItemForm addItem={addToDoList}/>
                </Grid>
                <Grid container spacing={3}>
                    {toDoLists.map((tl) => {
                        let tasksForTodoList = tasksObj[tl.id];
                        console.log(tasksObj[tl.id])
                        if (tl.filter === 'active') {
                            tasksForTodoList = tasksForTodoList.filter(t => !t.isDone)
                        }
                        if (tl.filter === 'completed') {
                            tasksForTodoList = tasksForTodoList.filter(t => t.isDone)
                        }
                        return <Grid item>
                            <Paper elevation={3} style={{padding: '10px', marginTop: '5px' }}>
                                <Todolist
                                    key={tl.id}
                                    id={tl.id}
                                    title={tl.title}
                                    tasks={tasksForTodoList}
                                    removeTask={removeTask}
                                    changeFilter={changeFilter}
                                    addTask={addTask}
                                    changeTaskStatus={changeStatus}
                                    filter={tl.filter}
                                    removeTDL={removeTDL}
                                    changeTaskTitle={changeTaskTitle}
                                    changeTodolistTitle={changeTodolistTitle}
                                />
                            </Paper>
                        </Grid>
                    })}
                </Grid>

            </Container>
        </div>
    )
}


export default App;
