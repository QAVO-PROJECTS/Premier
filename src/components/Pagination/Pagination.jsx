import React from 'react';
import {FiArrowLeft, FiArrowRight} from "react-icons/fi";
import './pagination.scss'
function Pagination() {
    return (
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
    );
}

export default Pagination;