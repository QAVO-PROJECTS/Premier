import React from 'react';
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import './pagination.scss';
import { useTranslation } from 'react-i18next';

function Pagination() {
    const { t } = useTranslation();

    return (
        <div className="pagination">
            <a href="#" className="pagination__button prev">
                <FiArrowLeft /> {t("pagination.prev", "Əvvələ")}
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
                {t("pagination.next", "Sonra")} <FiArrowRight />
            </a>
        </div>
    );
}

export default Pagination;
