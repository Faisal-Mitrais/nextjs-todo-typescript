import Head from 'next/head'
import React from 'react'
import ToDoForm from './Form'
import TodoList from './List'
import { RootState } from '../../store'
import { useSelector } from 'react-redux'
import { Form } from 'antd';

function ToDoPage() {
    const todos = useSelector((state: RootState) => state.todos)
    const [form] = Form.useForm();

    return (
        <>
            <Head>
                <title>Todo List - DoToDo</title>
            </Head>
            <main>
                <div style={{ margin: "10px 0 30px" }}>
                    <h1>Create a new task</h1>
                    <ToDoForm form={form} />
                </div>
                <div>
                    <h1>My tasks</h1>
                    <TodoList data={todos} form={form} />
                </div>
            </main>
        </>
    )
}

export default ToDoPage
