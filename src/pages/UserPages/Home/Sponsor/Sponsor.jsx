import React, {useState} from "react";
import "./sponsor.scss";

import sponsor1 from "../../../../assets/sponsor Image/Air_Arabia-Logo.wine 1.png";
import sponsor2 from "../../../../assets/sponsor Image/Air_Astana-Logo.wine 1.png";
import sponsor3 from "../../../../assets/sponsor Image/Air_France-Logo.wine 1.png";
import sponsor4 from "../../../../assets/sponsor Image/AJet_logo.svg 1.png";
import sponsor5 from "../../../../assets/sponsor Image/Austrian_Airlines\'_logo_(2018) 1.png";
import sponsor6 from "../../../../assets/sponsor Image/Azerbaijan_Airlines-Logo.wine 1.png";
import sponsor7 from "../../../../assets/sponsor Image/British_Airways-Logo.wine 1.png";
import sponsor8 from "../../../../assets/sponsor Image/czech-airlines-thumb 1.png";
import sponsor9 from "../../../../assets/sponsor Image/Emirates_(airline)-Logo.wine 1.png";
import sponsor10 from "../../../../assets/sponsor Image/Flydubai-Logo.wine 1.png";
import sponsor11 from "../../../../assets/sponsor Image/IndiGo-Logo.wine 1.png";
import sponsor12 from "../../../../assets/sponsor Image/Lufthansa-Logo 1.png";
import sponsor13 from "../../../../assets/sponsor Image/Pegasus_Airlines-Logo.wine 1.png";
import sponsor14 from "../../../../assets/sponsor Image/Qatar_Airways-Logo.wine 1.png";
import sponsor15 from "../../../../assets/sponsor Image/Turkish_Airlines_logo_2019_compact.svg 1.png";
import sponsor17 from "../../../../assets/sponsor Image/Vueling-Logo.wine 1.png";
import sponsor18 from "../../../../assets/sponsor Image/Wizz_Air-Logowine 1.png";

// Tekrar edilmesini istediğiniz temel sponsor dizisi
const sponsorImages = [
    sponsor1, sponsor2, sponsor3, sponsor4, sponsor5, sponsor6,
    sponsor7, sponsor8, sponsor9, sponsor10, sponsor11, sponsor12,
    sponsor13, sponsor14, sponsor15, sponsor17, sponsor18,
];


// sponsorImages dizisini belirlediğiniz sayıda tekrarlayın

function Sponsor() {


    const [brands] = useState(() => {
        const repeatedBrands = [];
        for (let i = 0; i < 100; i++) {
            repeatedBrands.push(...sponsorImages);
        }
        return repeatedBrands;
    });

    return (
        <section id="logoScroll" data-aos="fade-up">
            <div className="wrapper left">
                {brands.map((brand, index) => (
                    <div className="box" key={index}>
                        <img src={brand} alt="Logo" />
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Sponsor;
