import React, { useState } from 'react';
import './tours.scss';
import cityIcon from "../../../assets/fluent_city-20-regular.png";
import Pagination from "../../../components/UserComponents/Pagination/Pagination.jsx";
import Recommed from "./Recommed/Recommed.jsx";
import { useGetAllCountriesQuery, useGetAllToursQuery } from "../../../services/adminApi.jsx";
import TourCard from "../../../components/UserComponents/TourCard/index.jsx";
import { useTranslation } from 'react-i18next';

function Tours() {
    const { t } = useTranslation();
    const { data: getAllTours } = useGetAllToursQuery();
    const tours = getAllTours?.data;
    const { data: getAllCountries } = useGetAllCountriesQuery();
    const countries = getAllCountries?.data;
    console.log(countries);

    // Seçilmiş ölkələr və şəhərlər üçün state-lər (massiv kimi)
    const [selectedCountries, setSelectedCountries] = useState([]); // ölkələrin id-ləri
    const [selectedCities, setSelectedCities] = useState([]); // şəhərlərin id-ləri

    // Ölkə seçimini toggle edən funksiya
    const handleCountrySelect = (country) => {
        if (selectedCountries.includes(country.id)) {
            // Əgər artıq seçilibsə, onu sil və həmin ölkəyə aid şəhərləri də çıxarırıq
            setSelectedCountries(selectedCountries.filter(id => id !== country.id));
            setSelectedCities(selectedCities.filter(cityId => {
                const countryObj = countries.find(c => c.id === country.id);
                return countryObj?.cities.every(city => city.id !== cityId);
            }));
        } else {
            // Seçimə əlavə edirik
            setSelectedCountries([...selectedCountries, country.id]);
        }
    };

    // Şəhər seçimini toggle edən funksiya; eyni zamanda aid olduğu ölkəni də seçir
    const handleCitySelect = (city, countryId) => {
        if (selectedCities.includes(city.id)) {
            setSelectedCities(selectedCities.filter(id => id !== city.id));
        } else {
            setSelectedCities([...selectedCities, city.id]);
            // Əgər şəhərin aid olduğu ölkə seçilməyibsə, onu da əlavə edirik
            if (!selectedCountries.includes(countryId)) {
                setSelectedCountries([...selectedCountries, countryId]);
            }
        }
    };

    // Seçilmiş ölkələrin adlarını birləşdirib göstərmək üçün
    const selectedCountryNames = countries
        ? countries
            .filter(c => selectedCountries.includes(c.id))
            .map(c => c.name)
            .join(", ")
        : "";

    // Şəhər siyahısını hesablamaq: əgər ölkə seçilibsə, yalnız həmin ölkələrin şəhərləri;
    // seçilməyibsə, bütün ölkələrin şəhərləri
    let cityList = [];
    if (selectedCountries.length > 0) {
        cityList = countries.flatMap(c => {
            return selectedCountries.includes(c.id) ? (c.cities || []) : [];
        });
    } else if (countries) {
        cityList = countries.flatMap(c => c.cities || []);
    }

    // Seçilmiş şəhərlərin adlarını birləşdiririk
    const selectedCityNames = cityList
        .filter(city => selectedCities.includes(city.id))
        .map(city => city.name)
        .join(", ");

    return (
        <div className="tours">
            <div className="container">
                <div className="head">
                    <p>
                        {t("tours.breadcrumb", "Ana səhifə / Turlar /")}{" "}
                        <span>{t("tours.pageTitle", "Ölkədaxili turlar")}</span>
                    </p>
                </div>
                <div className="search row gy-3">
                    {/* Ölkə Dropdown */}
                    <div className="col-lg-3 col-md-6 col-sm-6">
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
                                        {selectedCountries.length > 0 ? selectedCountryNames : t("tours.selectCountry", "Ölkə seç")}
                                    </button>
                                    <ul className="dropdown-menu">
                                        {countries &&
                                            countries.map((country) => (
                                                <li key={country.id}>
                                                    <button
                                                        className="dropdown-item"
                                                        onClick={() => handleCountrySelect(country)}
                                                    >
                                                        {country.name} {selectedCountries.includes(country.id) && "✓"}
                                                    </button>
                                                </li>
                                            ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Şəhər Dropdown */}
                    <div className="col-lg-3 col-md-6 col-sm-6">
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
                                        {selectedCities.length > 0 ? selectedCityNames : t("tours.selectCity", "Şəhər seç")}
                                    </button>
                                    <ul className="dropdown-menu">
                                        {cityList &&
                                            cityList.map((city) => (
                                                <li key={city.id}>
                                                    <button
                                                        className="dropdown-item"
                                                        onClick={() => handleCitySelect(city, city.countryId)}
                                                    >
                                                        {city.name} {selectedCities.includes(city.id) && "✓"}
                                                    </button>
                                                </li>
                                            ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Tarix seçimi */}
                    <div className="col-lg-3 col-md-6 col-sm-6">
                        <div className="search-bar">
                            <div className="servis-content">
                                <input type="date" placeholder={t("tours.startDatePlaceholder", "Başlanğıc")} />
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-6">
                        <div className="search-bar">
                            <div className="servis-content">
                                <input type="date" placeholder={t("tours.endDatePlaceholder", "Son")} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="tour-cards">
                    <div className="card-head">
                        <h2>{t("tours.tourTitle", "Ölkədaxili turlar")}</h2>
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
                                    <a className="dropdown-item" href="#">
                                        A-z
                                    </a>
                                </li>
                                <li>
                                    <a className="dropdown-item" href="#">
                                        Z-a
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="row gy-4" style={{ marginBottom: "80px" }}>
                        {tours && tours.map((tour, index) => <TourCard key={index} tour={tour} />)}
                    </div>
                    {/* MD və daha böyük ekranlarda pagination */}
                    <div className="d-none d-md-block">
                        <Pagination />
                    </div>
                    {/* SM və daha aşağı ekranlarda "Ətraflı bax" düyməsi */}
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
            <Recommed />
            <img src={tours} alt="tours" className="banner-image-tour" />
        </div>
    );
}

export default Tours;
