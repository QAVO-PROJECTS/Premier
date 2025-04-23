import "./StartPage.scss";
import { useEffect, useRef, useState } from "react";
import backgroundVideo from "../../../assets/WhatsApp Video 2025-04-19 at 09.09.18_b8e957cb.mp4";
import mobileBackgroundVideo from "../../../assets/Change_Animation Vertical.mp4";

const StartPage = () => {
    const desktopVideoRef = useRef(null);
    const mobileVideoRef = useRef(null);
    const [showContent, setShowContent] = useState(false);

    useEffect(() => {
        const desktopVideo = desktopVideoRef.current;
        const mobileVideo = mobileVideoRef.current;

        // Attempt to play; on iOS/Safari may require a touchstart
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
        if (mobileVideo) {
            mobileVideo.addEventListener("ended", onVideoEnd);
            tryPlay(mobileVideo);
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
                    loop
                    preload="auto"
                    playsInline
                    webkit-playsinline="true"
                >
                    <source src={backgroundVideo} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <video
                    ref={mobileVideoRef}
                    className="home-banner-video mobile-video"
                    autoPlay
                    muted
                    loop
                    preload="auto"
                    playsInline
                    webkit-playsinline="true"
                >
                    <source src={mobileBackgroundVideo} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>

            {showContent && (
                <div className="start-content">
                    {/* Ana içerik burada yer alacak */}
                </div>
            )}
        </div>
    );
};

export default StartPage;