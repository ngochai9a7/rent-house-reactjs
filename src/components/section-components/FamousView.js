import { useEffect, useState } from "react";
import author from "../../assets/image-custom/author.png";
import "../../assets/sass/section/FamousView.scss";
import data from "../../assets/database.json";
import {useFirebase} from "../../firebase"
import {Link} from 'react-router-dom'
import { useTranslation } from "react-i18next";
import i18next from "i18next";
function FamousView() {
  const firebase = useFirebase()
  const [houses, setHouses] = useState([])
  useEffect(() => {
    firebase.getAllHouses().then((houses) => setHouses(houses.docs));
  }, [])
  //translate
  const { i18n, t } = useTranslation(["main"]);
  useEffect(() => {
    if (localStorage.getItem("i18nextLng")?.length > 2) {
      i18next.changeLanguage("en");
    }
  }, []);
  //read more
  const readMore = (text, id) => {
    if (text.length > 250)
    return (
      <small>
        {text.slice(0, 249)} ......... <Link to={`/detail/${id}`}>Read more</Link>
      </small>
    )
    else
    return (
      <small>
        {text}
      </small>
    )
  }
  
  // Shuffle array
  const randomData = houses
  const shuffled = randomData.sort(() => 0.5 - Math.random());
  let featured = shuffled.slice(0, 3);
  return (
    <div className="FamousView">
      <div className="container-fluid famous-view">
        <h1>{t("featured")}</h1>
        <div className="row content">
          {featured.map((house) => {
            return (
              <div className="col-4 content-item" key={house.id}>
                <div className="image">
                <Link to={`/detail/${house.id}`} key={house.id}>
                  <img src={house.data().image[0]} alt="" />
                </Link>
                </div>
                <div className="house-info">
                  <p>{house.data().name}</p>
                  <p className="price">{house.data().price}/tháng</p>
                  {readMore(house.data().description, house.id)}
                  <br/>
                  <small className="meter">{house.data().area}m<sup>2</sup></small>
                </div>
                <div className="publisher-info">
                  <div className="paragraph">
                    <img src={house.data().user_img} alt="" />
                    <div className="paragraph-content">
                      <small>{t("postby")}</small>
                      <p>{house.data().user_name}</p>
                    </div>
                  </div>
                  <div className="icon-group">
                    <i className="fa-solid fa-up-right-and-down-left-from-center" />
                    <i className="fa-regular fa-heart" />
                    <i className="fa-solid fa-circle-plus" />
                  </div>
                </div>
              </div>
            );
          })}
          
          {/* End content-item */}
        </div>
        {/* End row */}
      </div>
      {/* End container */}
    </div>
    /* End fragment */
  );
}
export default FamousView;
