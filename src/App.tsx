import Todolist, {TaskType} from "./Todolist";
import {useState} from "react";

export type FilterValuesType = 'all' | 'completed' | 'active'

function App () {

    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: 1, title: 'CSS', isDone: true},
        {id: 2, title: 'HTML', isDone: false},
        {id: 3, title: 'React', isDone: true},
        {id: 4, title: 'Angular', isDone: false},
        {id: 5, title: 'JS', isDone: true},
    ])
    const [filter, setFilter] = useState<FilterValuesType>('completed')

    function removeTask (id: number) {
        setTasks(tasks.filter(t => t.id !== id))
    }

    function changeFilter (value: FilterValuesType) {
        setFilter(value)
    }

    let tasksForToDoList = tasks;
    if(filter === 'completed') {
        tasksForToDoList = tasks.filter(t => t.isDone)
    }
    if (filter === 'active') {
        tasksForToDoList = tasks.filter(t => !t.isDone)
    }

    return (
        <div className='App'>
            <Todolist
                title ='What to learn'
                tasks={tasksForToDoList}
                removeTask={removeTask}
                changeFilter={changeFilter}
            />
        </div>
    )
}



export default App