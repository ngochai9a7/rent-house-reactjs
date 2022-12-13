import SimilarPlacesItem from "./SimilarPlacesItem";
import "../../assets/sass/detailpage/SimilarPlaces.scss";

function SimilarPlaces({ datas, id }) {
  let newdata = [];
  for (let q = 1; q < 4; q++) {
    if (id == datas.length) {
      id = 0;
    }
    newdata = [...newdata, datas[id]];
    id++;
  }
  return (
    <div className="container similar-places">
      <h1>Nơi ở tương tự</h1>
      <div className="row">
        {newdata.map((data, idx) => (
          <SimilarPlacesItem data={data} key={idx} />
        ))}
      </div>
      {/* End row */}
    </div>
    /* End container */
  );
}

export default SimilarPlaces;
