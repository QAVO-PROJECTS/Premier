import image from "../../../assets/8ddf844515ec7e41368a02a2aa6e44cd.jpg";
import "./index.scss";
import { BLOG_IMG_URL } from "../../../constants.js";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function BlogCard({ index, blog }) {
    const navigate = useNavigate();
    const { t } = useTranslation();

    return (
        <div className={"col-3 w-100"}>
            <div className={"blog-card"}>
                <div className={"image"}>
                    <img src={BLOG_IMG_URL + blog?.imageNames[0]} alt=""/>
                </div>
                <div className={"date"} style={{
                    backgroundColor: (index % 3 === 0) ? "#FCDDEC" : (index % 3 === 1) ? "#F2F6FF" : (index % 3 === 2) ? "#FEFADE" : "red",
                    color: (index % 3 === 0) ? "#F178B6" : (index % 3 === 1) ? "#3E86F5" : (index % 3 === 2) ? "#EFD203" : "red"
                }}>
                    {blog?.createDate}
                </div>
                <h5>{blog?.title}</h5>
                <p>{blog?.subTitle}</p>
                <button onClick={() => navigate(`/blogs/${blog?.id}`)}>
                    {t("blogCard.readMore", "Ətraflı oxu")}
                </button>
            </div>
        </div>
    );
}

export default BlogCard;
