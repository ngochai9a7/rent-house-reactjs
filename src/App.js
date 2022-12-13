import AddListingForm from "./components/AddListingForm";
import DetailPage from "./components/DetailPage";
import Main from "./components/Main";
import Shop from "./components/Shop";
import Shop2 from "./components/Shop2";
import CreateBlog from "./components/CreateBlog";
import DetailBlog from "./components/DetailBlog";
import React from "react";
import { Routes, Route } from "react-router-dom";
import PrivateRoutes from "./utils/PrivateRoutes";
import MapGoogle from "./components/global-components/MapGoogle";
import Login from "./components/Login";
import Welcome from "./components/Welcome";
import News from "./components/News";
import { useFirebase } from "./firebase";
import "@goongmaps/goong-js/dist/goong-js.css";
import MyPosts from "./components/MyPosts";
import { Suspense } from "react";
import Typesense from 'typesense'
function App() {
  const firebase = useFirebase();
  // handle flick UI
  const loadingUser = firebase.user === undefined;
  if (loadingUser) {
    return null;
  }
  if (firebase.user) {
    console.log(firebase.user);
    console.log(firebase.test());
  }
  return (
    <Suspense fallback={null}>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/detail/:id" element={<DetailPage />} />
        <Route path="/map" element={<MapGoogle />} />
        <Route path="/login" element={<Login />} />
        <Route path="/shop2" element={<Shop2 />} />

        <Route
          path="/profile"
          element={
            <PrivateRoutes>
              <Welcome />
            </PrivateRoutes>
          }
        />
        <Route
          path="/addlisting"
          element={
            <PrivateRoutes>
              <AddListingForm />
            </PrivateRoutes>
          }
        />
        <Route path="/news" element={<News />} />
        <Route path="/news/:id" element={<DetailBlog />} />

        <Route
          path="/createblog"
          element={
            <PrivateRoutes>
              <CreateBlog />
            </PrivateRoutes>
          }
        />
        <Route
          path="/myposts"
          element={
            <PrivateRoutes>
              <MyPosts />
            </PrivateRoutes>
          }
        />
      </Routes>
    </Suspense>
  );
}
export default App;
