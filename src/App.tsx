import React, {useState} from 'react';
import './App.css';
import {TaskType, ToDoList} from "./Todolist";
import {v1} from "uuid";

export type FilterValuesType = 'All' | 'completed' | 'active'

function App() {
    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: "CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "React", isDone: false},
    ])
    const [filter, setFilter] = useState<FilterValuesType>('All')
    function changeFilter (value: FilterValuesType) {
            setFilter(value)
    }
    function changeTaskStatus (taskId: string, isDone: boolean) {
        let task = tasks.find( (t)=> t.id === taskId)
        if (task) {
            task.isDone = isDone
        }
        setTasks([...tasks])
    }

    function addTask (title: string){
        let newTask = {
            id: v1(),
            title: title,
            isDone: false
        }
        setTasks([newTask,...tasks])
    }
    function removeTask (id: string) {
        setTasks (tasks.filter((t)=> t.id !== id ))
    }

    let tasksForToDoList = tasks;
    if (filter === 'completed') {
        tasksForToDoList = tasks.filter(t => t.isDone)
    }
    if (filter === 'active') {
        tasksForToDoList = tasks.filter(t => !t.isDone)
    }

  return (
      <div className='App'>
        <ToDoList
            title="What to learn"
            tasks={tasksForToDoList}
            removeTask = {removeTask}
            changeFilter = {changeFilter}
            addTask = {addTask}
            changeTaskStatus = {changeTaskStatus}
            filter = {filter}
        />
      </div>
  )
}

export default App;
