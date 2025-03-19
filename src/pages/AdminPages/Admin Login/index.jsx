import React, { useState } from 'react';
import Cookies from 'js-cookie';
import './index.scss';
import logo from '../../../assets/LogoEsasRed.png';
import banner from '../../../assets/LoginBannerRed.png';
import plane from '../../../assets/BannerPlaneRed.png';
import { usePostAdminLoginMutation } from '../../../services/adminApi.jsx';
import {useNavigate} from "react-router-dom";
import showToast from "../../../components/ToastMessage.js";

function AdminLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [postAdminLogin] = usePostAdminLoginMutation();
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await postAdminLogin({ email, password }).unwrap();
            showToast("Giriş uğurlu oldu !","success")
            setTimeout(navigate("/admin/blog"), 2000);
            if (response.data && response.data.token) {
                const token = response.data.token;
                const expireDate = new Date(response.data.expireDate);
                Cookies.set('premierTourToken', token, {
                    expires: expireDate,
                    secure: true,
                    sameSite: 'strict'
                });
            } else {
                Cookies.set('premierTourToken', 'null');
            }
        } catch  {
            showToast('Giriş zamanı xəta baş verdi:', "error");
        }
    };

    return (
        <div className="login-panel">
            <div className="login-logo">
                <img src={logo} alt="logo" />
            </div>

            <div className="login-form">
                <div className="title">
                    <h1>Daxil ol</h1>
                    <p>Admin panelə giriş</p>
                </div>

                <form className="form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            placeholder="Emailinizi daxil edin"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Şifrə</label>
                        <input
                            type="password"
                            placeholder="Şifrənizi daxil edin"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit">Daxil ol</button>
                </form>
            </div>
            <img src={banner} alt="" className="login-banner" />
            <img src={plane} alt="" className="login-plane" />
        </div>
    );
}

export default AdminLogin;
