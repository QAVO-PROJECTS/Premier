import "./StartPage.scss";
import {useEffect, useRef, useState} from "react";
import backgroundVideo from "../../../assets/WhatsApp Video 2025-04-19 at 09.09.18_b8e957cb.mp4";

const StartPage = () => {

    const videoRef = useRef(null);
    const [showContent, setShowContent] = useState(false);
    useEffect(() => {
        const video = videoRef.current;

        const onVideoEnd = () => {
            setShowContent(true);
        };

        video.addEventListener('ended', onVideoEnd);

        return () => {
            video.removeEventListener('ended', onVideoEnd);
        };
    }, []);

    return (
        <div className="start-page-container">
            <div className="video-wrapper">
                <video
                    ref={videoRef}
                    className="home-banner-video"
                    autoPlay
                    muted
                    playsInline
                >
                    <source src={backgroundVideo} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
        </div>
    );
};

export default StartPage;
