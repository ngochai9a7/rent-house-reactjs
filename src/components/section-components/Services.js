import "../../assets/sass/section/Services.scss"
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
function Services() {
  const { i18n, t } = useTranslation(["main"]);
  useEffect(() => {
    if (localStorage.getItem("i18nextLng")?.length > 2) {
      i18next.changeLanguage("en");
    }
  }, []);
  return (
    <div className="Services">
      <div className="container-fluid services">
        <div className="row">
          <div className="col-12 title">
            <span>{t("services")}</span>
            <h1>{t("servicesfocus")}</h1>
          </div>
        </div>
        {/* End row */}
        <div className="row service-info">
          <div className="col-3">
            <i className="fa-solid fa-house" />
            <div className="info">
              <h3>{t("rent")}</h3>
              <p>
              {t("rent-text")}
              </p>
            </div>
          </div>
          <div className="col-3">
            <i className="fa-solid fa-house" />
            <div className="info">
              <h3>{t("post")}</h3>
              <p>
              {t("post-text")}
              </p>
            </div>
          </div>
          <div className="col-3">
            <i className="fa-solid fa-house" />
            <div className="info">
              <h3>{t("vision")}</h3>
              <p>
              {t("vision-text")}
              </p>
            </div>
          </div>
        </div>
        {/* End row */}
      </div>
      {/* End container */}
    </div>
    /* End fragment */
  );
}
export default Services;
