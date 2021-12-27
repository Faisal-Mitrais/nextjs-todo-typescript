import { Form, Input, Button, Space, DatePicker } from 'antd';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux'
import { fetchTodos, addNewTodo } from '../../store/todo/todoSlice'
import { RootState } from '../../store'
import { useEffect } from 'react';

const dateFormat = 'DD/MM/YYYY';

const ToDoForm = () => {
    const [form] = Form.useForm();
    const todos = useSelector((state: RootState) => state.todos)
    const dispatch = useDispatch()

    const onFinish = (values: any) => {
        values = { ...values, done: false }
        dispatch(addNewTodo(values))
        form.resetFields()
    };

    const onReset = () => {
        form.resetFields()
    }

    useEffect(() => {
        dispatch(fetchTodos())
    }, [dispatch])

    return (
        <Form form={form} layout={'inline'} name="control-hooks" initialValues={{ description: '', deadline: '' }} onFinish={onFinish} >
            <Form.Item name="description" label="Description" rules={[{ required: true }]} style={{ flex: "1", marginTop: "5px" }}>
                <Input onChange={(e: any) => form.setFieldsValue({ description: e.target.value })} placeholder='New task' />
            </Form.Item>
            <Form.Item name="deadline" label="Deadline" rules={[{ required: true }]} style={{ flex: "1", marginTop: "5px" }}>
                <DatePicker onChange={(e: any) => form.setFieldsValue({ deadline: e })} format={dateFormat} style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item style={{ flex: "0 1", marginTop: "5px", display: 'inline-block' }}>
                <Space>
                    <Button type="primary" htmlType="submit" shape='round'>
                        Submit
                    </Button>
                    <Button htmlType="button" shape='round' onClick={onReset}>
                        Reset
                    </Button>
                </Space>
            </Form.Item>
        </Form >
    );
};

export default ToDoForm