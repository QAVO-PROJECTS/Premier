import './index.scss'
import {FiArrowUpRight} from "react-icons/fi";
import {BLOG_IMG_URL} from "../../../constants.js";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";
function BlogDetailCard({blog}) {
    const { t, i18n } = useTranslation();
    const language = i18n.language;
    let title = blog?.title;
    let subTitle = blog?.subTitle;
    if (blog) {
        if (language === "en") {
            if (blog?.titleEng) title = blog?.titleEng;
            if (blog?.subTitleEng) subTitle = blog?.subTitleEng;
        } else if (language === "ru") {
            if (blog?.titleRu) title = blog?.titleRu;
            if (blog?.subTitleRu) subTitle = blog?.subTitleRu;
        }
    }
    const navigate = useNavigate();
    return (
        <div className={"col-lg-6 col-md-6"}>
            <div className={"blog-detail-card"}>
                <div className={"detail-image"}>
                    <img src={BLOG_IMG_URL + blog?.imageNames[0]} />
                </div>
                <div className={"detail-card-content"}>
                    <h5>{title}</h5>
                    <p>{subTitle}</p>
                    <button onClick={()=>navigate(`/blogs/${blog?.id}`)}>{t("blogDetailCard.button")} <FiArrowUpRight  className={"iconn"}/></button>
                </div>
            </div>
        </div>
    );
}

export default BlogDetailCard;