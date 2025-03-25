import main from '../../../assets/npResult.png'
import "./index.scss"
function NotResult() {
    return (
        <div className={"notResult"}>
            <div className={"result"} >
                <div  className={"notResultImage"} >
                    <img src={main} alt="Not Result" />
                </div>
                <h2>Hmm… nothing here!</h2>
                <p>Try searching for something else or explore other sections.</p>
            </div>
        </div>
    );
}

export default NotResult;