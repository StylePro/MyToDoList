import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type addItemFormPropsType = {
    addItem: (title: string) => void
}

export function AddItemForm(props: addItemFormPropsType) {
    const [newTaskText, setNewTaskText] = useState('');
    const [error, setError] = useState('')

    function onChangeHandler(e: ChangeEvent<HTMLInputElement>) {
        setNewTaskText(e.currentTarget.value)
    }

    function addTask() {
        if (newTaskText.trim() !== '') {
            props.addItem(newTaskText.trim())
            setNewTaskText('')
        } else {
            setError('Title is required')
        }

    }

    function onKeyPressHandler(e: KeyboardEvent<HTMLInputElement>) {
        setError('')
        if (e.charCode === 13) {
            addTask()
        }
    }

    return <div>
        <input
            value={newTaskText}
            onChange={onChangeHandler}
            onKeyPress={onKeyPressHandler}
            className={error ? 'error' : ''}
        />
        <button
            onClick={addTask}
        >+
        </button>
        {error ? <div className='error-message'>{error}</div> : ''}
    </div>
}

export default AddItemForm;