import React from 'react';
import './cards.scss'
import BlogCard from "../../../components/BlogCardDif/BlogCard.jsx";
import Pagination from "../../../components/Pagination/Pagination.jsx";
function Cards() {
    const arr = new Array(6).fill(0)

    return (
        <div style={{paddingBottom:"120px"}}>
            <div className={"container"}>
                <div className={"row gy-5"} style={{marginBottom:"60px"}} >
                    {arr && arr.map((item, index) => <BlogCard key={index} index={index}/>)}
                </div>
                <Pagination/>

            </div>
        </div>
    );
}

export default Cards;