import { Form, Input, Modal } from 'antd'
import React, { useEffect } from 'react'

function EditProduct({ visible, onCancel, data, onSubmit }) {
    const [form] = Form.useForm();

    useEffect(() => {
        form.setFieldsValue(data)
    }, [visible, data])
    return (
        <Modal
            open={visible}
            title="Edit Product"
            onCancel={onCancel}
            okText="Edit Product"
            onOk={() => {
                form.validateFields()
                    .then((values) => onSubmit(data.id, values))
                    .catch((errorInfo) => {
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

export default EditProduct
