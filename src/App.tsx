import React, {useState} from 'react';
import './App.css';
import {ToDoList} from "./Todolist";
import {v1} from "uuid";

export type FilterValuesType = 'All' | 'completed' | 'active'
type ToDoValues = {
    id: string
    title: string
    filter: FilterValuesType
}


function App() {

    let todolist1 =v1();
    let todolist2 =v1();
    const [toDoLists, setToDoLists] = useState<Array<ToDoValues>>([
        {id: todolist1, title: 'What to study', filter: 'active'},
        {id: todolist2, title: 'What to buy', filter: 'completed'},
    ])

    const [tasksObj, setTasks] = useState({
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

    return (
        <div className='App'>
            {toDoLists.map((tl) => {
                let tasksForTodoList = tasksObj[tl.id];
                console.log(tasksObj[tl.id])
                if (tl.filter === 'active') {
                    tasksForTodoList = tasksForTodoList.filter(t => !t.isDone)
                }
                if (tl.filter === 'completed') {
                    tasksForTodoList = tasksForTodoList.filter(t => t.isDone)
                }
                return <ToDoList
                    key={tl.id}
                    id={tl.id}
                    title={tl.title}
                    tasks={tasksForTodoList}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    changeTaskStatus={changeStatus}
                    filter={tl.filter}
                />
            })}
        </div>
    )
}

export default App;
