import Todolist, {TaskType} from "./Todolist";
import {useState} from "react";
import { v1 } from "uuid";

export type FilterValuesType = 'all' | 'completed' | 'active'

function App() {

    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: 'CSS', isDone: true},
        {id: v1(), title: 'HTML', isDone: false},
        {id: v1(), title: 'React', isDone: true},
        {id: v1(), title: 'Angular', isDone: false},
        {id: v1(), title: 'JS', isDone: true},
    ])

    const [filter, setFilter] = useState<FilterValuesType>('all')

    function addTask (title: string) {
        setTasks([{id: v1(), title: title, isDone: false},...tasks])
    }
    function removeTask(id: string) {
        setTasks(tasks.filter(t => t.id !== id))
    }

    function changeFilter(value: FilterValuesType) {
        setFilter(value)
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
            <Todolist
                title='What to learn'
                tasks={tasksForToDoList}
                addTask={addTask}
                removeTask={removeTask}
                changeFilter={changeFilter}
            />
        </div>
    )
}


export default App