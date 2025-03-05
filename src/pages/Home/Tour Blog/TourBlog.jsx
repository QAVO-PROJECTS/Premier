import React from 'react';
import './tourBlog.scss'
import {FaArrowRightLong} from "react-icons/fa6";
import BlogCard from "../../../components/BlogCard/BlogCard.jsx";
function TourBlog() {
    const arr = new Array(4).fill(0)
    return (
        <div className={"tour-blog"}>
            <div className={"container"}>
                <div className={"head"}>
                    <div className={"title"}>
                        <h2>Səyahət Bloqu</h2>
                        <p>Dünyanı kəşf etməyə hazırsınız? Səyahət hekayələri, faydalı məsləhətlər və unudulmaz məkanlar haqqında yazılar burada!</p>
                    </div>
                    <button>Hamısına bax   <FaArrowRightLong /></button>
                </div>
                <div className={"row"}>
                    {arr && arr.map((item, index) => <BlogCard key={index} index={index}/>)}
                </div>
            </div>
        </div>
    );
}

export default TourBlog;