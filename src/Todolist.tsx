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
    changeTaskStatus: (id: string, isDone: boolean) => void
    filter: FilterValuesType
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
            props.addTask(newTaskTitle.trim())
            setNewTaskTitle('')
        } else {
            setError('Title is Requared')
        }

    }

    function onAllClickHandler() {
        props.changeFilter('All')
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
                        props.removeTask(t.id)
                    }

                    const onChangeCheckedHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(t.id, e.currentTarget.checked)
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