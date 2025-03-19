import "./index.scss";
import { MdOutlineWatchLater } from "react-icons/md";
import { BLOG_IMG_URL } from "../../../constants.js";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function HorizontalBlogCard({ blog }) {
    const navigate = useNavigate();
    const { i18n } = useTranslation();
    const language = i18n.language; // "az", "en", "ru", və s.

    // Cari dili nəzərə alaraq subTitle seçirik:
    let subTitle = blog?.subTitle;
    if (language === "en" && blog?.subTitleEng) {
        subTitle = blog?.subTitleEng;
    } else if (language === "ru" && blog?.subTitleRu) {
        subTitle = blog?.subTitleRu;
    }

    return (
        <div className="blogs-card" onClick={() => navigate(`/blogs/${blog.id}`)}>
            <div className="blogsimage">
                <img src={BLOG_IMG_URL + blog.imageNames[0]} alt="" />
            </div>
            <div className="content">
                <h6>{subTitle}</h6>
                <p>
                    <MdOutlineWatchLater /> {blog?.createDate}
                </p>
            </div>
        </div>
    );
}

export default HorizontalBlogCard;
