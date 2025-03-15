import "./index.scss";
import {IoCloseOutline} from "react-icons/io5";

function ReserveModal({ open, setOpen }) {
    if (!open) return null; // ReserveModal açıq deyilsə heç nə göstərilmir

    return (
        <div className="modal-overlay" onClick={() => setOpen(false)}>
            <div className="reserveModal" onClick={(e) => e.stopPropagation()}>
                <div className="form">
                    <h2>Formanı dolduraraq rezervasiya edin</h2>
                    <form>
                        <div className="row">
                            <div className="col-6">
                                <label>Adınız</label>
                                <input type="text" placeholder="Ad" required />
                            </div>
                            <div className="col-6">
                                <label>Soyadınız</label>
                                <input type="text" placeholder="Soyad" required />
                            </div>
                            <div className="col-12">
                                <label>Email</label>
                                <input type="email" placeholder="premiertour@gmail.com" required />
                            </div>
                            <div className="col-12">
                                <label>Telefon Nömrəsi</label>
                                <input type="text" placeholder="+994 55 852 33 99" required />
                            </div>
                            <div className="col-12">
                                <label>Qeyd</label>
                                <textarea rows="5" required></textarea>
                            </div>
                        </div>
                        <button type="submit">Rezervasiya et</button>
                        <IoCloseOutline onClick={() => setOpen(false)} className={"close-modal"}/>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ReserveModal;
