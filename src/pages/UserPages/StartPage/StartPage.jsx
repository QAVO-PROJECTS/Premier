import "./StartPage.scss";
import {ThreeDots} from "react-loader-spinner";
import logo from "/src/assets/LogoEsasRed.png"

const StartPage = () => {
    return (
        <div className="start-page-container">
            <img src={logo} alt={"Logo"} />
            <div className="start-page-spinner">
                <ThreeDots
                    visible={true}
                    height="80"
                    width="80"
                    color="#D80027"
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
