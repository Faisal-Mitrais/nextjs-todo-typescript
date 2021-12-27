import { Col, Row } from 'antd'
import Head from 'next/head'
import React from 'react'
import ToDoForm from './Form'

function ToDoPage() {
    return (
        <>
            <Head>
                <title>Todo List - DoToDo</title>
            </Head>
            <main>
                <div>
                    <h1>Create a new task</h1>
                    <Row justify="center">
                        <Col span={24}>
                            <ToDoForm />
                        </Col>
                    </Row>
                </div>
                <div>
                </div>
            </main>
        </>
    )
}

export default ToDoPage
