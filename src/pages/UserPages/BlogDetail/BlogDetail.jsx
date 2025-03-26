import React, { useEffect } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import banner from "/src/assets/ToursBannerRed.png";
import "./blogDetail.scss";
import { FiCopy } from "react-icons/fi";
import { FaArrowRightLong, FaXTwitter } from "react-icons/fa6";
import { FaFacebook, FaLinkedin } from "react-icons/fa";
import BlogDetailCard from "../../../components/UserComponents/BlogDetailCard/BlogDetailCard.jsx";
import { useGetAllBlogsQuery, useGetBlogByIdQuery } from "../../../services/adminApi.jsx";
import { BLOG_IMG_URL } from "../../../constants.js";
import ScrollToTop from "../../../components/ScrollToTop/index.jsx";
import AOS from "aos";
import "aos/dist/aos.css";

function BlogDetail() {
    const { t, i18n } = useTranslation();
    const language = i18n.language; // Məsələn: "az", "en", "ru"
    const { blogId } = useParams();
    const { data: getBlogById } = useGetBlogByIdQuery(blogId);
    const blog = getBlogById?.data;
    const navigate = useNavigate();
    const { data: getAllBlogs } = useGetAllBlogsQuery();
    const blogs = getAllBlogs?.data.slice(0, 2);

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

    // Copy link handler
    const handleCopyLink = () => {
        navigator.clipboard.writeText(window.location.href)
            .then(() => {
                alert(t("blogDetail.copySuccess", "Link kopyalandı!"));
            })
            .catch((err) => {
                console.error("Copy failed", err);
            });
    };

    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);

    return (
        <div id="blog-detail" data-aos="fade-up">
            <ScrollToTop/>
            <div className="container" data-aos="fade-in">
                <div className="head" data-aos="fade-right">
                    <p>
                        {t("blogDetail.breadcrumb", "Ana səhifə / Bloq /")} <span>{title}</span>
                    </p>
                </div>
                <div className="blogContent" data-aos="zoom-in">
                    <div className="date">{blog?.createDate}</div>
                    <h1>{title}</h1>
                    <img src={BLOG_IMG_URL + blog?.imageNames[0]} alt={title} style={{ marginBottom: "96px" }} />
                </div>
                <div className="blog-detail-content" data-aos="fade-up">
                    <div className="detail-content" data-aos="fade-up">
                        <h4>{subTitle}</h4>
                        <p>{context}</p>
                        <img src={BLOG_IMG_URL + blog?.imageNames[1]} alt={subTitle} data-aos="zoom-in" />
                    </div>
                    <div className="title" data-aos="fade-right">
                        <div className="text">
                            <h6>{t("blogDetail.blogHeading", "Premier Tur Səyahət Blogu")}</h6>
                            <p>{t("blogDetail.authorLabel", "Müəllif")}</p>
                        </div>
                        <div className="social" data-aos="flip-up">
                            <div className="detail-icon" onClick={handleCopyLink} style={{ cursor: "pointer" }}>
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
                <div className="blog-recommed" data-aos="fade-up">
                    <div className="recommedTitle" data-aos="zoom-in">
                        <h5>{t("blogDetail.recommendTitle", "Blogdan")}</h5>
                        <button onClick={() => navigate("/blog")}>
                            {t("blogDetail.viewAll", "Hamısına bax")} <FaArrowRightLong />
                        </button>
                    </div>
                    <p data-aos="fade-up">
                        {t(
                            "blogDetail.recommendSubtitle",
                            "Dünyanı kəşf etməyə hazırsınız? Səyahət hekayələri, faydalı məsləhətlər və unudulmaz məkanlar haqqında yazılar burada!"
                        )}
                    </p>
                    <div className="row gy-3" data-aos="fade-up">
                        {blogs && blogs.map((blog, index) => (
                            <BlogDetailCard key={blog.id} blog={blog} data-aos="flip-up" />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BlogDetail;
