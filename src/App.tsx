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
        tasksForToDoList = tasks.filter(t => t.isDone === true)
    }
    if (filter === 'active') {
        tasksForToDoList = tasks.filter(t => t.isDone === false)
    }

  return (
      <div className='App'>
        <ToDoList
            title="What to learn"
            tasks={tasksForToDoList}
            removeTask = {removeTask}
            changeFilter = {changeFilter}
            addTask = {addTask}
        />
      </div>
  )
}

export default App;
