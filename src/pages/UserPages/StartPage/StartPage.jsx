import "./StartPage.scss";
import { useEffect, useRef, useState } from "react";
import backgroundVideo from "../../../assets/WhatsApp Video 2025-04-19 at 09.09.18_b8e957cb.mp4";

const StartPage = () => {
    const desktopVideoRef = useRef(null);
    const [showContent, setShowContent] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Mobile device detection
        const userAgent = navigator.userAgent;
        const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
        setIsMobile(mobileRegex.test(userAgent));
    }, []);

    useEffect(() => {
        if (isMobile) return; // Skip video handling for mobile devices

        const desktopVideo = desktopVideoRef.current;

        // Video play function
        function tryPlay(videoEl) {
            if (!videoEl) return;
            const p = videoEl.play();
            if (p && p.catch) {
                p.catch(() => {
                    const resume = () => {
                        videoEl.play();
                        document.body.removeEventListener("touchstart", resume);
                    };
                    document.body.addEventListener("touchstart", resume, { once: true });
                });
            }
        }

        const onVideoEnd = () => {
            setShowContent(true);
        };

        if (desktopVideo) {
            desktopVideo.addEventListener("ended", onVideoEnd);
            tryPlay(desktopVideo);
        }

        return () => {
            if (desktopVideo) {
                desktopVideo.removeEventListener("ended", onVideoEnd);
            }
        };
    }, [isMobile]);

    return (
        <div className="start-page-container">
            <div className="video-wrapper">
                {!isMobile && (
                    <video
                        ref={desktopVideoRef}
                        className="home-banner-video desktop-video"
                        autoPlay
                        muted
                        loop
                        preload="auto"
                        playsInline
                        webkit-playsinline="true"
                    >
                        <source src={backgroundVideo} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                )}
            </div>
        </div>
    );
};

export default StartPage;