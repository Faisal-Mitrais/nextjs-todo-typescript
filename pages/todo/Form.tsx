import { Form, Input, Button, Space, DatePicker } from 'antd';
import { useDispatch } from 'react-redux'
import { fetchTodos, addNewTodo, updateTodo } from '../../store/todo/todoSlice'
import { useEffect } from 'react';
import { dateFormat } from '../../utils/constant';
import moment from 'moment';

const ToDoForm = ({ form }: { form: any }) => {
    const dispatch = useDispatch()

    const onFinish = (values: any) => {
        const { id, ...newValues } = values;
        id === null ? dispatch(addNewTodo(newValues)) : dispatch(updateTodo(values))
        form.resetFields()
    };

    const onReset = () => {
        form.resetFields()
    }

    useEffect(() => {
        dispatch(fetchTodos())
    }, [dispatch])

    return (
        <Form form={form} layout={'inline'} name="control-hooks" initialValues={{ id: null, description: '', deadline: '', done: false }} onFinish={onFinish} >
            <Form.Item name="id" hidden>
                <Input />
            </Form.Item>
            <Form.Item name="description" label="Description" rules={[{ required: true, max: 100 }]} style={{ flex: "1", marginTop: "5px" }}>
                <Input onChange={(e: any) => form.setFieldsValue({ description: e.target.value })} placeholder='New task' />
            </Form.Item>
            <Form.Item name="deadline" label="Deadline" style={{ flex: "1", marginTop: "5px" }}
                rules={
                    [
                        { required: true },
                        () => ({
                            validator(_, value) {
                                if (moment(value).isSameOrAfter(moment(), 'day')) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('Deadline cannot be in the past'));
                            },
                        })
                    ]
                }
            >
                <DatePicker onChange={(e: any) => form.setFieldsValue({ deadline: e })} format={dateFormat} style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item name="done" hidden>
                <Input />
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