import { Form, Input, Modal } from 'antd'
import React from 'react'

function AddProduct({ visible, onCancel, onSubmit }) {
    const [form] = Form.useForm();

    return (
        <Modal
            open={visible}
            title="Add Product"
            onCancel={onCancel}
            okText="Add Product"
            onOk={() => {
                form.validateFields().then((values) => {
                    onSubmit(values)
                    form.resetFields();
                }).catch((errorInfo) => {
                    console.error('Validation Failed:', errorInfo);
                });
            }}
        >
            <Form form={form} layout="vertical">
                <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please enter the product name' }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="price" label="Price" rules={[{ required: true, message: 'Please enter the product price' }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="description" label="Description">
                    <Input.TextArea />
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default AddProduct
