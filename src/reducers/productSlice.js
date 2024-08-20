import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiClient } from '../shared/apiClient';
import { openNotificationWithIcon } from '../shared/notification';

export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async (_, { rejectWithValue }) => {
        try {
            const response = await apiClient.get('/products');
            return response.data;
        } catch (error) {
            openNotificationWithIcon('error', "Something went wrong!")
            return rejectWithValue(error.response.data);
        }
    }
);

export const addProduct = createAsyncThunk(
    'products/addProduct',
    async (product, { rejectWithValue }) => {
        try {
            const response = await apiClient.post('/products', product);
            openNotificationWithIcon('success', `Product ${product.name} has been added.`)
            return response.data;
        } catch (error) {
            openNotificationWithIcon('error', "Something went wrong!")
            return rejectWithValue(error.response.data);
        }
    }
);

export const updateProduct = createAsyncThunk(
    'products/updateProduct',
    async ({ id, product }, { rejectWithValue }) => {
        try {
            const response = await apiClient.put(`/products/${id}`, product);
            openNotificationWithIcon('success', `Product ${product.name} has been updated.`)
            return response.data;
        } catch (error) {
            openNotificationWithIcon('error', "Something went wrong!")
            return rejectWithValue(error.response.data);
        }
    }
);

export const deleteProduct = createAsyncThunk(
    'products/deleteProduct',
    async (id, { rejectWithValue }) => {
        try {
            await apiClient.delete(`/products/${id}`);
            openNotificationWithIcon('success', `Product ${id} has been deleted.`)
            return id;
        } catch (error) {
            openNotificationWithIcon('error', "Something went wrong!")
            return rejectWithValue(error.response.data);
        }
    }
);

const productsSlice = createSlice({
    name: 'products',
    initialState: {
        products: [],
        status: 'idle',
        error: null,
        message: ''
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.products = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || 'Failed to fetch products';
            })
            .addCase(addProduct.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(addProduct.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.products.push(action.payload);
            })
            .addCase(addProduct.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || 'Failed to add product';
            })
            .addCase(updateProduct.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const index = state.products.findIndex(product => product.id === action.payload.id);
                if (index !== -1) {
                    state.products[index] = action.payload;
                }
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || 'Failed to update product';
            })
            .addCase(deleteProduct.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.products = state.products.filter(product => product.id !== action.payload);
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || 'Failed to delete product';
            });
    },
});

export default productsSlice.reducer;
