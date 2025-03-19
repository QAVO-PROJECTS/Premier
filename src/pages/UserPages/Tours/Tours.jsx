import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { CiSearch } from 'react-icons/ci';

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

import "./tours.scss";

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

    // Tarixlər üçün state-lər
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    // Axtarış üçün parametrləri saxlayan state
    const [searchParams, setSearchParams] = useState(null);

    // Serverdən gələn axtarış nəticələri; searchParams yoxdursa sorğu atılmır
    const { data: getFilterTours, error, isLoading } = useGetFilterToursQuery(
        searchParams ?? {},
        { skip: !searchParams }
    );
    console.log(searchParams)
    // Sort üçün state: default olaraq A-Z sıralama
    const [sortOrder, setSortOrder] = useState('A-Z');

    // Axtarış düyməsinə kliklədikdə parametrləri yeniləyirik
    const handleSearch = () => {
        setSearchParams({
            countryIds: selectedCountries,
            cityIds: selectedCities,
            startDate,
            endDate,
        });
    };

    // Ölkə seçimi funksiyası
    const handleCountrySelect = (country) => {
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

    const selectedCountryNames = countries
        ? countries
            .filter(c => selectedCountries.includes(c.id))
            .map(c => getCountryName(c))
            .join(", ")
        : "";

    let cityList = [];
    if (selectedCountries.length > 0) {
        cityList = countries.flatMap(c =>
            selectedCountries.includes(c.id) ? (c.cities || []) : []
        );
    } else if (countries) {
        cityList = countries.flatMap(c => c.cities || []);
    }
    const selectedCityNames = cityList
        .filter(city => selectedCities.includes(city.id))
        .map(city => getCityName(city))
        .join(", ");

    // Local olaraq filtr edilmiş turlar (cari səhifə növünə görə)
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

    return (
        <div className="tours">
            <div className="container">
                <div className="head">
                    <p>
                        {t("tours.breadcrumb", "Ana səhifə / Turlar /")}{" "}
                        <span>
                            {isOutgoing
                                ? t("tours.pageTitleOutgoing", "Ölkədən xaric turlar")
                                : t("tours.pageTitle", "Ölkədaxili turlar")
                            }
                        </span>
                    </p>
                </div>
                <div className="search row gy-3">
                    {/* Ölkə Dropdown */}
                    <div className="col-lg-3 col-md-6 col-sm-6 m-0">
                        <div className="search-bar">
                            <div className="searchIcon">
                                <img src={cityIcon} alt="city" />
                            </div>
                            <div className="servis-content">
                                <h5>{t("tours.countryLabel", "Ölkə")}</h5>
                                <div className="btn-group">
                                    <button
                                        className="btn dropdown-toggle p-0"
                                        style={{ color: "grey" }}
                                        type="button"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        {selectedCountries.length > 0
                                            ? selectedCountryNames
                                            : t("tours.selectCountry", "Ölkə seç")}
                                    </button>
                                    <ul className="dropdown-menu">
                                        {countries && countries.map((country) => (
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
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Şəhər Dropdown */}
                    <div className="col-lg-2 col-md-6 col-sm-6 m-0">
                        <div className="search-bar">
                            <div className="searchIcon">
                                <img src={cityIcon} alt="city" />
                            </div>
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
                                        {selectedCities.length > 0
                                            ? selectedCityNames
                                            : t("tours.selectCity", "Şəhər seç")}
                                    </button>
                                    <ul className="dropdown-menu">
                                        {cityList && cityList.map((city) => (
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
                        </div>
                    </div>

                    {/* Tarixlər */}
                    <div className="col-lg-3 col-md-6 col-sm-6 m-0">
                        <div className="search-bar">
                            <div className="servis-content">
                                <input
                                    type="date"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    placeholder={t("tours.startDatePlaceholder", "Başlanğıc")}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-6 m-0">
                        <div className="search-bar">
                            <div className="servis-content">
                                <input
                                    type="date"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    placeholder={t("tours.endDatePlaceholder", "Son")}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Axtar düyməsi */}
                    <div className="col-lg-1 m-0">
                        <button className="searchButton d-none d-md-block" onClick={handleSearch}>
                            <CiSearch />
                        </button>
                        <button className="searchButton d-block d-md-none" onClick={handleSearch}>
                            Axtar
                        </button>
                    </div>
                </div>

                {/* Kartların göstərilməsi */}
                <div className="tour-cards">
                    <div className="card-head">
                        <h2>
                            {isOutgoing
                                ? t("tours.pageTitleOutgoing", "Ölkədən xaric turlar")
                                : t("tours.tourTitle", "Ölkədaxili turlar")}
                        </h2>
                        <div className="dropdown">
                            <button
                                className="btn dropdown-toggle"
                                style={{
                                    padding: "20px 50px",
                                    boxShadow: "1px 1px 16px 0px #5A5A5A1C",
                                    borderRadius: "12px",
                                }}
                                type="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
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

                    <div className="row gy-4" style={{ marginBottom: "80px" }}>
                        {/* Əgər axtarış nəticəsi varsa, yalnız o nəticələri göstəririk */}
                        {getFilterTours && getFilterTours.data && getFilterTours.data.length > 0 ? (
                            getFilterTours.data.map((tour, index) => (
                                <TourCard key={index} tour={tour} />
                            ))
                        ) : (
                            // Axtarış nəticəsi yoxdursa, local filter olunmuş kartları göstəririk
                            currentTours.map((tour, index) => (
                                <TourCard key={index} tour={tour} />
                            ))
                        )}
                    </div>

                    <div className="d-none d-md-block">
                        <Pagination
                            currentPage={currentPage}
                            totalPosts={filteredTours.length}
                            postsPerPage={postsPerPage}
                            onPageChange={(page) => setCurrentPage(page)}
                        />
                    </div>
                    <div className="d-block d-md-none text-center">
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
            {/* Əgər location "outgoing"dirsə, Recommed komponentinə type olaraq "incomming", əks halda "outgoing" veririk və tövsiyə olunan data kimi recommendedTours-un ilk 4 elementini ötürürük */}
            <Recommed
                type={isOutgoing ? "incomming" : "outgoing"}
                recommendedTours={recommendedTours.slice(0, 4)}
            />
            <img src={banner} alt="tours" className="banner-image-tour" />
        </div>
    );
}

export default Tours;
