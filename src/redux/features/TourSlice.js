import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
const  initialState={
    tours :[]
}
const baseURl = "https://premiert-001-site1.ptempurl.com/api"
export  const  getProduct = createAsyncThunk(
    "GET_PRODUCT",
    async () =>{
        const {data} = await axios.get(`${baseURl}/Blog/get-all-blogs`);
        return data?.data;
    }
)
const tourSlice = createSlice({
    name: "tour",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getProduct.fulfilled,(state,action)=>{
            state.tours = action.payload;
        });

    }
})

export const {extraReducers} = tourSlice.actions
export default tourSlice.reducer