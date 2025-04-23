import "./StartPage.scss";
import { useEffect, useRef, useState } from "react";
import backgroundVideo from "../../../assets/WhatsApp Video 2025-04-19 at 09.09.18_b8e957cb.mp4";
import mobileBackgroundVideo from "../../../assets/Change_Animation Vertical.mp4"; // Import mobile video

const StartPage = () => {
    const desktopVideoRef = useRef(null);
    const mobileVideoRef = useRef(null);
    const [showContent, setShowContent] = useState(false);

    useEffect(() => {
        const desktopVideo = desktopVideoRef.current;
        const mobileVideo = mobileVideoRef.current;

        const onVideoEnd = () => {
            setShowContent(true);
        };

        // Attach event listener to the video that is currently active
        if (desktopVideo) {
            desktopVideo.addEventListener("ended", onVideoEnd);
        }
        if (mobileVideo) {
            mobileVideo.addEventListener("ended", onVideoEnd);
        }

        return () => {
            if (desktopVideo) {
                desktopVideo.removeEventListener("ended", onVideoEnd);
            }
            if (mobileVideo) {
                mobileVideo.removeEventListener("ended", onVideoEnd);
            }
        };
    }, []);

    return (
        <div className="start-page-container">
            <div className="video-wrapper">
                <video
                    ref={desktopVideoRef}
                    className="home-banner-video desktop-video"
                    autoPlay
                    muted
                    playsInline
                >
                    <source src={backgroundVideo} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <video
                    ref={mobileVideoRef}
                    className="home-banner-video mobile-video"
                    autoPlay
                    muted
                    playsInline
                >
                    <source src={mobileBackgroundVideo} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
        </div>
    );
};

export default StartPage;