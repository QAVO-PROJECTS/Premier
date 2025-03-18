import React from 'react';
import "./oldBlog.scss";
import Index from "../../../../components/UserComponents/HorizontalBlogCard/index.jsx";
import { useTranslation } from 'react-i18next';

function OldBlog() {
    const { t } = useTranslation();

    return (
        <div className={"oldBlog"}>
            <div className={"container"}>
                <div className={"title"}>
                    <div></div>
                    <h2>{t("oldBlog.title", "Öncəki bloqlar")}</h2>
                </div>
                <div className={"row"}>
                    <div className={'col-lg-7'}>
                        <div className={"image"}>
                            <div className={"text"}>
                                <div className={"date"}>
                                    {t("oldBlog.mainDate", "12.02.2025")}
                                </div>
                                <h2>{t("oldBlog.mainTitle", "Dünyanın ən yaxşı hava limanları – Harada rahat gözləmək olar?")}</h2>
                                <p>
                                    {t(
                                        "oldBlog.mainContent",
                                        "Səyahət edərkən hava limanında vaxt keçirmək bəzən yorucu ola bilər, amma bəzi hava limanları sərnişinlər üçün rahat və lüks şərait yaradır."
                                    )}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-5 d-none d-lg-block">
                        <div className={"blogs"}>
                            <div className={"cards"}>
                                <Index />
                                <Index />
                                <Index />
                                <Index />
                                <Index />
                                <Index />
                                <Index />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OldBlog;
