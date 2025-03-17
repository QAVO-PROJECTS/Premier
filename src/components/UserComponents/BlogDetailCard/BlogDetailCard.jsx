import './index.scss'
import {FiArrowUpRight} from "react-icons/fi";
import image from "/src/assets/detailcard.jpg"
function BlogDetailCard() {
    return (
        <div className={"col-lg-6 col-md-6"}>
            <div className={"blog-detail-card"}>
                <div className={"detail-image"}>
                    <img src={image}/>
                </div>
                <div className={"detail-card-content"}>
                    <h5>Bali adasında 7 gün – Cənnət məkanı necə kəşf etməli?</h5>
                    <p>Balinin ən gözəl çimərlikləri, məbədləri və macəra dolu fəaliyyətləri haqqında 7 günlük səyahət planı.</p>
                    <button>Blogu oxu <FiArrowUpRight  className={"iconn"}/></button>
                </div>
            </div>
        </div>
    );
}

export default BlogDetailCard;