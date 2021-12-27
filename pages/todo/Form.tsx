import { Form, Input, Button, Space, DatePicker } from 'antd';
import moment from 'moment';

const dateFormat = 'DD/MM/YYYY';
const defaultFormat = 'YYYY-MM-DD';

const ToDoForm = () => {
    const [form] = Form.useForm();

    const onFinish = (values: any) => {
        values = { ...values, date: values.date.format(defaultFormat) }
        console.log(values);
    };

    const onReset = () => {
        form.resetFields()
    }

    return (
        <Form form={form} layout={'inline'} name="control-hooks" initialValues={{ description: '', date: moment(new Date()) }} onFinish={onFinish} >
            <Form.Item name="description" label="Description" rules={[{ required: true }]} style={{ width: '40%' }}>
                <Input onChange={(e: any) => form.setFieldsValue({ description: e.target.value })} />
            </Form.Item>
            <Form.Item name="date" label="Deadline" rules={[{ required: true }]} style={{ width: '40%' }}>
                <DatePicker onChange={(e: any) => form.setFieldsValue({ date: e })} format={dateFormat} style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item style={{ width: '15%', display: 'inline-block' }}>
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