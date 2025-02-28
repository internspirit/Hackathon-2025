import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import getBaseUrl from '../../../utils/baseURL'

const baseQuery = fetchBaseQuery({
    baseUrl: `${getBaseUrl()}`,
    credentials: 'include',
    prepareHeaders: (headers) => {
        headers.set("Content-Type", "application/json");
        return headers;
    }
});

const itemsApi = createApi({
    reducerPath: 'itemsApi',
    baseQuery,
    tagTypes: ['Items'],
    endpoints: (builder) => ({
        fetchAllItems: builder.query({
            query: () => "/",
            providesTags: ["Items"]
        }),
        fetchItemById: builder.query({
            query: (id) => `/${id}`,
            providesTags: (result, error, id) =>
                result ? [{ type: "Items", id }] : ["Items"],
        }),
        addItem: builder.mutation({
            query: (newBook) => ({
                url: "/create",
                method: "POST",
                body: newBook
            }),
            invalidatesTags: ["Items"]
        }),
        updateItem: builder.mutation({
            query: ({ id, ...rest }) => ({
                url: `/${id}`,
                method: "PUT",
                body: rest,
            }),
            invalidatesTags: ["Items"]
        }),
        deleteItem: builder.mutation({
            query: (id) => ({
                url: `/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Items"]
        })
    })
});

export const {
    useFetchAllItemsQuery,
    useFetchItemByIdQuery,
    useAddItemMutation,
    useUpdateItemMutation,
    useDeleteItemMutation
} = itemsApi;

export default itemsApi;
