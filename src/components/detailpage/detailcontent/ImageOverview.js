import React, { useContext } from "react";
import { DetailContext } from "../../DetailPage";

import "../../../assets/sass/detailpage/ImageOverview.scss";

function ImageOverview() {
  const data = useContext(DetailContext);

  return (
    <div className="col-12 image-overview">
      <h1>Hình ảnh</h1>
      <div className="address-img">
        <div className="row">
          <div className="col-6 double">
            <img src={data.image?.image1} alt="" />
            <img src={data.image?.image2} alt="" />
          </div>
          <div className="col-6 only">
            <img src={data.image?.image3} alt="" />
          </div>
        </div>
      </div>
    </div>
    /* End col image-overview*/
  );
}

export default ImageOverview;
