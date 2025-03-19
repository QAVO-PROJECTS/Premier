import React from 'react';
import "./blogDetail.scss";
import { FiCopy } from "react-icons/fi";
import { FaArrowRightLong, FaXTwitter } from "react-icons/fa6";
import { FaFacebook, FaLinkedin } from "react-icons/fa";
import BlogDetailCard from "../../../components/UserComponents/BlogDetailCard/BlogDetailCard.jsx";
import { useNavigate, useParams } from "react-router-dom";
import { useGetBlogByIdQuery } from "../../../services/adminApi.jsx";
import { BLOG_IMG_URL } from "../../../constants.js";
import { useTranslation } from "react-i18next";

function BlogDetail() {
    const { t, i18n } = useTranslation();
    const language = i18n.language; // Məsələn: "az", "en", "ru"
    const { blogId } = useParams();
    const { data: getBlogById } = useGetBlogByIdQuery(blogId);
    const blog = getBlogById?.data;
    const navigate = useNavigate();

    // Cari dili nəzərə alaraq title, subTitle və context sahələrini seçirik
    let title = blog?.title;
    let subTitle = blog?.subTitle;
    let context = blog?.context;
    if (blog) {
        if (language === "en") {
            if (blog.titleEng) title = blog.titleEng;
            if (blog.subTitleEng) subTitle = blog.subTitleEng;
            if (blog.contextEng) context = blog.contextEng;
        } else if (language === "ru") {
            if (blog.titleRu) title = blog.titleRu;
            if (blog.subTitleRu) subTitle = blog.subTitleRu;
            if (blog.contextRu) context = blog.contextRu;
        }
    }

    return (
        <div id="blog-detail">
            <div className="container">
                <div className="head">
                    <p>
                        {t("blogDetail.breadcrumb", "Ana səhifə / Bloq /")} <span>{title}</span>
                    </p>
                </div>
                <div className="blogContent">
                    <div className="date">
                        {blog?.createDate}
                    </div>
                    <h1>{title}</h1>
                    <img src={BLOG_IMG_URL + blog?.imageNames[0]} alt={title} style={{ marginBottom: "96px" }} />
                </div>
                <div className="blog-detail-content">
                    <div className="detail-content">
                        <h4>{subTitle}</h4>
                        <p>
                            {context}
                        </p>
                        <img src={BLOG_IMG_URL + blog?.imageNames[1]} alt={subTitle} />
                    </div>
                    <div className="title">
                        <div className="text">
                            <h6>{t("blogDetail.blogHeading", "Premier Tur Səyahət Blogu")}</h6>
                            <p>{t("blogDetail.authorLabel", "Müəllif")}</p>
                        </div>
                        <div className="social">
                            <div className="detail-icon">
                                <FiCopy /> {t("blogDetail.copyLink", "Copy link")}
                            </div>
                            <div className="detail-icon">
                                <FaXTwitter />
                            </div>
                            <div className="detail-icon">
                                <FaFacebook />
                            </div>
                            <div className="detail-icon">
                                <FaLinkedin />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="blog-recommed">
                    <div className="recommedTitle">
                        <h5>{t("blogDetail.recommendTitle", "Blogdan")}</h5>
                        <button onClick={() => navigate("/blog")}>
                            {t("blogDetail.viewAll", "Hamısına bax")} <FaArrowRightLong />
                        </button>
                    </div>
                    <p>
                        {t(
                            "blogDetail.recommendSubtitle",
                            "Dünyanı kəşf etməyə hazırsınız? Səyahət hekayələri, faydalı məsləhətlər və unudulmaz məkanlar haqqında yazılar burada!"
                        )}
                    </p>
                    <div className="row gy-3">
                        <BlogDetailCard />
                        <BlogDetailCard />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BlogDetail;
