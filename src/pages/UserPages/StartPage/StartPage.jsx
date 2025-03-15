import "./StartPage.scss";
import {ThreeDots} from "react-loader-spinner";
import logo from "/src/assets/Logo Esas.png"

const StartPage = () => {
    return (
        <div className="start-page-container">
            <img src={logo} alt={"Logo"} />
            <div className="start-page-spinner">
                <ThreeDots
                    visible={true}
                    height="80"
                    width="80"
                    color="#0D60FE"
                    radius="5"
                    ariaLabel="three-dots-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                />

            </div>
        </div>
    );
};

export default StartPage;
