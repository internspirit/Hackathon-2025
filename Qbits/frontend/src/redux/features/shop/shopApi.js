import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import getBaseUrl from '../../../utils/baseURL';

const baseQuery = fetchBaseQuery({
    baseUrl: `${getBaseUrl()}`,
    credentials: 'include',
    prepareHeaders: (headers) => {
        headers.set("Content-Type", "application/json");
        return headers;
    }
});

const shopApi = createApi({
    reducerPath: 'shopApi',
    baseQuery,
    tagTypes: ['Products', 'Orders', 'Users'], // Added more tag types relevant to a shop
    endpoints: (builder) => ({
        // Products
        fetchAllProducts: builder.query({
            query: () => "/products", // Assuming your product endpoint is /products
            providesTags: ["Products"]
        }),
        fetchProductById: builder.query({
            query: (id) => `/products/${id}`,
            providesTags: (result, error, id) =>
                result ? [{ type: "Products", id }] : ["Products"],
        }),
        addProduct: builder.mutation({
            query: (newProduct) => ({
                url: "/products/create", // Assuming your create endpoint is /products/create
                method: "POST",
                body: newProduct
            }),
            invalidatesTags: ["Products"]
        }),
        updateProduct: builder.mutation({
            query: ({ id, ...rest }) => ({
                url: `/products/${id}`,
                method: "PUT",
                body: rest,
            }),
            invalidatesTags: ["Products"]
        }),
        deleteProduct: builder.mutation({
            query: (id) => ({
                url: `/products/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Products"]
        }),

        // Orders
        fetchOrders: builder.query({
            query: () => "/orders", // Assuming your orders endpoint is /orders
            providesTags: ["Orders"]
        }),
        fetchOrderById: builder.query({
            query: (id) => `/orders/${id}`,
            providesTags: (result, error, id) =>
                result ? [{ type: "Orders", id }] : ["Orders"],
        }),
        createOrder: builder.mutation({
            query: (newOrder) => ({
                url: "/orders/create", // Assuming your create endpoint is /orders/create
                method: "POST",
                body: newOrder
            }),
            invalidatesTags: ["Orders"]
        }),
        updateOrder: builder.mutation({
            query: ({ id, ...rest }) => ({
                url: `/orders/${id}`,
                method: "PUT",
                body: rest,
            }),
            invalidatesTags: ["Orders"]
        }),

        // Users
        fetchUsers: builder.query({
            query: () => "/users", // Assuming your users endpoint is /users
            providesTags: ["Users"]
        }),
        fetchUserById: builder.query({
            query: (id) => `/users/${id}`,
            providesTags: (result, error, id) =>
                result ? [{ type: "Users", id }] : ["Users"],
        }),
        createUser: builder.mutation({
            query: (newUser) => ({
                url: "/users/create", // Assuming your create endpoint is /users/create
                method: "POST",
                body: newUser
            }),
            invalidatesTags: ["Users"]
        }),
        updateUser: builder.mutation({
            query: ({ id, ...rest }) => ({
                url: `/users/${id}`,
                method: "PUT",
                body: rest,
            }),
            invalidatesTags: ["Users"]
        }),
        deleteUser: builder.mutation({
            query: (id) => ({
                url: `/users/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Users"]
        }),
    })
});

export const {
    useFetchAllProductsQuery,
    useFetchProductByIdQuery,
    useAddProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation,
    useFetchOrdersQuery,
    useFetchOrderByIdQuery,
    useCreateOrderMutation,
    useUpdateOrderMutation,
    useFetchUsersQuery,
    useFetchUserByIdQuery,
    useCreateUserMutation,
    useUpdateUserMutation,
    useDeleteUserMutation,
} = shopApi;

export default shopApi;