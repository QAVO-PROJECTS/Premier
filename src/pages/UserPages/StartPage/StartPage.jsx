import "./StartPage.scss";
import { useEffect, useRef, useState } from "react";
import backgroundVideo from "../../../assets/WhatsApp Video 2025-04-19 at 09.09.18_b8e957cb.mp4";
import mobileBackgroundVideo from "../../../assets/Change_Animation Vertical.mp4";

const StartPage = () => {
    const desktopVideoRef = useRef(null);
    const mobileVideoRef = useRef(null);
    const [showContent, setShowContent] = useState(false);
    const [isSafariOnIphone, setIsSafariOnIphone] = useState(false);

    useEffect(() => {
        // iPhone ve Safari kontrolü
        const userAgent = navigator.userAgent;
        const isIphone = /iPhone/i.test(userAgent);
        const isSafari = /Safari/i.test(userAgent) && !/Chrome/i.test(userAgent); // Chrome gibi diğer tarayıcıları hariç tut
        setIsSafariOnIphone(isIphone && isSafari);
    }, []);

    useEffect(() => {
        const desktopVideo = desktopVideoRef.current;
        const mobileVideo = mobileVideoRef.current;

        // Video oynatma fonksiyonu
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

        // iPhone ve Safari'de mobil video oynatılmayacak
        if (desktopVideo) {
            desktopVideo.addEventListener("ended", onVideoEnd);
            tryPlay(desktopVideo);
        }
        if (mobileVideo && !isSafariOnIphone) {
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
    }, [isSafariOnIphone]);

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
                {/* iPhone ve Safari'de mobil video render edilmesin */}
                {!isSafariOnIphone && (
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
                )}
            </div>


        </div>
    );
};

export default StartPage;