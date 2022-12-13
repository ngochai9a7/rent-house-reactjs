import "../../assets/sass/section/Overview.scss"
import a from "../../assets/image-custom/1.png"
import b from "../../assets/image-custom/2.png"
import c from "../../assets/image-custom/3.png"
import { useFirebase } from "../../firebase"
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import i18next from "i18next";

function Overview() {
  const firebase = useFirebase()
  const { i18n, t } = useTranslation(["main"]);
  useEffect(() => {
    if (localStorage.getItem("i18nextLng")?.length > 2) {
      i18next.changeLanguage("en");
    }
  }, []);
  return (
    <div className="Overview">
      <div className="container overview">
        <div className="row">
          <div className="col-5 view-image">
            <div className="image">
              <img src={c} alt="top" />
            </div>
            <div className="image active">
              <img src={b} alt="bottom" />
            </div>
          </div>
          <div className="col-7 view-context">
            <small>About us</small>
            <h2 className="title">{t("dreamliving")}</h2>
            <p>
              {t("over10000placesline1")} <br />
              {t("over10000placesline2")}
            </p>
            <div className="blog">
              <i className="fa-solid fa-house" />
              <div className="blog-info">
                <h3>{t("vision")}</h3>
                <p>{t("NgocHaitop1")}</p>
              </div>
            </div>
            <div className="blog">
              <i className="fa-solid fa-house" />
              <div className="blog-info">
                <h3>{t("vision")}</h3>
                <p>{t("digitaltransformation")}</p>
              </div>
            </div>
            <div className="blog">
              <i className="fa-solid fa-house" />
              <div className="blog-info">
                <h3>{t("vision")}</h3>
                <p>{t("realvalue")}</p>
              </div>
            </div>
          </div>
        </div>
        {/* End row   */}
      </div>
      {/* End container   */}
    </div>
    /* End fragment */
  );
}
export default Overview;
