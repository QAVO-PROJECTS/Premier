import  "./index.scss"
import image from "../../../assets/vBI.jpg"
import {MdOutlineWatchLater} from "react-icons/md";
function HorizontalBlogCard() {
    return (
        <div className={'blogs-card'}>
            <div className={"blogsimage"}>
                <img src={image} alt="" />
            </div>
            <div className={"content"}>
                <h6>Təyyarə biletlərini daha ucuz necə almaq olar?</h6>
                <p><MdOutlineWatchLater />   25 fevral , 2025</p>
            </div>
        </div>
    );
}

export default HorizontalBlogCard;