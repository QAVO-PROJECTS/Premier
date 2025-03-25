import React from 'react';
import NewBlog from "./New Blog/NewBlog.jsx";
import OldBlog from "./Old Blog/OldBlog.jsx";
import Cards from "./Cards/Cards.jsx";
import ScrollToTop from "../../../components/ScrollToTop/index.jsx";

function Blogs() {
    return (
        <>
            <ScrollToTop/>

            <NewBlog/>
            <OldBlog/>
            <Cards/>
        </>
    );
}

export default Blogs;