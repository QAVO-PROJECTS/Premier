import React from 'react';
import "./oldBlog.scss";
import Index from "../../../../components/UserComponents/HorizontalBlogCard/index.jsx";
import {useTranslation} from 'react-i18next';
import {useGetAllBlogsQuery} from "../../../../services/adminApi.jsx";
import {BLOG_IMG_URL} from "../../../../constants.js";

function OldBlog() {
    const {t, i18n} = useTranslation();
    const language = i18n.language; // "az", "en", "ru", və s.
    const {data: getAllBlogs} = useGetAllBlogsQuery();
    const blogsData = getAllBlogs?.data;

    // Silinməmiş blogları alırıq
    const validBlogs = blogsData ? blogsData.filter(blog => !blog.isDeleted) : [];

    // Siyahıdakı ilk blogu featured olaraq götürürük, qalanlarını isə "öncəki bloqlar" kimi göstəririk
    const featuredBlog = validBlogs.length > 0 ? validBlogs[0] : null;
    const oldBlogs = validBlogs.length > 1 ? validBlogs.slice(1) : [];

    // Featured blog üçün title və context-in cari dili nəzərə alınaraq seçilməsi
    let featuredTitle = "";
    let featuredContext = "";
    if (featuredBlog) {
        featuredTitle = featuredBlog?.title;
        featuredContext = featuredBlog?.context;
        if (language === "en") {
            if (featuredBlog?.titleEng) featuredTitle = featuredBlog?.titleEng;
            if (featuredBlog?.contextEng) featuredContext = featuredBlog?.contextEng;
        } else if (language === "ru") {
            if (featuredBlog?.titleRu) featuredTitle = featuredBlog?.titleRu;
            if (featuredBlog?.contextRu) featuredContext = featuredBlog?.contextRu;
        }
    }

    return (
        <div className={"oldBlog"}>
            <div className={"container"}>
                <div className={"title"}>
                    <div></div>
                    <h2>{t("oldBlog.title", "Öncəki bloqlar")}</h2>
                </div>
                <div className={"row"}>
                    {featuredBlog && (
                        <div className={'col-lg-7'}>
                            <div className={"image"} style={{
                                backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.5) 100%), url("${BLOG_IMG_URL + featuredBlog?.imageNames[0]}")`,
                                backgroundRepeat: 'no-repeat',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                            }}>
                                <div className={"text"}>
                                    <div className={"date"}>
                                        {featuredBlog.createDate}
                                    </div>
                                    <h2>{featuredTitle}</h2>
                                    <p>
                                        {featuredContext}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                    <div className="col-lg-5 d-none d-lg-block">
                        <div className={"blogs"}>
                            <div className={"cards"}>
                                {blogsData?.map(blog => (
                                    <Index key={blog.id} blog={blog}/>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OldBlog;
