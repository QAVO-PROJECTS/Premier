import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
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
        postAdminLogin: builder.mutation({
            query: (admin) => ({
                url: `/Admin/login`,
                method: 'POST',
                body: admin,
                headers: {'Content-Type': 'application/json'}
            }),
        }),
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
        getAllPopularCountries: builder.query({
            query: () => ({
                url: `/Country/get-popular-countries`,
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
        getAllTours: builder.query({
            query: () => ({
                url: `/Tour/get-all-tours`,
            }),
        }),
        getTourById: builder.query({
            query: (id) => ({
                url: `/Tour/get-tour-by-id/${id}`,
            }),
        }),
        postTour: builder.mutation({
            query: (data) => ({
                url: `/Tour/create-tour`,
                method: 'POST',
                body: data,
            }),
        }),
        putTour: builder.mutation({
            query: (customerData) => ({
                url: `/Tour/update-tour`,
                method: 'PUT',
                body: customerData,
            }),
        }),
        deleteTour: builder.mutation({
            query: (id) => ({
                url: `/Tour/delete-tour/${id}`,
                method: 'DELETE',
            }),
        }),
        postReserve: builder.mutation({
            query: (tour) => ({
                url: `/Tour/save-user-tour-info`,
                method: 'POST',
                body: tour,
                headers: {'Content-Type': 'application/json'}
            }),
        }),
        getAllReserved: builder.query({
            query: () => ({
                url: `/Tour/get-admin-user-tour-infos`,
            }),
        }),
        deleteReserved: builder.mutation({
            query: ({requestId}) => ({
                url: `/Tour/remove-user-tours?requestId=${requestId}`,
                method: 'DELETE',
            }),
        }),
        postContact: builder.mutation({
            query: (contact) => ({
                url: `/Contact/create-user`,
                method: 'POST',
                body: contact,
                headers: {'Content-Type': 'application/json'}
            }),
        }),
        getAllContact: builder.query({
            query: () => ({
                url: `/Contact/get-all-users`,
            }),
        }),
        getFilterTours: builder.query({
            query: ({countryIds = [], cityIds = [], startDate, endDate} = {}) => {
                const params = new URLSearchParams();
                countryIds.forEach((id) => {
                    params.append('countryIds', id);
                });
                cityIds.forEach((id) => {
                    params.append('cityIds', id);
                });
                if (startDate) {
                    params.append('startDate', startDate);
                }
                if (endDate) {
                    params.append('endDate', endDate);
                }
                return {
                    url: `/Tour/filter-tours?${params.toString()}`,
                    method: 'GET',
                };
            },
        }),
        getSearchTours: builder.query({
            query: (query) => {
                return {
                    url: `/Tour/search?query=${query}`,
                    method: 'GET',
                };
            },
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
    useGetAllPopularCountriesQuery,
    usePostCountryMutation,
    usePutCountryMutation,
    useDeleteCountryMutation,

    useGetAllCustomerViewsQuery,
    usePostCustomerViewMutation,
    usePutCustomerViewMutation,
    useDeleteCustomerViewMutation,

    useGetAllToursQuery,
    useGetTourByIdQuery,
    usePostTourMutation,
    usePutTourMutation,
    useDeleteTourMutation,
    usePostReserveMutation,
    useGetAllReservedQuery,
    useDeleteReservedMutation,

    usePostAdminLoginMutation,

    usePostContactMutation,
    useGetAllContactQuery,

    useGetFilterToursQuery,
    useGetSearchToursQuery,
} = adminApi