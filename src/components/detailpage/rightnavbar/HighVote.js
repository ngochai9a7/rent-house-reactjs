import HighVoteItem from "./HighVoteItem";
import { Link, Navigate } from "react-router-dom";
import "../../../assets/sass/detailpage/HighVote.scss";
import {DetailContext} from "../../DetailPage"
import { useContext } from "react";
import {useFirebase} from "../../../firebase"
import {useState, useEffect} from 'react'
function HighVote() {
  const context = useContext(DetailContext)
  const firebase = useFirebase()
  const [houses, setHouses] = useState([])
  useEffect(() => {
    firebase.getAllHouses().then((houses) => setHouses(houses.docs));
  }, [])
  

 
  houses.sort(function (a, b) {
    return b.data().view - a.data().view;
  });
  let slicedata = houses.slice(0, 5);
  

  return (
    <div className="highvote">
      <h1>Đánh giá cao</h1>
      {slicedata.map((house, idx) => (
        <Link to={`/detail/${house.id}`} key={house.id} onClick={() => Navigate(`/detail/${house.id}`) }>
          <HighVoteItem data={house.data()} />
        </Link>
      ))}
    </div> /* End fragment */
  );
}

export default HighVote;
