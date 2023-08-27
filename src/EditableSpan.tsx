import React, {ChangeEvent, useState} from "react";
import TextField from '@mui/material/TextField';

type EditablePropsSpanType = {
    title: string
    onChange: (newValue: string)=> void
}

export function EditableSpan(props: EditablePropsSpanType) {
    let [editMode, setEditMode] = useState(false)
    let [title, setTitle] = useState('')
    let onChangeEditHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
    function activateEditMode () {
        setEditMode(true)
        setTitle(props.title)
    }
    function activateViewMode () {
        setEditMode(false)
        props.onChange(title)
    }
    return editMode
        ? <TextField type="text" value={title} label="EditMode" focused onBlur={activateViewMode} onChange={onChangeEditHandler} autoFocus={true}/>
        : <span onDoubleClick={activateEditMode}>{props.title}</span>
}