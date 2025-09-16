import Header from "../components/dashBoardHeader";
import Body from "../components/dashBoardBody";
import Footer from "../components/footer";
import "../styles/dashStyle.css";

export default function CarbonDashBoard() {
    return (
        <div className="dashContainer">
            <Header />
            <Body />
            <Footer />
        </div>
    );
}
