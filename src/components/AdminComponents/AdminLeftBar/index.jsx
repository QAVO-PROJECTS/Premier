import './index.scss'
import logo from "../../../assets/Logo Esas.png"
import { NavLink, useLocation } from "react-router-dom";
import { TbLogs } from "react-icons/tb";
import { FaRegCommentDots } from "react-icons/fa";
import { MdOutlineAccountBalance, MdOutlineTour } from "react-icons/md";
import { PiCityLight } from "react-icons/pi";

function AdminLeftBar() {
    const location = useLocation();

    return (
        <section id="adminLeftBar">
            <img src={logo} alt="logo" />
            <li className={location.pathname === "/admin/blog" ? "selected" : ""}>
                <TbLogs className="icon" />
                <NavLink to="/admin/blog">
                    Bloq
                </NavLink>
            </li>
            <li className={location.pathname === "/admin/cities" ? "selected" : ""}>
                <PiCityLight className="icon" />
                <NavLink to="/admin/cities">
                    Şəhərlər
                </NavLink>
            </li>
            <li className={location.pathname === "/admin/countries" ? "selected" : ""}>
                <MdOutlineAccountBalance className="icon" />
                <NavLink to="/admin/countries">
                    Ölkələr
                </NavLink>
            </li>
            <li className={location.pathname === "/admin/customersViews" ? "selected" : ""}>
                <FaRegCommentDots className="icon" />
                <NavLink to="/admin/customersViews">
                    İstifadəçi Rəyləri
                </NavLink>
            </li>
            <li className={location.pathname === "/admin/tours" ? "selected" : ""}>
                <MdOutlineTour className="icon" />
                <NavLink to="/admin/tours">
                    Turlar
                </NavLink>
            </li>
        </section>
    );
}

export default AdminLeftBar;
