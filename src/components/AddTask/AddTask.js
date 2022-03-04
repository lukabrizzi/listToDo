import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { isEmpty } from 'lodash'
import firebase from '../../utils/firebase'
import 'firebase/compat/firestore';
import { ReactComponent as Send } from "../../assets/send.svg"

import "./AddTask.scss"

const db = firebase.firestore(firebase)

export default function AddTask(props) {
    const { setReloadTask } = props
    const [ task, setTask ] = useState('')

const addTask = (e) => {
    e.preventDefault()
    if (!isEmpty(task)) {
        db.collection('tasks').add({name: task, completed: false}).then(() => {
            setTask('')
            setReloadTask(true)
        })
    }
}

    return (
        <Form onSubmit={addTask} className="add-task">
            <input
                type="text"
                placeholder="Crear tarea..."
                onChange={(e) => setTask(e.target.value)}
                value={task}
            />
            <Button type="submit">
                <Send />
            </Button>
            </Form>
    )
}