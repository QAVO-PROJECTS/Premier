import './index.scss'
import image2 from '/src/assets/cover.png'
import image3 from '/src/assets/cover1.png'
import image4 from "/src/assets/Vector 14.png"
import {IoArrowBack} from "react-icons/io5";
import image from "/src/assets/tour.jpg"
import {useNavigate} from "react-router-dom";

function SameTourCard({title,image,index,id}) {
    const navigate = useNavigate();
    console.log(id)
    return (
        <div className={"col-lg-4 col-md-6 "}>
            <section id={"sameTourCard"}>
                <img src={image} alt={"Image"} className={"cardImage"} onClick={() => navigate(`/tours/${id}`)}/>
                <img src={image2} alt={"Image"} className={"posBotLeft"}/>
                <img src={index%2===0 ? image3 : image4} alt={"Image"} className={index%2===1? "posTop" : "posTopRight"}/>
                <div className={"arrow"} style={{display:index%2===1 ? "none" : ""}} onClick={() => navigate(`/tours/${id}`)}><IoArrowBack/></div>
                <div className={"name"} onClick={() => navigate(`/tours/${id}`)} style={{cursor:"pointer"}}><p>{title}</p></div>
            </section>
        </div>
    );
}

export default SameTourCard;