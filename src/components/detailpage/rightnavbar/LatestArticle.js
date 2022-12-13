import LatestArticleItem from "./LatestArticleItem";
import { Link, Navigate } from "react-router-dom";
import "../../../assets/sass/detailpage/LatestArticle.scss";
import { DetailContext } from "../../DetailPage";
import { useContext } from "react";
import { useFirebase } from "../../../firebase";
import { useState, useEffect } from "react";
function LatestArticle() {
  const context = useContext(DetailContext);
  const firebase = useFirebase();
  const [houses, setHouses] = useState([]);
  useEffect(() => {
    firebase.getAllHouses().then((houses) => setHouses(houses.docs));
  }, []);
  houses.sort(function (a, b) {
    return b.data().createdAt - a.data().createdAt;
  });
  const slicedata = houses.slice(0, 5);

  return (
    <div className="latest-article">
      <h1>Bài viết mới nhất</h1>
      {slicedata.map((house, idx) => (
        <Link
          to={`/detail/${house.id}`}
          key={house.id}
          onClick={() => Navigate(`/detail/${house.id}`)}
        >
          <LatestArticleItem data={house.data()} />
        </Link>
      ))}
    </div> /* End fragment */
  );
}

export default LatestArticle;
