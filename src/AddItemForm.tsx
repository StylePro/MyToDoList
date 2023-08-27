import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@mui/material";
import {ControlPoint} from "@mui/icons-material";

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
        <TextField
            variant='outlined'
            label = 'Type value'
            error={!!error}
            value={newTaskText}
            onChange={onChangeHandler}
            onKeyPress={onKeyPressHandler}
            helperText={error}
        />
        <IconButton
            onClick={addTask}
            color='primary'
        > <ControlPoint/>
        </IconButton>
    </div>
}

export default AddItemForm;