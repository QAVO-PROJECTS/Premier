import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import Cookies from "js-cookie"
export const adminApi = createApi({
        reducerPath: 'adminApi',
        baseQuery: fetchBaseQuery({
            baseUrl: 'https://premiert-001-site1.ptempurl.com/api/',
            prepareHeaders: (headers) => {
                const token = Cookies.get('premierTourToken');
                if (token) {
                    headers.set('Authorization', `Bearer ${token}`);
                }
                return headers;
            },
        }),
        endpoints: (builder) => ({
            getAllBlogs: builder.query({
                query: () => ({
                    url: `/Blog/get-all-blogs`,
                }),
            }),
            getBlogById: builder.query({
                query: (id) => ({
                    url: `/Blog/get-blog-by-id/${id}`,
                }),
            }),
            putBlog: builder.mutation({
                query: (blogData) => ({
                    url: `/Blog/update-blog`,
                    method: 'PUT',
                    body: blogData,
                }),
            }),
            postBlog: builder.mutation({
                query: (data) => ({
                    url: `/Blog/create-blog`,
                    method: 'POST',
                    body: data,
                }),
            }),
            deleteBlog: builder.mutation({
                query: (id) => ({
                    url: `/Blog/delete-blog/${id}`,
                    method: 'DELETE',
                }),
            }),
            getAllCities: builder.query({
                query: () => ({
                    url: `/City/get-all-cities`,
                }),
            }),
            postCity: builder.mutation({
                query: (city) => ({
                    url: `/City/create-city`,
                    method: 'POST',
                    body: city,
                    headers: {'Content-Type': 'application/json'}
                }),
            }),
            putCity: builder.mutation({
                query: (city) => ({
                    url: `/City/update-city`,
                    method: 'PUT',
                    body: city,
                    headers: {'Content-Type': 'application/json'}
                }),
            }),
            deleteCity: builder.mutation({
                query: (id) => ({
                    url: `/City/delete-city/${id}`,
                    method: 'DELETE',
                }),
            }),
            getAllCountries: builder.query({
                query: () => ({
                    url: `/Country/get-all-countries`,
                }),
            }),
            postCountry: builder.mutation({
                query: (data) => ({
                    url: `/Country/create-country`,
                    method: 'POST',
                    body: data,
                }),
            }),
            putCountry: builder.mutation({
                query: (countryData) => ({
                    url: `/Country/update-country`,
                    method: 'PUT',
                    body: countryData,
                }),
            }),
            deleteCountry: builder.mutation({
                query: (id) => ({
                    url: `/Country/delete-country/${id}`,
                    method: 'DELETE',
                }),
            }),
            getAllCustomerViews: builder.query({
                query: () => ({
                    url: `/CustomerView/get-all-customer-views`,
                }),
            }),
            postCustomerView: builder.mutation({
                query: (data) => ({
                    url: `/CustomerView/create-customer-view`,
                    method: 'POST',
                    body: data,
                }),
            }),
            putCustomerView: builder.mutation({
                query: (customerData) => ({
                    url: `/CustomerView/update-customer-view`,
                    method: 'PUT',
                    body: customerData,
                }),
            }),
            deleteCustomerView: builder.mutation({
                query: (id) => ({
                    url: `/CustomerView/delete-customer-view/${id}`,
                    method: 'DELETE',
                }),
            }),
        }),
    })

export const {
    useGetAllBlogsQuery,
    usePostBlogMutation,
    useGetBlogByIdQuery,
    usePutBlogMutation,
    useDeleteBlogMutation,
    useGetAllCitiesQuery,
    usePostCityMutation,
    usePutCityMutation,
    useDeleteCityMutation,
    useGetAllCountriesQuery,
    usePostCountryMutation,
    usePutCountryMutation,
    useDeleteCountryMutation,
    useGetAllCustomerViewsQuery,
    usePostCustomerViewMutation,
    usePutCustomerViewMutation,
    useDeleteCustomerViewMutation,
} = adminApi