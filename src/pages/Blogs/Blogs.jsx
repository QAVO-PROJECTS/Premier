import React from 'react';
import NewBlog from "./New Blog/NewBlog.jsx";
import OldBlog from "./Old Blog/OldBlog.jsx";
import Cards from "./Cards/Cards.jsx";

function Blogs() {
    return (
        <>
            <NewBlog/>
            <OldBlog/>
            <Cards/>
        </>
    );
}

export default Blogs;