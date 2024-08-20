import { Button, Flex, Popconfirm, Space, Table, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import AddProduct from '../components/AddProduct';
import EditProduct from '../components/EditProduct';
import { openNotificationWithIcon } from '../shared/notification';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, deleteProduct, fetchProducts, updateProduct } from '../reducers/productSlice';

function Product() {
    const dispatch = useDispatch()
    const products = useSelector(state => state.products)
    const [addProductVisible, setAddProductVisible] = useState(false)
    const [editProductVisible, setEditProductVisible] = useState(false)
    const [editProductData, setEditProductData] = useState({})


    useEffect(() => {
        dispatch(fetchProducts())
    }, [])

    const handleAddProduct = (values) => {
        dispatch(addProduct(values))
        setAddProductVisible(false)
    }

    const handleEditProduct = (id, values) => {
        dispatch(updateProduct({ id, product: values }))
        setEditProductVisible(false)
        setEditProductData({})
    }

    const handleDelete = (id) => {
        dispatch(deleteProduct(id))
    }
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space>
                    <Button onClick={() => {
                        setEditProductVisible(true)
                        setEditProductData(record)
                    }}>Edit</Button>
                    <Popconfirm
                        title="Delete the task"
                        description="Are you sure to delete this task?"
                        okText="Yes"
                        cancelText="No"
                        onConfirm={() => handleDelete(record.id, record.name)}
                    >
                        <Button type='primary' danger>Delete</Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <>
            <Table
                title={() => (
                    <Flex align='center' justify='space-between' >
                        <Typography.Title level={3} style={{ margin: 0 }}>Products</Typography.Title>
                        <Button type='primary' onClick={() => setAddProductVisible(true)}>Add Products</Button>
                    </Flex>
                )}
                columns={columns}
                dataSource={products.products}
                loading={products.status === 'loading'}
                scroll={{ y: 500 }}
                rowKey={'id'}

            />

            <AddProduct
                visible={addProductVisible}
                onCancel={() => setAddProductVisible(false)}
                onSubmit={handleAddProduct}
            />

            <EditProduct
                visible={editProductVisible}
                data={editProductData}
                onCancel={() => setEditProductVisible(false)}
                onSubmit={handleEditProduct}
            />
        </>
    )
}

export default Product
