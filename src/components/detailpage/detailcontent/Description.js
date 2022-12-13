import "../../../assets/sass/detailpage/Description.scss";
import React, { useContext } from "react";
import { DetailContext } from "../../DetailPage";
function Description() {
  const context = useContext(DetailContext);
  return (
    <div className="col-12 description">
      <h1>Mô tả</h1>
      <p>{context.data.description}</p>
    </div>
    /* End col description*/
  );
}

export default Description;
