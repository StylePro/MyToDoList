import React, {useState} from 'react';
import './App.css';
import {TaskType, ToDoList} from "./Todolist";
import {v1} from "uuid";

export type FilterValuesType = 'All' | 'completed' | 'active'
type ToDoValues = {
    id: string
    title: string
    filter: FilterValuesType
}


function App() {
    const [todolists, setTodolists] = useState<Array<ToDoValues>>([
        {id: v1(), title: 'What to study', filter: 'All'},
        {id: v1(), title: 'What to buy', filter: 'completed'},
    ])
    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: "CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "React", isDone: false},
    ])

    function changeFilter(value: FilterValuesType, todolistId: string) {
        let todolist = todolists.find(tl => tl.id === todolistId)
        if (todolist) {
            todolist.filter = value;
        }
        setTodolists([...todolists])
    }

    function changeTaskStatus(taskId: string, isDone: boolean) {
        let task = tasks.find((t) => t.id === taskId)
        if (task) {
            task.isDone = isDone
        }
        setTasks([...tasks])
    }

    function addTask(title: string) {
        let newTask = {
            id: v1(),
            title: title,
            isDone: false
        }
        setTasks([newTask, ...tasks])
    }

    function removeTask(id: string) {
        setTasks(tasks.filter((t) => t.id !== id))
    }


    return (
        <div className='App'>
            {todolists.map(t => {
                let tasksForToDoList = tasks;
                if (t.filter === 'completed') {
                    tasksForToDoList = tasks.filter(t => t.isDone)
                }
                if (t.filter === 'active') {
                    tasksForToDoList = tasks.filter(t => !t.isDone)
                }
                return <ToDoList
                    id={t.id}
                    key={t.id}
                    title={t.title}
                    tasks={tasksForToDoList}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    changeTaskStatus={changeTaskStatus}
                    filter={t.filter}
                />
            })}
        </div>
    )
}

export default App;
