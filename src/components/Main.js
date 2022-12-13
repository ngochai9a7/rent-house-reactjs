import Header from "./global-components/Header";
import Carousel from "./section-components/Carousel";
import Overview from "./section-components/Overview";
import Services from "./section-components/Services";
import FamousView from "./section-components/FamousView";
import Feedbacks from "./section-components/Feedbacks";
import News from "./section-components/News";
import Footer from "./global-components/Footer";
import Discover from "./global-components/Discover";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { createContext, useContext } from "react";
import { version  ,useEffect, useState } from "react";
import { useFirebase } from "../firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Main() {
  const notify = () =>
    toast.warn("Hãy xác thực số điện thoại để được đăng bài", {
      theme: "dark",
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });
  const firebase = useFirebase();
  useEffect(() => {
    if (firebase.user && !firebase.user.phoneNumber) notify();
  }, []);
  return (
    <>
      <ToastContainer
      /> 
      <div className="Main">
        <Header />
        <Carousel />
        
        <Overview />
        <Services />
        <FamousView />
        <Feedbacks />
        <News />
        <Discover />
        <Footer />
      </div>
    </>
  );
}
export default Main;
