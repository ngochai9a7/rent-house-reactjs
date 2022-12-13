import "../../../assets/sass/detailpage/DateComment.scss";
import { useContext } from "react";
import { DetailContext } from "../../DetailPage"
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
function DateComment() {
  const { i18n, t } = useTranslation(["DetailPage"]);
  useEffect(() => {
    if (localStorage.getItem("i18nextLng")?.length > 2) {
      i18next.changeLanguage("en");
    }
  }, []);
  const context = useContext(DetailContext);
  return (
    <div className="col-12 date-comment">
      <div className="date">
        <i className="fa-solid fa-calendar-days" />
        <p>{context.data.createdAt.toDate().toDateString()}</p>
      </div>
      <div className="comment">
        <i className="fa-solid fa-comments" />
        <p>{context.data.comments.length} {t("comment")}</p>
      </div>
    </div>
    /* End col date-comment*/
  );
}

export default DateComment;
