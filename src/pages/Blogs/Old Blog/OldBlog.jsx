import React from 'react';
import "./oldBlog.scss"
import BlogsCard from "../../../components/Horizontal Blog Card/BlogsCard.jsx";

function OldBlog() {
    return (
        <div className={"oldBlog"}>
            <div className={"container"}>
                <div className={"title"}>
                    <div></div>
                    <h2>Öncəki bloqlar</h2>
                </div>
                <div className={"row"}>
                    <div className={'col-7'}>
                        <div className={"image"}>
                        <div className={"text"}>
                            <div className={"date"}>
                                12.02.2025
                            </div>
                            <h2>Dünyanın ən yaxşı hava limanları – Harada rahat gözləmək olar?</h2>
                            <p>Səyahət edərkən hava limanında vaxt keçirmək bəzən yorucu ola bilər, amma bəzi hava
                                limanları sərnişinlər üçün rahat və lüks şərait yaradır.</p>

                        </div>
                        </div>
                    </div>
                    <div className={'col-5'}>
                        <div className={"blogs"}>
                            <div className={"cards"}>
                                <BlogsCard/>
                                <BlogsCard/>
                                <BlogsCard/>
                                <BlogsCard/>
                                <BlogsCard/>
                                <BlogsCard/>
                                <BlogsCard/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OldBlog;