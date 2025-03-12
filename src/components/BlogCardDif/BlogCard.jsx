import image from "../../images/8ddf844515ec7e41368a02a2aa6e44cd.jpg"
import "./blogCard.scss"
import {GoArrowRight} from "react-icons/go";
function BlogCard({index}) {
    return (
        <div className={"col-3"}>
            <div className={"blog-card-dif"}>
                <div className={"image"}>
                    <img src={image} alt=""/>
                </div>
                <div className={"date"} style={{
                    backgroundColor:(index%3===0)?"#FCDDEC":(index%3===1) ?"#F2F6FF": (index%3===2) ?"#FEFADE":"red",
                    color:(index%3===0)?"#F178B6":(index%3===1) ?"#3E86F5": (index%3===2) ?"#EFD203":"red"

                }}>12.02.2025</div>
                <h5>Təyyarə biletlərini daha ucuz necə almaq olar?</h5>
                <p>Ən ucuz biletləri tapmaq üçün hansı günlərdə bron etməli, hansı axtarış motorlarından istifadə etməli</p>
                <button className={"button"} style={{textAlign:"end"
                }}>Ətraflı oxu  <GoArrowRight/></button>
            </div>
        </div>
    );
}

export default BlogCard;