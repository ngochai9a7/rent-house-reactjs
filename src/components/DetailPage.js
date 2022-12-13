import Header from "./global-components/Header";
import DetailCarousel from "./detailpage/DetaiCarousel";
import DetailContent from "./detailpage/DetailContent";
import RightNavbar from "./detailpage/RightNavbar";
import SimilarPlaces from "./detailpage/SimilarPlaces";
import Discover from "./global-components/Discover";
import Footer from "./global-components/Footer";
import { useParams } from "react-router-dom";
import SimpleBreadcrumbs from "../components/global-components/SimpleBreadcrumbs";
import { createContext, useState } from "react";
import { useFirebase, db } from "../firebase";
import { useEffect } from "react";
import {
  collection,
  getDocs,
  getFirestore,
  doc,
  onSnapshot,
  getDoc,
  addDoc,
  updateDoc,
  arrayUnion,
  increment,
} from "firebase/firestore";

export const DetailContext = createContext();
function DetailPage() {
  const [data, setData] = useState()
  const [idHouse, setIdHouse] = useState()

  const { id } = useParams();
  const firebase = useFirebase();
  useEffect(() => {
    firebase.getHouseById(id).then(value => {
      setData(value.data());
      setIdHouse(value.id) 
    })
  },[])
  useEffect(() => {
    const docRef = doc(firebase.db, "houses", id);
    updateDoc(docRef, {
      view: increment(1)
    });
  }, []);
  
  // realtime update
  const unsub = onSnapshot(doc(firebase.db, "houses", id), (value) => {
    setData(value.data());
    setIdHouse(value.id) 
  });
  if (data == null) return null;
  return (
    <DetailContext.Provider value={{data, id}}>
      <div className="DetailPage">
        <Header />
        <DetailCarousel />
        <div className="container ">
          <div className="row">
            <DetailContent />
            <RightNavbar />
          </div>
          {/* End row */}
        </div>
        {/* End container*/}
        <Discover />
        <Footer />
      </div>
    </DetailContext.Provider>
    /* End fragment */
  );
}

export default DetailPage;
