import React, {useState} from 'react';
import './App.css';
import {TaskType, ToDoList} from "./Todolist";

export type FilterValuesType = 'All' | 'completed' | 'active'

function App() {
    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: 1, title: "CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "React", isDone: false},
    ])
    const [filter, setFilter] = useState<FilterValuesType>('All')
    function changeFilter (value: FilterValuesType) {
            setFilter(value)
    }

    function removeTask (id: number) {
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
        />
      </div>
  )
}

export default App;
