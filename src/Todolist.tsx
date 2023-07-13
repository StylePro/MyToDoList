import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType} from "./App";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type PropsType = {
    title: string
    tasks: Array<TaskType>

    removeTask: (id: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
}

export function ToDoList(props: PropsType) {

    const [newTaskTitle, setNewTaskTitle] = useState('')

    function onChangeHandler (e: ChangeEvent<HTMLInputElement>) {
        setNewTaskTitle(e.currentTarget.value)
    }

    function onKeyPressHandler (e: KeyboardEvent<HTMLInputElement>) {
        if(e.charCode === 13) {
            props.addTask(newTaskTitle)
            setNewTaskTitle('')
        }
    }

    function addTask (){
        props.addTask(newTaskTitle)
        setNewTaskTitle('')
    }

    function onAllClickHandler () {
        props.changeFilter('All')
    }
    function onActiveClickHandler () {
        props.changeFilter('active')
    }
    function onCompletedClickHandler () {
        props.changeFilter('completed')
    }


    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    type="text"
                    value={newTaskTitle}
                    onChange={onChangeHandler}
                    onKeyPress={onKeyPressHandler}
                />
                <button onClick={addTask}>+</button>
            </div>
            <ul>
                {props.tasks.map(t => {
                    const onRemoveHandler = ()=> {
                        props.removeTask(t.id)
                    }
                    return <li key={t.id}><input type="checkbox" checked={t.isDone}/><span>{t.title}</span>
                        <button onClick={onRemoveHandler}>х
                        </button>
                    </li>})
            }
            </ul>
            <div>
                <button onClick={onAllClickHandler}>All
                </button>
                <button onClick={onActiveClickHandler}>Active
                </button>
                <button onClick={onCompletedClickHandler}>Completed
                </button>
            </div>
        </div>
    )
}