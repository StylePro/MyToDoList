import Todolist, {TaskType} from "./Todolist";
import {useState} from "react";
import {v1} from "uuid";

export type FilterValuesType = 'all' | 'completed' | 'active'
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

function App() {

    let todolistId1 = v1();
    let todolistId2 = v1();

    const [todolists, setToDoLists] = useState<Array<TodolistType>>([
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
    ])

    const [tasksObj, setTasks] = useState({
        [todolistId1]: [
            {id: v1(), title: 'CSS', isDone: true},
            {id: v1(), title: 'HTML', isDone: false},
            {id: v1(), title: 'React', isDone: true},
            {id: v1(), title: 'Angular', isDone: false},
            {id: v1(), title: 'JS', isDone: true},
        ],
        [todolistId2]: [
            {id: v1(), title: 'Book', isDone: true},
            {id: v1(), title: 'List', isDone: false},
            {id: v1(), title: 'Pen', isDone: true},
        ]
    });

    function removeToDoList (todolistId: string) {
        let filteredToDoList = todolists.filter(tl=> tl.id !== todolistId)
        if (filteredToDoList) {
            setToDoLists(filteredToDoList)
            delete tasksObj[todolistId]
            setTasks({...tasksObj})
        }
    }

    function addTask(title: string, todolistId: string) {
        let task = {id: v1(), title: title, isDone: false}
        let tasks = tasksObj[todolistId]
        let newTasks = [task, ...tasks]
        tasksObj[todolistId] = newTasks
        setTasks({...tasksObj})
    }

    function removeTask(id: string, todolistId: string) {
        let tasks = tasksObj[todolistId]
        let filteredTasks = tasks.filter(t => t.id !== id)
        tasksObj[todolistId] = filteredTasks;
        setTasks({...tasksObj})
    }

    function changeFilter(value: FilterValuesType, todolistId: string) {
        let todolist = todolists.find(tl => tl.id === todolistId)
        if (todolist) {
            todolist.filter = value
            setToDoLists([...todolists])
        }
    }

    function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
        let tasks = tasksObj[todolistId]
        let task = tasks.find(t => t.id === taskId)
        if (task) {
            task.isDone = isDone
            setTasks({...tasksObj})
        }
    }


    return (
        <div className='App'>
            {todolists.map(tl => {
                let tasksForToDoList = tasksObj[tl.id];
                if (tl.filter === 'completed') {
                    tasksForToDoList = tasksForToDoList.filter(t => t.isDone)
                }
                if (tl.filter === 'active') {
                    tasksForToDoList = tasksForToDoList.filter(t => !t.isDone)
                }

                return <Todolist
                    key={tl.id}
                    id={tl.id}
                    title={tl.title}
                    tasks={tasksForToDoList}
                    addTask={addTask}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    changeStatus={changeStatus}
                    filter={tl.filter}
                    removeToDoList={removeToDoList}
                />
            })}

        </div>
    )
}


export default App