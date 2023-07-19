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

    removeTask: (id: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    filter: FilterValuesType
    id: string
}

export function ToDoList(props: PropsType) {

    const [newTaskTitle, setNewTaskTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    function onChangeHandler(e: ChangeEvent<HTMLInputElement>) {
        setNewTaskTitle(e.currentTarget.value)
    }

    function onKeyPressHandler(e: KeyboardEvent<HTMLInputElement>) {
        setError(null)
        if (e.charCode === 13) {
            addTask()
        }
    }

    function addTask() {
        if (newTaskTitle.trim() !== '') {
            props.addTask(newTaskTitle.trim(), props.id)
            setNewTaskTitle('')
        } else {
            setError('Title is Required')
        }

    }

    function onAllClickHandler() {
        props.changeFilter('All', props.id)
    }

    function onActiveClickHandler() {
        props.changeFilter('active', props.id)
    }

    function onCompletedClickHandler() {
        props.changeFilter('completed', props.id)
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
                    className={error? 'error' : ''}
                />
                <button onClick={addTask}>+</button>
                {error && <div className='error_message'>{error}</div>}
            </div>
            <ul>
                {props.tasks.map(t => {
                    const onRemoveHandler = () => {
                        props.removeTask(t.id, props.id)
                    }

                    const onChangeCheckedHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)
                    }
                    return <li
                        className={t.isDone ? 'is_done' : ''}
                        key={t.id}><input type="checkbox" onChange={onChangeCheckedHandler}
                                                 checked={t.isDone}/><span>{t.title}</span>
                        <button onClick={onRemoveHandler}>х
                        </button>
                    </li>
                })
                }
            </ul>
            <div>
                <button className={props.filter === 'All' ? 'active_filter' : ''}
                        onClick={onAllClickHandler}>All
                </button>
                <button
                    className={props.filter === 'active' ? 'active_filter' : ''}
                    onClick={onActiveClickHandler}>Active
                </button>
                <button
                    className={props.filter === 'completed' ? 'active_filter' : ''}
                    onClick={onCompletedClickHandler}>Completed
                </button>
            </div>
        </div>
    )
}