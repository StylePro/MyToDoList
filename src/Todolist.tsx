import React, {ChangeEvent} from 'react';
import {FilterValuesType} from "./App";
import './App.css'
import AddItemForm from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    addTask: (title: string, todolistId: string) => void

    removeTask: (id: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    changeTodolistTitle: (id: string, newTitle: string)=> void
    filter: FilterValuesType
    id: string
    removeTDL: (todolistId: string) => void
}
const Todolist = (props: PropsType) => {

    function onAllClickHandler() {
        props.changeFilter('All', props.id)
    }

    function onActiveClickHandler() {
        props.changeFilter('active', props.id)
    }

    function onCompletedClickHandler() {
        props.changeFilter('completed', props.id)
    }

    function removeToDoList() {
        props.removeTDL(props.id)
    }

    function changeTodolistTitle(newTitle: string) {
        props.changeTodolistTitle(props.id, newTitle)
    }

    function addTask(title: string) {
        props.addTask(title, props.id)
    }

    return (
        <div>
            <h3> <EditableSpan title={props.title} onChange={changeTodolistTitle}/>
                <IconButton color ='primary' onClick={removeToDoList} aria-label="delete" size="large">
                    <DeleteIcon fontSize="inherit" />
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <div>
                {props.tasks.map(t => {
                        function onRemoveHandler() {
                            props.removeTask(t.id, props.id)
                        }

                        function onChangeStatusHandler(e: ChangeEvent<HTMLInputElement>) {
                            props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)
                        }
                        function onChangeTitleHandler(newValue: string) {
                            props.changeTaskTitle(t.id, newValue, props.id)
                        }

                        return <div key={t.id} className={t.isDone ? 'is-done' : ''}>
                            <Checkbox
                                defaultChecked color="secondary"
                                onChange={onChangeStatusHandler}
                                checked={t.isDone}/>
                            <EditableSpan title={t.title} onChange={onChangeTitleHandler}/>
                            <IconButton color ='primary' onClick={onRemoveHandler} aria-label="delete" size="large">
                                <DeleteIcon fontSize="inherit" />
                            </IconButton>
                        </div>
                    }
                )}
            </div>
            <div>
                <Button variant = {props.filter === 'All' ? 'contained': 'text'} onClick={onAllClickHandler}>All
                </Button>
                <Button color='primary' variant={props.filter === 'active' ? 'contained' : 'text'} onClick={onActiveClickHandler}>Active
                </Button>
                <Button color='secondary' variant={props.filter === 'completed' ? 'contained' : 'text'} onClick={onCompletedClickHandler}>Completed
                </Button>
            </div>
        </div>
    );
};


export default Todolist;