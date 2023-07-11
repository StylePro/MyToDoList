import React from "react";
import {FilterValuesType} from "./App";

export type TaskType = {
   id: number
   title: string
   isDone: boolean
}
type PropsType = {
    title: string
    tasks: Array<TaskType>

    removeTask: (id: number)=> void
    changeFilter: (value: FilterValuesType) => void
}

export function ToDoList(props: PropsType) {
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input type="text"/>
                <button>+</button>
            </div>
            <ul>
                {props.tasks.map(t=>
                    <li key={t.id}><input type="checkbox" checked={t.isDone}/><span>{t.title}</span>
                    <button onClick={()=> {props.removeTask(t.id)} }>х</button>
                    </li>)}
            </ul>
            <div>
                <button onClick={()=> {props.changeFilter('All')}}>All</button>
                <button onClick={()=> {props.changeFilter('active')}}>Active</button>
                <button onClick={()=> {props.changeFilter('completed')}}>Completed</button>
            </div>
        </div>
    )
}