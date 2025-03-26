import React, { useEffect } from 'react';
import "./newBlog.scss";
import { GoArrowRight } from "react-icons/go";
import image from "../../../../assets/Rectangle 39853.png";
import { useTranslation } from 'react-i18next';
import { useGetAllBlogsQuery } from "../../../../services/adminApi.jsx";
import { BLOG_IMG_URL } from "../../../../constants.js";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

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

    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);

    return (
        <div className="newBlog" data-aos="fade-up">
            <div className="container" data-aos="fade-in">
                <div className="head" data-aos="fade-right">
                    <p>
                        {t("newBlog.breadcrumb", "Ana səhifə /")} <span>{t("newBlog.pageTitle", "Bloq")}</span>
                    </p>
                </div>
                <div className="title" data-aos="zoom-in">
                    <div></div>
                    <h2>{t("newBlog.title", "Ən Yeni")}</h2>
                </div>
                {latestBlog ? (
                    <div className="row" data-aos="fade-up">
                        <div className="col-lg-6" data-aos="flip-left">
                            <div className="image">
                                {/* Əgər bloga aid şəkil varsa, imageNames-dən ilkini göstəririk */}
                                <img src={BLOG_IMG_URL + latestBlog.imageNames[0]} alt={title} />
                            </div>
                        </div>
                        <div className="col-lg-6" data-aos="flip-right">
                            <div className="text">
                                <div className="date" data-aos="fade-up">
                                    {latestBlog.createDate}
                                </div>
                                <h3 data-aos="fade-up">{title}</h3>
                                <p data-aos="fade-up">
                                    {context}
                                </p>
                                <div style={{ textAlign: "end" }} data-aos="zoom-in">
                                    <button onClick={() => navigate(`/blogs/${latestBlog.id}`)}>
                                        {t("newBlog.readMore", "Ətraflı oxu")} <GoArrowRight className="icon" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <p data-aos="fade-up">{t("newBlog.noBlog", "Hal-hazırda heç bir bloq yoxdur")}</p>
                )}
            </div>
        </div>
    );
}

export default NewBlog;
