import {configureStore} from "@reduxjs/toolkit";
import tourSlice from "../features/TourSlice.js";

const store = configureStore(
    {
        reducer:{
            tours: tourSlice
        }
    }
);

export default store;