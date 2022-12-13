import React, { useContext } from "react";
import "../../../assets/sass/detailpage/TitleContent.scss";
import { DetailContext } from "../../DetailPage";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import NumberFormat from 'react-number-format';

function TitleContent() {
  const { i18n, t } = useTranslation(["main"]);
  useEffect(() => {
    if (localStorage.getItem("i18nextLng")?.length > 2) {
      i18next.changeLanguage("en");
    }
  }, []);
  const context = useContext(DetailContext);
  return (
    <div className="col-12 title-content">
      <h1>{context.data.name}</h1>
      <p><NumberFormat value={context.data.price} displayType={'text'} thousandSeparator={"."}
                  decimalSeparator={","}/>đ/{t("month")}</p>
      <div className="address">
        <i className="fa-solid fa-location-dot" />
        <small>{context.data.address}</small>
      </div>
    </div>
    /* End col title-content*/
  );
}

export default TitleContent;
