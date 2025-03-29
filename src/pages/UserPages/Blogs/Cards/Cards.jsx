import  { useState, useEffect } from 'react';
import "./cards.scss";
import Index from "../../../../components/UserComponents/BlogCardDif/index.jsx";
import Pagination from "../../../../components/UserComponents/Pagination/Pagination.jsx";
import { useGetAllBlogsQuery } from "../../../../services/adminApi.jsx";
import { useTranslation } from "react-i18next";
import AOS from "aos";
import "aos/dist/aos.css";

function Cards() {
    const { data: getAllBlogs } = useGetAllBlogsQuery();
    const blogs = getAllBlogs?.data || [];

    // Pagination üçün state və hesablamalar (MD və yuxarı ekranlar üçün)
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(window.innerWidth < 768 ? 4 : 8);
    useEffect(() => {
        const handleResize = () => {
            setPostsPerPage(window.innerWidth < 768 ? 4 : 8);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // SM ekranlarda "load more" üçün state
    const [visiblePosts, setVisiblePosts] = useState(postsPerPage);

    // Hal-hazırki səhifəyə uyğun bloglar (MD və yuxarı ekranlar üçün)
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = blogs.slice(indexOfFirstPost, indexOfLastPost);

    // SM ekranlarda görünəcək bloglar (ilk visiblePosts sayda)
    const visibleBlogs = blogs.slice(0, visiblePosts);
    const { t } = useTranslation();

    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);

    return (
        <div style={{ paddingBottom: "120px" }} data-aos="fade-up">
            <div className="container" data-aos="fade-in">
                <div className="row gy-5" style={{ margin: "60px auto" }} data-aos="zoom-in">
                    {/* MD və daha böyük ekranlarda pagination ilə */}
                    <div className="d-none d-md-flex row" style={{margin:"0 auto"}}>
                        {currentPosts.map((blog, index) => (
                            <Index key={blog?.id} index={index} blog={blog} data-aos="flip-up" />
                        ))}
                    </div>
                    {/* SM və daha aşağı ekranlarda "load more" funksiyası */}
                    <div className="d-block d-md-none row" style={{margin:"0 auto"}}>
                        {visibleBlogs.map((blog, index) => (
                            <Index key={blog?.id} index={index} blog={blog} data-aos="flip-up" />
                        ))}
                    </div>
                </div>
                {/* MD və daha böyük ekranlarda Pagination */}
                <div className="d-none d-md-block" data-aos="fade-up">
                    <Pagination
                        currentPage={currentPage}
                        totalPosts={blogs.length}
                        postsPerPage={postsPerPage}
                        onPageChange={(page) => setCurrentPage(page)}
                    />
                </div>
                {/* SM və daha aşağı ekranlarda "Ətraflı bax" düyməsi - həmişə görünəcək */}
                <div className="d-block d-md-none text-center" data-aos="zoom-in">
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
                        }}
                        onClick={() => setVisiblePosts(visiblePosts + postsPerPage)}
                    >
                        {t("tours.viewMore", "Ətraflı bax")}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Cards;
