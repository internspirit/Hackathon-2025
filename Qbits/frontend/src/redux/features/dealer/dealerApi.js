import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import getBaseUrl from '../../../utils/baseURL';

const baseQuery = fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/dealer`,
    credentials: 'include',
    prepareHeaders: (headers) => {
        headers.set("Content-Type", "application/json");
        return headers;
    }
});

const dealerApi = createApi({
    reducerPath: 'authApi',
    baseQuery,
    tagTypes: ['User'],
    endpoints: (builder) => ({
        registerDealer: builder.mutation({
            query: (userData) => ({
                url: "/register",
                method: "POST",
                body: userData
            }),
            invalidatesTags: ["User"]
        }),
        loginDealer: builder.mutation({
            query: (credentials) => ({
                url: "/login",
                method: "POST",
                body: credentials
            }),
            invalidatesTags: ["User"]
        }),
        getCurrentDealer: builder.query({
            query: () => "/",
            providesTags: ["User"]
        }),
        logoutDealer: builder.mutation({
            query: () => ({
                url: "/logout",
                method: "POST"
            }),
            invalidatesTags: ["User"]
        })
    })
});

export const {
    useRegisterDealerMutation,
    useLoginDealerMutation,
    useGetCurrentDealerQuery,
    useLogoutDealerMutation
} = dealerApi;

export default dealerApi;
