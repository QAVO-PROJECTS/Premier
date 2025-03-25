import React, { useState, useEffect, useRef } from "react";
import image from "../../../assets/5b9cf82fb66a7a54720e233be60ac45e.jpg";
import "./index.scss";
import { useGetAllCustomerViewsQuery } from "../../../services/adminApi.jsx";
import { CUSTOMER_IMG_URL } from "../../../constants.js";

const testimonials = [
    { name: "Aysel M.", review: "Bu şirkətlə Maldivlərə səyahət etdik...", image },
    { name: "Ramin S.", review: "İlk dəfə Avropaya səyahət etdim...", image },
    { name: "Nigar T.", review: "Paris və Amsterdam tur paketini seçdik...", image },
    { name: "Elvin N.", review: "Türkiyəyə səyahət üçün bron etdik...", image },
    { name: "Elvin N.", review: "Türkiyəyə səyahət üçün bron etdik...", image },
    { name: "Elvin N.", review: "Türkiyəyə səyahət üçün bron etdik...", image },
    { name: "Elvin N.", review: "Türkiyəyə səyahət üçün bron etdik...", image },
    { name: "Elvin N.", review: "Türkiyəyə səyahət üçün bron etdik...", image },
    { name: "Elvin N.", review: "Türkiyəyə səyahət üçün bron etdik...", image },
    { name: "Elvin N.", review: "Türkiyəyə səyahət üçün bron etdik...", image },
    { name: "Elvin N.", review: "Türkiyəyə səyahət üçün bron etdik...", image },
];

// Tanımlı ana pozisyonlar (key positions)
// Kenara giden slide'lar için opacity 0 ayarlanmış
const keyPositions = {
    "-2": { translateX: -193, translateY: 50, rotate: -30, scale: 0.8, opacity: 0, marginTop: 250 },
    "-1": { translateX: -105, translateY: 50, rotate: -15, scale: 0.9, opacity: 0.9, marginTop: 0 },
    "0":  { translateX: 0,    translateY: 0,  rotate: 0,   scale: 1,   opacity: 1,   marginTop: 0 },
    "1":  { translateX: 105,  translateY: 50, rotate: 15,  scale: 0.9, opacity: 0.9, marginTop: 0 },
    "2":  { translateX: 193,  translateY: 50, rotate: 30,  scale: 0.8, opacity: 0, marginTop: 250 },
};

const interpolate = (value1, value2, t) => value1 + (value2 - value1) * t;

const getSlideStyle = (diff) => {
    // diff değerini -2 ile 2 arasında sınırlıyoruz
    if (diff < -2) diff = -2;
    if (diff > 2) diff = 2;
    const lowerKey = Math.floor(diff);
    const upperKey = lowerKey + 1;
    const t = diff - lowerKey;

    if (t === 0) {
        const pos = keyPositions[lowerKey];
        return {
            transform: `translateX(${pos.translateX}%) translateY(${pos.translateY}px) rotate(${pos.rotate}deg) scale(${pos.scale})`,
            opacity: pos.opacity,
            marginTop: pos.marginTop + "px",
            zIndex: Math.abs(diff) < 0.5 ? 3 : Math.abs(diff) < 1.5 ? 2 : 1,
        };
    } else {
        const lowerPos = keyPositions[lowerKey] || keyPositions["-2"];
        const upperPos = keyPositions[upperKey] || keyPositions["2"];
        const translateX = interpolate(lowerPos.translateX, upperPos.translateX, t);
        const translateY = interpolate(lowerPos.translateY, upperPos.translateY, t);
        const rotate = interpolate(lowerPos.rotate, upperPos.rotate, t);
        const scale = interpolate(lowerPos.scale, upperPos.scale, t);
        const opacity = interpolate(lowerPos.opacity, upperPos.opacity, t);
        const marginTop = interpolate(lowerPos.marginTop, upperPos.marginTop, t);
        return {
            transform: `translateX(${translateX}%) translateY(${translateY}px) rotate(${rotate}deg) scale(${scale})`,
            opacity: opacity,
            marginTop: marginTop + "px",
            zIndex: Math.abs(diff) < 0.5 ? 3 : Math.abs(diff) < 1.5 ? 2 : 1,
        };
    }
};

// Dairesel fark hesaplaması: ondalıklı activeIndex için de çalışır
const getCircularDiff = (index, activeIndex, length) => {
    let diff = index - activeIndex;
    if (diff > length / 2) {
        diff -= length;
    } else if (diff < -length / 2) {
        diff += length;
    }
    return diff;
};

const CurvedSlider = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const requestRef = useRef();
    const previousTimeRef = useRef();
    const { data: getAllCustomerViews } = useGetAllCustomerViewsQuery();
    const views = getAllCustomerViews?.data;

    const DURATION = 2000;
    const FRAME_DURATION = 1000 / 60 // Yaklaşık 16.67ms, 60 fps
    const speed = 0.6 / DURATION; // activeIndex her ms için bu oranda artacak

    const animate = time => {
        if (previousTimeRef.current !== undefined) {
            // Her frame için sabit FRAME_DURATION kullanarak activeIndex güncellemesi
            setActiveIndex(prev => (prev + speed * FRAME_DURATION) % views.length);
        }
        previousTimeRef.current = time;
        requestRef.current = requestAnimationFrame(animate);
    };

    useEffect(() => {
        if (views && views.length > 0) {
            requestRef.current = requestAnimationFrame(animate);
        }
        return () => cancelAnimationFrame(requestRef.current);
    }, [views]);

    return (
        <div className="slider-container">
            {views && views.map((item, index) => {
                const diff = getCircularDiff(index, activeIndex, views.length);
                if (Math.abs(diff) > 2) return null;
                const style = getSlideStyle(diff);
                return (
                    <div key={index} className="curved-slide" style={style}>
                        <div className="testimonial-card" style={{ backgroundColor: (index % 2 === 0) ? "#FFEEF0" : "#ffffff", border: "1px solid #EAEAEA" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "30px" }}>
                                <img src={CUSTOMER_IMG_URL + item?.profilImage} alt={item.customerName} className="avatar" />
                                <h3>{item.customerName}</h3>
                            </div>
                            <p>{item.reviewText}</p>
                            <div className="card-foot">
                                <div className="stars">
                                    {Array.from({ length: item.rating }).map((_, i) => (
                                        <i key={i} className="fas fa-star" />
                                    ))}
                                </div>
                                <h2>"</h2>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default CurvedSlider;
