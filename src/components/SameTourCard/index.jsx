import './index.scss'
import image1 from '/src/images/tour.jpg'
import image2 from '/src/images/cover.png'
import image3 from '/src/images/cover1.png'
import image4 from "/src/images/Vector 14.png"
import {IoArrowBack} from "react-icons/io5";

function SameTourCard({title,image,index}) {
    return (
        <div className={"col-4"}>
            <section id={"sameTourCard"}>
                <img src={image} alt={"Image"} className={"cardImage"}/>
                <img src={image2} alt={"Image"} className={"posBotLeft"}/>
                <img src={index%2===0 ? image3 : image4} alt={"Image"} className={index%2===1? "posTop" : "posTopRight"}/>
                <div className={"arrow"} style={{display:index%2===1 ? "none" : ""}}><IoArrowBack/></div>
                <div className={"name"}>{title}</div>
            </section>
        </div>
    );
}

export default SameTourCard;