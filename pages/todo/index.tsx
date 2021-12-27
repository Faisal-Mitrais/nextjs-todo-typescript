import { Col, Row } from 'antd'
import React from 'react'
import ToDoForm from './Form'

function ToDoPage() {
    return (
        <>
            <h1>Todo List</h1>
            <Row justify="center">
                <Col span={24}>
                    <ToDoForm />
                </Col>
            </Row>
        </>
    )
}

export default ToDoPage
