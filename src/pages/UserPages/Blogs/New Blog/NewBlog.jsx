import React from 'react';
import "./newBlog.scss";
import { GoArrowRight } from "react-icons/go";
import image from "../../../../assets/Rectangle 39853.png";
import { useTranslation } from 'react-i18next';
import { useGetAllBlogsQuery } from "../../../../services/adminApi.jsx";
import { BLOG_IMG_URL } from "../../../../constants.js";
import { useNavigate } from "react-router-dom";

function NewBlog() {
    const { t, i18n } = useTranslation();
    const language = i18n.language; // Məsələn: "az", "en", "ru"
    const { data: getAllBlogs } = useGetAllBlogsQuery();
    // getAllBlogs?.data property-dir
    const blogsData = getAllBlogs?.data;

    // Əgər datası varsa, silinməyən blogları API tərəfindən verilən siyahı sırasına əsasən götürürük
    const validBlogs = blogsData ? blogsData.filter(blog => !blog.isDeleted) : [];
    // Siyahıda ən sonuncu element "Ən Yeni" blog kimi qəbul olunur
    const latestBlog = validBlogs.length > 0 ? validBlogs[validBlogs.length - 1] : null;
    const navigate = useNavigate();

    // Əgər ən son blog varsa, cari dili nəzərə alaraq title və context seçirik:
    let title = "";
    let context = "";
    if (latestBlog) {
        title = latestBlog?.title;
        context = latestBlog?.context;
        if (language === "en") {
            if (latestBlog?.titleEng) title = latestBlog?.titleEng;
            if (latestBlog?.contextEng) context = latestBlog?.contextEng;
        } else if (language === "ru") {
            if (latestBlog?.titleRu) title = latestBlog?.titleRu;
            if (latestBlog?.contextRu) context = latestBlog?.contextRu;
        }
    }

    return (
        <div className={"newBlog"}>
            <div className={"container"}>
                <div className={"head"}>
                    <p>
                        {t("newBlog.breadcrumb", "Ana səhifə /")} <span>{t("newBlog.pageTitle", "Bloq")}</span>
                    </p>
                </div>
                <div className={"title"}>
                    <div></div>
                    <h2>{t("newBlog.title", "Ən Yeni")}</h2>
                </div>
                {latestBlog ? (
                    <div className={"row"}>
                        <div className={"col-lg-6"}>
                            <div className={"image"}>
                                {/* Əgər bloga aid şəkil varsa, imageNames-dən ilkini göstəririk */}
                                <img src={BLOG_IMG_URL + latestBlog.imageNames[0]} alt={title} />
                            </div>
                        </div>
                        <div className={"col-lg-6"}>
                            <div className={"text"}>
                                <div className={"date"}>
                                    {latestBlog.createDate}
                                </div>
                                <h3>{title}</h3>
                                <p>
                                    {context}
                                </p>
                                <div style={{ textAlign: "end" }}>
                                    <button onClick={() => navigate(`/blogs/${latestBlog.id}`)}>
                                        {t("newBlog.readMore", "Ətraflı oxu")} <GoArrowRight className={"icon"} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <p>{t("newBlog.noBlog", "Hal-hazırda heç bir bloq yoxdur")}</p>
                )}
            </div>
        </div>
    );
}

export default NewBlog;
