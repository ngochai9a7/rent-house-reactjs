import houseView from "../../assets/image-custom/3.png"
import "../../assets/sass/section/News.scss"
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
function News() {
  const { i18n, t } = useTranslation(["main"]);
  useEffect(() => {
    if (localStorage.getItem("i18nextLng")?.length > 2) {
      i18next.changeLanguage("en");
    }
  }, []);
  return (
    <div className="News">
      <div className="container news">
        <div className="row">
          <div className="col-12 title">
            <span>New and Blog</span>
            <h1>{t("latestnews")}</h1>
          </div>
          {/* End row */}
        </div>
        <div className="row news-content">
          <div className="col-4 new-content">
            <img src={houseView} alt="" />
            <div className="new-info">
              <div className="info-group">
                <i className="fa-regular fa-user" />
                <small className="text-muted">{t("postby")}</small>
              </div>
              <div className="info-group">
                <i className="fa-regular fa-user" />
                <small className="text-muted">{t("postby")}</small>
              </div>
              <div className="info-group">
                <i className="fa-regular fa-user" />
                <small className="text-muted">{t("postby")}</small>
              </div>
            </div>
            <h1>10 cách để trang trí ngôi nhà của bạn</h1>
            <div className="new-footer">
              <p>July 21,2022</p>
              <a type="button" href="/">
                Read more
              </a>
            </div>
          </div>
          {/* End col */}
          <div className="col-4 new-content">
            <img src={houseView} alt="" />
            <div className="new-info">
              <div className="info-group">
                <i className="fa-regular fa-user" />
                <small className="text-muted">Đăng bởi</small>
              </div>
              <div className="info-group">
                <i className="fa-regular fa-user" />
                <small className="text-muted">Đăng bởi</small>
              </div>
              <div className="info-group">
                <i className="fa-regular fa-user" />
                <small className="text-muted">Đăng bởi</small>
              </div>
            </div>
            <h1>10 cách để trang trí ngôi nhà của bạn</h1>
            <div className="new-footer">
              <p>July 21,2022</p>
              <a type="button" href="/">
                Read more
              </a>
            </div>
          </div>
          {/* End col */}
          <div className="col-4 new-content">
            <img src={houseView} alt="" />
            <div className="new-info">
              <div className="info-group">
                <i className="fa-regular fa-user" />
                <small className="text-muted">Đăng bởi</small>
              </div>
              <div className="info-group">
                <i className="fa-regular fa-user" />
                <small className="text-muted">Đăng bởi</small>
              </div>
              <div className="info-group">
                <i className="fa-regular fa-user" />
                <small className="text-muted">Đăng bởi</small>
              </div>
            </div>
            <h1>10 cách để trang trí ngôi nhà của bạn</h1>
            <div className="new-footer">
              <p>July 21,2022</p>
              <a type="button" href="/">
                Read more
              </a>
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
export default News;
