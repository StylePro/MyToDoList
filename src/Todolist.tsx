import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from "./App";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    addTask: (title: string) => void

    removeTask: (id: string) => void
    changeFilter: (value: FilterValuesType) => void
}
const Todolist = (props: PropsType) => {

    const [newTaskText, setNewTaskText] = useState('')

    function addTask() {
        props.addTask(newTaskText)
        setNewTaskText('')
    }

    function onChangeHandler(e: ChangeEvent<HTMLInputElement>) {
        setNewTaskText(e.currentTarget.value)
    }

    function onKeyPressHandler(e: KeyboardEvent<HTMLInputElement>) {
        if (e.charCode === 13) {
            props.addTask(newTaskText);
            setNewTaskText('')
        }
    }

    function onAllClickHandler() {
        props.changeFilter('all')
    }

    function onActiveClickHandler() {
        props.changeFilter('active')
    }

    function onCompletedClickHandler() {
        props.changeFilter('completed')
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    value={newTaskText}
                    onChange={onChangeHandler}
                    onKeyPress={onKeyPressHandler}
                />
                <button
                    onClick={addTask}
                >+
                </button>
            </div>
            <ul>
                {props.tasks.map(t => {
                    function onRemoveHandler () {
                        props.removeTask(t.id)
                    }
                    return <li key={t.id}>
                        <input type="checkbox" checked={t.isDone}/> <span>{t.title}</span>
                        <button onClick={onRemoveHandler}>х</button>
                    </li>
                    }
                )}
            </ul>
            <div>
                <button onClick={onAllClickHandler}>All</button>
                <button onClick={onActiveClickHandler}>Active</button>
                <button onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    );
};

export default Todolist;