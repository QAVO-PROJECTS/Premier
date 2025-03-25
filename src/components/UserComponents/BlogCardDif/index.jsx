import "./index.scss";
import { GoArrowRight } from "react-icons/go";
import { BLOG_IMG_URL } from "../../../constants.js";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function BlogCardDif({ index, blog }) {
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();
    const language = i18n.language; // "az", "en", "ru", və s.

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
        <div className={"col-lg-3 col-md-6 mb-4 pe-2 ps-2"}>
            <div className={"blog-card-dif"}>
                <div className={"image"}>
                    <img src={BLOG_IMG_URL + blog?.imageNames[0]} alt={title} />
                </div>
                <div
                    className={"date"}
                    style={{
                        backgroundColor: "#FCDDEC",
                        color: "#F178B6",
                    }}
                >
                    {blog?.createDate}
                </div>
                <h5>{title}</h5>
                <p>{subTitle}</p>
                <button
                    onClick={() => navigate(`/blogs/${blog?.id}`)}
                    className={"button"}
                    style={{ textAlign: "end" }}
                >
                    {t("blogCard.readMore", "Ətraflı oxu")} <GoArrowRight />
                </button>
            </div>
        </div>
    );
}

export default BlogCardDif;
