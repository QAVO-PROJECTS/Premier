import React from 'react';
import './cards.scss'
import Index from "../../../../components/UserComponents/BlogCardDif/index.jsx";
import Pagination from "../../../../components/UserComponents/Pagination/Pagination.jsx";
function Cards() {
    const arr = new Array(6).fill(0)

    return (
        <div style={{paddingBottom:"120px"}}>
            <div className={"container"}>
                <div className={"row gy-5"} style={{marginBottom:"60px"}} >
                    {arr && arr.map((item, index) => <Index key={index} index={index}/>)}
                </div>
                <div className="d-none d-md-block">
                    <Pagination/>
                </div>
                {/* SM və daha aşağı ekranlarda "Ətraflı bax" düyməsi göstər */}
                <div className="d-block d-md-none text-center">
                    <button
                        className="btn"
                        style={{
                            height: "63px",
                            gap: "8px",
                            padding: "18px 47.5px",
                            borderRadius: "52px",
                            border: "1px solid #000000",
                            background: "inherit",
                            fontWeight: "500",
                            fontSize: "18px",
                            lineHeight: "100%",
                        }}>
                        Ətraflı bax
                    </button>
                </div>

            </div>
        </div>
    );
}

export default Cards;