import React from 'react';
import image from "../../../assets/8ddf844515ec7e41368a02a2aa6e44cd.jpg";
import "./index.scss";
import { BLOG_IMG_URL } from "../../../constants.js";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function BlogCard({ index, blog }) {
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();
    const language = i18n.language; // Məsələn, "az", "en", "ru"

    // Cari dili nəzərə alaraq title və subTitle seçirik:
    let title = blog?.title;
    let subTitle = blog?.subTitle;
    if (language === "en") {
        if (blog?.titleEng) title = blog?.titleEng;
        if (blog?.subTitleEng) subTitle = blog?.subTitleEng;
    } else if (language === "ru") {
        if (blog?.titleRu) title = blog?.titleRu;
        if (blog?.subTitleRu) subTitle = blog?.subTitleRu;
    }

    return (
        <div className={"col-3 w-100"}>
            <div className={"blog-card"}>
                <div className={"image"} onClick={() => navigate(`/blogs/${blog?.id}`)}>
                    <img src={BLOG_IMG_URL + blog?.imageNames[0]} alt={title} />
                </div>
                <div className={"date"} style={{ backgroundColor: "#FCDDEC", color: "#D80027" }}>
                    {blog?.createDate}
                </div>
                <h5>{title}</h5>
                <p>{subTitle}</p>
                <button onClick={() => navigate(`/blogs/${blog?.id}`)}>
                    {t("blogCard.readMore", "Ətraflı oxu")}
                </button>
            </div>
        </div>
    );
}

export default BlogCard;
