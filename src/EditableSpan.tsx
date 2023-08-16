import React, {ChangeEvent, useState} from "react";

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
        ? <input onBlur={activateViewMode} onChange={onChangeEditHandler} autoFocus={true} type="text" value={title}/>
        : <span onDoubleClick={activateEditMode}>{props.title}</span>
}