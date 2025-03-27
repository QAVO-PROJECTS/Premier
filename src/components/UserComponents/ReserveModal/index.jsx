import React, { useState } from "react";
import "./index.scss";
import { IoCloseOutline } from "react-icons/io5";
import { usePostReserveMutation } from "../../../services/adminApi.jsx";
import { useTranslation } from "react-i18next";
import showToast from "../../ToastMessage.js";
import {RiseLoader} from "react-spinners";

function ReserveModal({ open, setOpen, tour }) {
    if (!open) return null;
    const tourId = tour?.id;
    console.log(tourId);

    const [formData, setFormData] = useState({
        name: "",
        surname: "",
        email: "",
        phoneNumber: "",
        note: "",
    });

    const [loading, setLoading] = useState(false);
    const [postReserve] = usePostReserveMutation();
    const { t } = useTranslation();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const dataToSend = {
            ...formData,
            tourId,
        };

        setLoading(true);

        // API çağırmasını 1.5 saniyə gecikdiririk
        setTimeout(async () => {
            try {
                await postReserve(dataToSend).unwrap();
                showToast("Uğurlu rezervasiya!", "success");
                setOpen(false);
            } catch (error) {
                showToast(error?.data?.error, "error");
            }
        }, 1500);

        // 1 saniyə sonra loading-i bitiririk
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    };

    return (
        <div className="modal-overlay" onClick={() => setOpen(false)}>
            <div className="reserveModal" onClick={(e) => e.stopPropagation()}>
                <div className="form">
                    <h2>{t("reserveModal.formTitle", "Formanı dolduraraq rezervasiya edin")}</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-lg-6">
                                <label>{t("reserveModal.nameLabel", "Adınız")}</label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder={t("reserveModal.namePlaceholder", "Ad")}
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="col-lg-6">
                                <label>{t("reserveModal.surnameLabel", "Soyadınız")}</label>
                                <input
                                    type="text"
                                    name="surname"
                                    placeholder={t("reserveModal.surnamePlaceholder", "Soyad")}
                                    required
                                    value={formData.surname}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="col-12">
                                <label>{t("reserveModal.emailLabel", "Email")}</label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder={t("reserveModal.emailPlaceholder", "premiertour@gmail.com")}
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="col-12">
                                <label>{t("reserveModal.phoneLabel", "Telefon Nömrəsi")}</label>
                                <input
                                    type="text"
                                    name="phoneNumber"
                                    placeholder={t("reserveModal.phonePlaceholder", "+994 55 852 33 99")}
                                    required
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="col-12">
                                <label>{t("reserveModal.noteLabel", "Qeyd")}</label>
                                <textarea
                                    name="note"
                                    rows="5"
                                    required
                                    value={formData.note}
                                    onChange={handleChange}
                                ></textarea>
                            </div>
                        </div>
                        <button type="submit" disabled={loading}>
                            {loading ? (
                                <RiseLoader
                                    color="#fff"
                                    size={15}
                                    speedMultiplier={1}
                                />
                            ): t("reserveModal.submitButton", "Rezervasiya et")}
                        </button>
                        <IoCloseOutline onClick={() => setOpen(false)} className="close-modal" />
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ReserveModal;
