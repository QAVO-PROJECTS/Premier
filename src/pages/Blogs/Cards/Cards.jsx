import React from 'react';
import './cards.scss'
import BlogCard from "../../../components/BlogCardDif/BlogCard.jsx";
import {SwiperSlide} from "swiper/react";
import {FiArrowLeft, FiArrowRight} from "react-icons/fi";
function Cards() {
    const arr = new Array(6).fill(0)

    return (
        <div style={{paddingBottom:"120px"}}>
            <div className={"container"}>
                <div className={"row gy-5"} style={{marginBottom:"60px"}} >
                    {arr && arr.map((item, index) => <BlogCard key={index} index={index}/>)}
                </div>
                <div className="pagination">
                    <a href="#" className="pagination__button prev">
                        <FiArrowLeft /> Əvvələ
                    </a>

                    <ul className="pagination__list">
                        <li><a href="#" className="pagination__link active">1</a></li>
                        <li><a href="#" className="pagination__link">2</a></li>
                        <li><span className="pagination__dots">...</span></li>
                        <li><a href="#" className="pagination__link">8</a></li>
                        <li><a href="#" className="pagination__link">9</a></li>
                        <li><a href="#" className="pagination__link">10</a></li>
                    </ul>

                    <a href="#" className="pagination__button next">
                        Sonra <FiArrowRight />
                    </a>
                </div>

            </div>
        </div>
    );
}

export default Cards;