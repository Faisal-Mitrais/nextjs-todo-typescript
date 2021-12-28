import React, { Key } from 'react';
import { Table, Space, Tag, Button } from 'antd';
import { removeTodo, Todo, TodoState, updateTodo } from '../../store/todo/todoSlice';
import moment from 'moment';
import { dateFormat } from '../../utils/constant';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { yellow } from '@ant-design/colors';

interface Props {
    data: TodoState,
    form: any
}

const TodoList = ({ data, form }: Props) => {
    const dispatch = useDispatch()

    const columns = [
        {
            title: 'Description',
            dataIndex: 'description',
        },
        {
            title: 'Deadline',
            dataIndex: 'deadline',
            render: (data: string) => moment(data).format(dateFormat),
            sorter: (a: any, b: any) => moment(a.deadline).unix() - moment(b.deadline).unix(),
        },
        {
            title: 'Status',
            dataIndex: 'done',
            render: (data: boolean) => data ? <Tag color="green">Finished</Tag> : <Tag color="red">Unfinished</Tag>,
        },
        {
            title: 'Action',
            key: 'action',
            render: (data: any) => (
                <Space size="middle">
                    <Button style={{ background: yellow.primary, borderColor: yellow.primary }} type="primary" icon={<EditOutlined />} shape="round" size="small" title="Edit"
                        onClick={() => form.setFieldsValue({ ...data, deadline: moment(data.deadline) })}
                    />
                    <Button danger type="primary" icon={<DeleteOutlined />} shape="round" size="small" title="Remove"
                        onClick={() => dispatch(removeTodo(data.id))}
                    />
                </Space>
            ),
        },
    ];

    const rowSelection = {
        onSelect: (record: Todo) => {
            dispatch(updateTodo({ ...record, done: !record.done }))
        },
        selectedRowKeys: data.todos.filter(todo => todo.done).map(todo => todo.id) as Key[]
    };

    return (
        <div>
            <Table
                loading={data.isLoading}
                rowSelection={{
                    type: 'checkbox',
                    hideSelectAll: true,
                    ...rowSelection,
                }}
                pagination={{ pageSize: 5 }}
                columns={columns}
                dataSource={data.todos.map((todo) => ({ ...todo, key: todo.id }))}
            />
        </div>
    );
};

export default TodoList