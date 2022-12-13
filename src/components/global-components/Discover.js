import "../../assets/sass/global/Discover.scss"
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
function Discover() {
  const { i18n, t } = useTranslation(["main"]);
  useEffect(() => {
    if (localStorage.getItem("i18nextLng")?.length > 2) {
      i18next.changeLanguage("en");
    }
  }, []);
  return (
    <div className="Discover">
      <div className="discover">
        <div className="discover-content">
          <div className="content">
            <h1>{t("lookingforadreamhome")}</h1>
            <p>{t("wecanhelpyou")}</p>
          </div>
          <div>
            <a href="/" className="btn btn-secondary">
              {t("explore")}
            </a>
          </div>
        </div>
      </div>
    </div>
    /* End fragment */
  );
}
export default Discover;
