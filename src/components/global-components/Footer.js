import logo from "../../assets/image-custom/logo-new-2.png"
import payment from "../../assets/image-custom/payment.png"
import "../../assets/sass/global/Footer.scss"
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
function Footer() {
  const { i18n, t } = useTranslation(["main"]);
  useEffect(() => {
    if (localStorage.getItem("i18nextLng")?.length > 2) {
      i18next.changeLanguage("en");
    }
  }, []);
  return (
    <div className="Footer">
      <div className="container-fluid footer">
        <div className="row footer-content">
          <div className="col-3 description">
            <img src={logo} alt="" />
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
              pellentesque blandit lorem placerat vestibulum. Phasellus egestas
              sagittis augue, ac faucibus nisl elementum vel. Donec et nibh
              erat. Suspendisse molestie, orci at porttitor cursus, lorem odio
              pulvinar risus, nec ornare urna nisi id erat
            </p>
          </div>
          {/* End container */}
          <div className="col-6">
            <div className="row">
              <div className="col-4">
                <p>{t("company-footer")}</p>
              </div>
              <div className="col-4">
                <p>{t("services-footer")}</p>
              </div>
              <div className="col-4">
                <p>{t("customercares-footer")}</p>
              </div>
            </div>
          </div>
          {/* End col */}
          <div className="col-3 footer-news">
            <p>{t("newsletter-footer")}</p>
            <small>
            {t("subcribe-footer")}
            </small>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Mail"
                aria-label="Recipient's username"
                aria-describedby="button-addon2"
              />
              <button
                className="btn btn-outline-secondary"
                type="button"
                id="button-addon2"
              >
                <i className="fa-brands fa-telegram" />
              </button>
            </div>
            <p>{t("weaccept-footer")}</p>
            <div className="partner">
              <img src={payment} alt="" />
            </div>
          </div>
          {/* End col */}
        </div>
        {/* End row */}
      </div>
      {/* End container */}
    </div>
    /* End fragment */
  );
}
export default Footer;
