import avatar from "../../assets/image-custom/author.png"
import "../../assets/sass/section/Feedbacks.scss"
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
function Feedbacks() {
  const { i18n, t } = useTranslation(["main"]);
  useEffect(() => {
    if (localStorage.getItem("i18nextLng")?.length > 2) {
      i18next.changeLanguage("en");
    }
  }, []);
  return (
    <div className="Feedbacks" style={{backgroundColor: "#F2F6F7"}}>
      <div className="container feedbacks">
        <div className="row">
          <div className="col-12 title">
            <span>Feedbacks</span>
            <h1>{t("feedbacks")}</h1>
          </div>
          {/* End row */}
        </div>
        <div className="row feedbacks-content">
          <div className="col-3 feedback-content">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
              pellentesque blandit lorem placerat vestibulum. Phasellus egestas
              sagittis augue, ac faucibus nisl elementum vel. Donec et nibh
              erat. Suspendisse
            </p>
            <div className="info">
              <img src={avatar} alt="" />
              <div className="feedback-info">
                <small>Fullstack Master Developer</small>
                <p>Huỳnh Nguyễn Ngọc Hải</p>
              </div>
            </div>
          </div>
          {/* End col */}
          <div className="col-3 feedback-content">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
              pellentesque blandit lorem placerat vestibulum. Phasellus egestas
              sagittis augue, ac faucibus nisl elementum vel. Donec et nibh
              erat. Suspendisse
            </p>
            <div className="info">
              <img src={avatar} alt="" />
              <div className="feedback-info">
                <small>Nomal ReactJS Developer</small>
                <p>Trần Xuân Tiến</p>
              </div>
            </div>
          </div>
          {/* End col */}
          <div className="col-3 feedback-content">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
              pellentesque blandit lorem placerat vestibulum. Phasellus egestas
              sagittis augue, ac faucibus nisl elementum vel. Donec et nibh
              erat. Suspendisse
            </p>
            <div className="info">
              <img src={avatar} alt="" />
              <div className="feedback-info">
                <small>Master Tester</small>
                <p>Phạm Đình Văn</p>
              </div>
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
export default Feedbacks;
