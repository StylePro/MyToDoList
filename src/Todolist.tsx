import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from "./App";
import './App.css'



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
    changeStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    filter: FilterValuesType
    id: string
    removeToDoList: (todolistId: string)=> void
}
const Todolist = (props: PropsType) => {

    const [newTaskText, setNewTaskText] = useState('')
    const [error, setError] = useState('')

    function addTask() {
        if (newTaskText.trim() !== '') {
            props.addTask(newTaskText.trim(), props.id)
            setNewTaskText('')
        } else {
            setError('Title is required')
        }

    }

    function onChangeHandler(e: ChangeEvent<HTMLInputElement>) {
        setNewTaskText(e.currentTarget.value)
    }

    function onKeyPressHandler(e: KeyboardEvent<HTMLInputElement>) {
        setError('')
        if (e.charCode === 13) {
            addTask()
        }
    }

    function onAllClickHandler() {
        props.changeFilter('all', props.id)
    }

    function onActiveClickHandler() {
        props.changeFilter('active', props.id)
    }

    function onCompletedClickHandler() {
        props.changeFilter('completed', props.id)
    }

    function removeToDoList () {
        props.removeToDoList(props.id)
    }

    return (
        <div>
            <h3>{props.title} <button onClick={removeToDoList}>X</button> </h3>
            <div>
                <input
                    value={newTaskText}
                    onChange={onChangeHandler}
                    onKeyPress={onKeyPressHandler}
                    className={error? 'error' : ''}
                />
                <button
                    onClick={addTask}
                >+
                </button>
                {error ?  <div className='error-message'>{error}</div>: ''}
            </div>
            <ul>
                {props.tasks.map(t => {
                        function onRemoveHandler() {
                            props.removeTask(t.id, props.id)
                        }

                        function onChangeHandler(e: ChangeEvent<HTMLInputElement>) {
                            props.changeStatus(t.id, e.currentTarget.checked, props.id)
                        }

                        return <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                            <input
                                type="checkbox"
                                onChange={onChangeHandler}
                                checked={t.isDone}/><span>{t.title}</span>
                            <button onClick={onRemoveHandler}>х</button>
                        </li>
                    }
                )}
            </ul>
            <div>
                <button className={props.filter === 'all'? 'active-filter': ''} onClick={onAllClickHandler}>All</button>
                <button className={props.filter === 'active'? 'active-filter': ''} onClick={onActiveClickHandler}>Active</button>
                <button className={props.filter === 'completed'? 'active-filter': ''} onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    );
};

export default Todolist;