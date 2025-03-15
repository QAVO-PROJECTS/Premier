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
                <Pagination/>

            </div>
        </div>
    );
}

export default Cards;