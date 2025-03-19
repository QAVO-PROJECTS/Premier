import React, { useState } from 'react';
import './cards.scss';
import Index from "../../../../components/UserComponents/BlogCardDif/index.jsx";
import Pagination from "../../../../components/UserComponents/Pagination/Pagination.jsx";
import { useGetAllBlogsQuery } from "../../../../services/adminApi.jsx";

function Cards() {
    const { data: getAllBlogs } = useGetAllBlogsQuery();
    const blogs = getAllBlogs?.data || [];

    // Pagination üçün state və hesablamalar:
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 8; // Hər səhifədə göstəriləcək blog sayı

    // Hal-hazırki səhifəyə uyğun blogları hesablamaq:
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = blogs.slice(indexOfFirstPost, indexOfLastPost);

    return (
        <div style={{ paddingBottom: "120px" }}>
            <div className={"container"}>
                <div className={"row gy-5"} style={{ marginBottom: "60px" }}>
                    {currentPosts.map((blog, index) => (
                        <Index key={blog?.id} index={index} blog={blog} />
                    ))}
                </div>
                {/* MD və daha böyük ekranlarda Pagination */}
                <div className="d-none d-md-block">
                    <Pagination
                        currentPage={currentPage}
                        totalPosts={blogs.length}
                        postsPerPage={postsPerPage}
                        onPageChange={(page) => setCurrentPage(page)}
                    />
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
                        }}
                    >
                        Ətraflı bax
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Cards;
