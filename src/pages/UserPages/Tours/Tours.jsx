import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { CiSearch } from 'react-icons/ci';
import countryIcon from "/src/assets/famicons_earth.png";
import cityIcon from "../../../assets/CityRed.png";
import Pagination from "../../../components/UserComponents/Pagination/Pagination.jsx";
import Recommed from "./Recommed/Recommed.jsx";
import {
    useGetAllCountriesQuery,
    useGetAllToursQuery,
    useGetFilterToursQuery,
} from "../../../services/adminApi.jsx";
import TourCard from "../../../components/UserComponents/TourCard/index.jsx";
import banner from "/src/assets/ToursBannerRed.png";

// İki ayrı DatePicker istifadə olunur
import { DatePicker } from 'antd';
import dayjs from 'dayjs';

import "./tours.scss";
import ScrollToTop from "../../../components/ScrollToTop/index.jsx";
import NotResult from "../Not Result/index.jsx";
import { BeatLoader, CircleLoader } from "react-spinners";
import AOS from "aos";
import "aos/dist/aos.css";

function Tours() {
    const { t, i18n } = useTranslation();
    const language = i18n.language;
    const location = useLocation();
    const currentPath = location.pathname;
    const isOutgoing = currentPath.toLowerCase().includes("outgoing");

    // Əgər axtarış nəticələri navigate vasitəsilə ötürülübsə, onu alırıq
    const searchResults = location.state?.searchResults;

    // Bütün turlar və ölkələr
    const { data: getAllTours } = useGetAllToursQuery();
    const tours = getAllTours?.data;
    const { data: getAllCountries } = useGetAllCountriesQuery();
    const countries = getAllCountries?.data;

    // Seçilmiş ölkələr və şəhərlər üçün state-lər
    const [selectedCountries, setSelectedCountries] = useState([]);
    const [selectedCities, setSelectedCities] = useState([]);

    // Start və end tarixlər üçün ayrı state-lər
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    // Axtarış üçün parametrləri saxlayan state
    const [searchParams, setSearchParams] = useState(null);

    // Serverdən gələn axtarış nəticələri; searchParams yoxdursa sorğu atılmır
    const { data: getFilterTours } = useGetFilterToursQuery(
        searchParams ?? {},
        { skip: !searchParams }
    );

    // Sort üçün state: default olaraq A-Z sıralama
    const [sortOrder, setSortOrder] = useState('A-Z');

    // Loading state: axtar düyməsinə kliklədikdə istifadə olunacaq
    const [loading, setLoading] = useState(false);

    // Axtar düyməsinə kliklədikdə parametrləri yeniləyirik
    const handleSearch = () => {
        setLoading(true);
        // 1.5 saniyə sonra axtarış parametrlərini yeniləyirik
        setTimeout(() => {
            setSearchParams({
                countryIds: selectedCountries,
                cityIds: selectedCities,
                startDate,
                endDate,
            });
        }, 1500);
        // 1.5 saniyə sonra loading-i bitiririk
        setTimeout(() => {
            setLoading(false);
        }, 1500);
    };

    // Lokalizasiya funksiyaları
    const getCountryName = (country) => {
        if (language === "en" && country.nameEng) return country.nameEng;
        if (language === "ru" && country.nameRu) return country.nameRu;
        return country.name;
    };

    const getCityName = (city) => {
        if (language === "en" && city.nameEng) return city.nameEng;
        if (language === "ru" && city.nameRu) return city.nameRu;
        return city.name;
    };

    // ———————————— Seçilmiş dəyərləri düymədə göstərməyəcəyik ————————————

    let cityList = [];
    if (selectedCountries.length > 0 && countries) {
        cityList = countries.flatMap(c =>
            selectedCountries.includes(c.id) ? (c.cities || []) : []
        );
    } else if (countries) {
        cityList = countries.flatMap(c => c.cities || []);
    }

    // Lokal olaraq filtr edilmiş turlar (cari səhifə növünə görə)
    const filteredTours = tours?.filter(tour => {
        if (isOutgoing) {
            return tour.tourType === "outgoing";
        } else {
            return tour.tourType === "incomming";
        }
    }) || [];

    // Əgər navigate vasitəsilə ötürülmüş axtarış nəticəsi varsa, onu üstün tutur, yoxsa lokal data istifadə olunur
    const toursToDisplay = searchResults && searchResults.length > 0 ? searchResults : filteredTours;

    // Sıralama: toursToDisplay üzərində sortOrder state-ə görə sıralayırıq
    const sortedTours = [...toursToDisplay];
    if (sortOrder === 'A-Z') {
        sortedTours.sort((a, b) => a.title?.localeCompare(b.title));
    } else if (sortOrder === 'Z-A') {
        sortedTours.sort((a, b) => b.title?.localeCompare(a.title));
    }

    // Pagination (yalnız lokal data üçün; əgər axtarış nəticəsi varsa, pagination olmaya bilər)
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 6;
    const indexOfLastTour = currentPage * postsPerPage;
    const indexOfFirstTour = indexOfLastTour - postsPerPage;
    const currentTours = sortedTours.slice(indexOfFirstTour, indexOfLastTour);

    // Tövsiyə olunan data: cari səhifə növünə görə əks tip turlar
    const recommendedTours = tours?.filter(tour =>
        isOutgoing ? tour.tourType === "incomming" : tour.tourType === "outgoing"
    ) || [];

    // Əgər route "/tours" (yəni isOutgoing false) isə avtomatik Azərbaycan seçilsin
    useEffect(() => {
        if (!isOutgoing && countries) {
            const azerbaijan = countries.find(c => getCountryName(c).toLowerCase().includes("az"));
            if (azerbaijan && !selectedCountries.includes(azerbaijan.id)) {
                setSelectedCountries([azerbaijan.id]);
            }
        }
    }, [countries, isOutgoing, selectedCountries, getCountryName]);

    // Ölkə seçimi funksiyası (Azərbaycan seçimi disabled olacaq)
    const handleCountrySelect = (country) => {
        if (!isOutgoing && getCountryName(country).toLowerCase().includes("az")) {
            return;
        }
        if (selectedCountries.includes(country.id)) {
            setSelectedCountries(selectedCountries.filter(id => id !== country.id));
            setSelectedCities(selectedCities.filter(cityId => {
                const countryObj = countries.find(c => c.id === country.id);
                return countryObj?.cities.every(city => city.id !== cityId);
            }));
        } else {
            setSelectedCountries([...selectedCountries, country.id]);
        }
    };

    // Şəhər seçimi funksiyası
    const handleCitySelect = (city, countryId) => {
        if (selectedCities.includes(city.id)) {
            setSelectedCities(selectedCities.filter(id => id !== city.id));
        } else {
            setSelectedCities([...selectedCities, city.id]);
            if (!selectedCountries.includes(countryId)) {
                setSelectedCountries([...selectedCountries, countryId]);
            }
        }
    };

    // İki ayrıca DatePicker üçün onChange funksiyaları
    const handleStartDateChange = (date) => {
        setStartDate(date ? dayjs(date).format("DD.MM.YYYY") : "");
    };

    const handleEndDateChange = (date) => {
        setEndDate(date ? dayjs(date).format("DD.MM.YYYY") : "");
    };

    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);

    return (
        <div className="tours" data-aos="fade-up">
            <ScrollToTop />
            <div className="container" data-aos="fade-in">
                <div className="head" data-aos="fade-right">
                    <p>
                        {t("tours.breadcrumb", "Ana səhifə / Turlar /")}{" "}
                        <span>
                            {isOutgoing
                                ? t("tours.pageTitleOutgoing", "Ölkədən xaric turlar")
                                : t("tours.pageTitle", "Ölkədaxili turlar")}
                        </span>
                    </p>
                </div>
                <div className="search row gy-3" data-aos="zoom-in">
                    {/* Ölkə Dropdown */}
                    <div className="col-lg-3 col-md-6 col-sm-6 col-6 m-0">
                        <div className="search-bar">
                            <div className="servis-content">
                                <h5>{t("tours.countryLabel", "Ölkə")}</h5>
                                <div className="btn-group">
                                    <button
                                        className="btn dropdown-toggle p-0"
                                        style={{
                                            color: "grey",
                                            cursor: !isOutgoing ? "not-allowed" : "pointer",
                                            opacity: !isOutgoing ? 0.6 : 1,
                                        }}
                                        type="button"
                                        data-bs-toggle={isOutgoing ? "dropdown" : ""}
                                        aria-expanded="false"
                                        disabled={!isOutgoing}
                                    >
                                        {t("tours.selectCountry", "Ölkə seç")}
                                    </button>
                                    {isOutgoing && (
                                        <ul className="dropdown-menu">
                                            {countries &&
                                                countries.map((country) => (
                                                    <li key={country.id}>
                                                        <button
                                                            className="dropdown-item"
                                                            onClick={() => handleCountrySelect(country)}
                                                        >
                                                            {getCountryName(country)}{" "}
                                                            {selectedCountries.includes(country.id) && "✓"}
                                                        </button>
                                                    </li>
                                                ))}
                                        </ul>
                                    )}
                                </div>
                            </div>
                            <div className="searchIcon">
                                <img src={countryIcon} alt="city" />
                            </div>
                        </div>
                    </div>

                    {/* Şəhər Dropdown */}
                    <div className="col-lg-3 col-md-6 col-sm-6 col-6 m-0">
                        <div className="search-bar">
                            <div className="servis-content">
                                <h5>{t("tours.cityLabel", "Şəhər")}</h5>
                                <div className="btn-group">
                                    <button
                                        className="btn dropdown-toggle p-0"
                                        style={{ color: "grey" }}
                                        type="button"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        {t("tours.selectCity", "Şəhər seç")}
                                    </button>
                                    <ul className="dropdown-menu">
                                        {cityList &&
                                            cityList.map((city) => (
                                                <li key={city.id}>
                                                    <button
                                                        className="dropdown-item"
                                                        onClick={() => handleCitySelect(city, city.countryId)}
                                                    >
                                                        {getCityName(city)}{" "}
                                                        {selectedCities.includes(city.id) && "✓"}
                                                    </button>
                                                </li>
                                            ))}
                                    </ul>
                                </div>
                            </div>
                            <div className="searchIcon">
                                <img src={cityIcon} alt="city" />
                            </div>
                        </div>
                    </div>

                    {/* Tarixlər üçün iki ayrıca DatePicker */}
                    <div className="col-lg-5 col-md-6 col-sm-12 m-0">
                        <div className="row">
                            <div className="col-6">
                                <div className="search-bar">
                                    <DatePicker
                                        className="custom-date-picker"
                                        format="DD.MM.YYYY"
                                        value={startDate ? dayjs(startDate, "DD.MM.YYYY") : null}
                                        onChange={handleStartDateChange}
                                        placeholder={t("tours.startDate", "Başlama tarixi")}
                                    />
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="search-bar">
                                    <DatePicker
                                        className="custom-date-picker"
                                        format="DD.MM.YYYY"
                                        value={endDate ? dayjs(endDate, "DD.MM.YYYY") : null}
                                        onChange={handleEndDateChange}
                                        placeholder={t("tours.endDate", "Bitmə tarixi")}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Axtar düyməsi */}
                    <div className="col-lg-1 m-0">
                        <button
                            className="searchButton d-none d-md-block"
                            onClick={handleSearch}
                            disabled={loading}
                            data-aos="flip-up"
                        >
                            {loading ? (
                                <CircleLoader
                                    color="#ffffff"
                                    loading
                                    size={50}
                                    className={"icon"}
                                />
                            ) : (
                                <CiSearch className={'icon'} />
                            )}
                        </button>
                        <button
                            className="searchButton d-block d-md-none"
                            onClick={handleSearch}
                            disabled={loading}
                            data-aos="flip-up"
                        >
                            {loading ? (
                                <BeatLoader
                                    color="#fff"
                                    size={15}
                                    style={{ marginTop: "5px" }}
                                />
                            ) : (
                                t("tours.search", "Axtar")
                            )}
                        </button>
                    </div>
                </div>

                {/* Kartların göstərilməsi */}
                <div className="tour-cards" data-aos="fade-up">
                    <div className="card-head" data-aos="fade-right">
                        <h2>
                            {isOutgoing
                                ? t("tours.pageTitleOutgoing", "Ölkədən xaric turlar")
                                : t("tours.tourTitle", "Ölkədaxili turlar")}
                        </h2>
                        <div className="dropdown">
                            <button
                                className="btn dropdown-toggle"
                                style={{
                                    padding: "15px 40px",
                                    boxShadow: "1px 1px 16px 0px #5A5A5A1C",
                                    borderRadius: "12px",
                                }}
                                type="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                                data-aos="zoom-in"
                            >
                                {t("tours.sort", "Sırala")}
                            </button>
                            <ul className="dropdown-menu">
                                <li>
                                    <button className="dropdown-item" onClick={() => setSortOrder('A-Z')}>
                                        A-z
                                    </button>
                                </li>
                                <li>
                                    <button className="dropdown-item" onClick={() => setSortOrder('Z-A')}>
                                        Z-a
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="row gy-2" style={{ marginBottom: "80px" }} data-aos="fade-up">
                        {searchParams ? (
                            getFilterTours && getFilterTours.data && getFilterTours.data.length > 0 ? (
                                getFilterTours.data.map((tour, index) => (
                                    <TourCard key={index} tour={tour} />
                                ))
                            ) : (
                                <NotResult />
                            )
                        ) : (
                            currentTours.map((tour, index) => (
                                <TourCard key={index} tour={tour} />
                            ))
                        )}
                    </div>

                    <div className="d-none d-md-block" data-aos="fade-up">
                        <Pagination
                            currentPage={currentPage}
                            totalPosts={filteredTours.length}
                            postsPerPage={postsPerPage}
                            onPageChange={(page) => setCurrentPage(page)}
                        />
                    </div>
                    <div className="d-block d-md-none text-center" data-aos="fade-up">
                        <button
                            className="btn"
                            style={{
                                height: "63px",
                                gap: "8px",
                                padding: "18px 47.5px",
                                borderRadius: "52px",
                                border: "1px solid #000000",
                                background: "inherit",
                                fontWeight: "500",
                                fontSize: "18px",
                                lineHeight: "100%",
                            }}
                        >
                            {t("tours.viewMore", "Ətraflı bax")}
                        </button>
                    </div>
                </div>
            </div>
            <Recommed
                type={isOutgoing ? "incomming" : "outgoing"}
                recommendedTours={recommendedTours.slice(0, 4)}
                data-aos="fade-up"
            />
            <img src={banner} alt="tours" className="banner-image-tour" data-aos="zoom-in" />
        </div>
    );
}

export default Tours;
