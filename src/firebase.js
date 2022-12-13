// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import firebase from "./firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  RecaptchaVerifier,
  linkWithPhoneNumber,
  FacebookAuthProvider,
  TwitterAuthProvider,
  fetchSignInMethodsForEmail,
  OAuthProvider,
  linkWithCredential,
} from "firebase/auth";
import {
  collection,
  getDocs,
  getFirestore,
  doc,
  getDoc,
  addDoc,
  updateDoc,
  arrayUnion,
  query,
  orderBy,
  limit,
  where,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  list,
  listAll,
} from "firebase/storage";
import "firebase/storage";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { createContext, useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Update } from "@material-ui/icons";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
const FirebaseContext = createContext(null);
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyALfnGo6Gf7g3JqxS1WqiZUyIzCZAruHlk",
  authDomain: "rent-house-356307.firebaseapp.com",
  projectId: "rent-house-356307",
  storageBucket: "rent-house-356307.appspot.com",
  messagingSenderId: "17053782494",
  appId: "1:17053782494:web:dad6d0c58787f9f2290d4f",
  measurementId: "G-JCXFKQT392",
};
export const useFirebase = () => useContext(FirebaseContext);
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
// auth
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const twitterProvider = new TwitterAuthProvider();
// provider
export const FirebaseProvider = (props) => {
  const navigate = useNavigate()
  // khi bat dau user = null chuyen ve user = undefined
  const [user, setUser] = useState(() => auth.currentUser || undefined); // handle flick UI -- important
  //check state of user
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        localStorage.setItem('User', JSON.stringify(user));
      } else {
        setUser(null);
        localStorage.removeItem("User");
      }
    });
  }, []);
  //sign in and sign out 
  var provider
  const test = () => {
    fetchSignInMethodsForEmail(auth, user.email).then((methods) => console.log(methods))
  }
  // Sign in Google
  const signinWithGoogle = () => signInWithPopup(auth, googleProvider).catch(function(error) {
    if (error.code === 'auth/account-exists-with-different-credential') {
      const credential = OAuthProvider.credentialFromResult(error.customData)
      fetchSignInMethodsForEmail(auth, error.customData.email).then((methods) => {
        console.log(methods)
        switch(methods[0]) {
          case 'facebook.com':
            provider = facebookProvider
            break;
          case 'twitter.com':
            provider = twitterProvider
            break;
        }  
        signInWithPopup(auth, provider).then((result) => {
          console.log(result.user)
          linkWithCredential(result.user, credential)
        })     
      })
    }
  })
  // Sign in Facebook
  const signinWithFacebook = () => signInWithPopup(auth, facebookProvider).catch(function(error) {
    if (error.code === 'auth/account-exists-with-different-credential') {
      const credential = OAuthProvider.credentialFromResult(error.customData)
      fetchSignInMethodsForEmail(auth, error.customData.email).then((methods) => {
        console.log(methods)
        switch(methods[0]) {
          case 'google.com':
            provider = googleProvider
            break;
          case 'twitter.com':
            provider = twitterProvider
            break;
        }  
        signInWithPopup(auth, provider).then((result) => {
          console.log(result.user)
          linkWithCredential(result.user, credential)
        })     
      })
    }
  })
  // Sign in Twitter
  const signinWithTwitter = () => signInWithPopup(auth, twitterProvider).catch(function(error) {
    if (error.code === 'auth/account-exists-with-different-credential') {
      const credential = OAuthProvider.credentialFromResult(error.customData)
      fetchSignInMethodsForEmail(auth, error.customData.email).then((methods) => {
        console.log(methods)
        switch(methods[0]) {
          case 'google.com':
            provider = googleProvider
            break;
          case 'facebook.com':
            provider = facebookProvider
            break;
        }  
        signInWithPopup(auth, provider).then((result) => {
          console.log(result.user)
          linkWithCredential(result.user, credential)
        })     
      })
    }
  })
  const signout = () => {
    signOut(auth);
  };
  //Phone auth
  const phoneAuth = (number) => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      { size: "invisible" },
      auth
    );
    return linkWithPhoneNumber(user, number, window.recaptchaVerifier)
      .then(function (confirmationResult) {
        // Ask user to provide the SMS code.
        var code = window.prompt("Provide your SMS code");
        // Complete sign-in.
        confirmationResult.confirm(code);
        window.location.reload();
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  //logged in true or false ?
  const isLoggedIn = user ? true : false;
  //Get all house
  const getAllHouses = async () => {
    return getDocs(collection(db, "houses"));
  };
  //Get house by ID
  const getHouseById = async (id) => {
    const docRef = doc(db, "houses", id);
    const result = await getDoc(docRef);
    return result;
  };
  // Get newest house
  const getNewestHouse = async() => {
    const docRef = collection(db, "houses")
    const q = await query(docRef, orderBy("createdAt", "desc"), limit(5))
    return q
  }
  //Get house by UID
  const getHouseByUID = async(uid) => {
    const q = query(collection(db, "houses"), where("user_uid", "==", uid)); 
    const result = await getDoc(q);
    return result;
  }
  //Create new listings
  const handleCreateNewListing = async (formData) => {
    const docRef = await addDoc(collection(db, "houses"), {
      address: formData.address,
      area: formData.area,
      comments: [],
      createdAt: formData.createdAt,
      description: formData.description,
      detailsummary: formData.detailsummary,
      image: [],
      latitude: formData.latitude,
      longitude: formData.longitude,
      name: formData.name,
      price: formData.price,
      user_img: formData.user_img,
      user_name: formData.user_name,
      user_phone: formData.user_phone,
      user_uid: formData.user_uid,
      view: 0,
    })
    //update multiple image url to image field
    formData.image.map((image) => {
      const imageRef = ref(storage, `uploads/images/${docRef?.id}/${image.name}`);
      uploadBytes(imageRef, image).then(async () => {
        const downloadURL = await getDownloadURL(imageRef);
        await updateDoc(doc(db, "houses", docRef.id), {
          image: arrayUnion(downloadURL)
        })
      });
    });
    toast.success('Đăng bài thành công!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      })
    navigate(`/`)
  };
  // Add comment
  const handleComment = async (inputComment, id) => {
    const {author_id, img, name, date, comment} = inputComment
    console.log(inputComment)
    const docRef = doc(db, "houses", id);
    await updateDoc(docRef, {
      comments: arrayUnion(...[{author_id: author_id, img: img, name: name, date: date, comment: comment}])
    }).then(toast.success('🦄 Wow so easy!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      }) )
    
  }
  // Get comment
  const getComment = async (id) => {
    const docRef = doc(db, "houses", id);
    const comment = await getDoc(docRef);
    return comment.data().comments
  }
  // Create blog
  const handleCreateNewBlog = async(data) => {
    const docRef = await addDoc(collection(db, "blogs"), data);
    toast.success('Đăng bài thành công!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      })
    navigate(`/`)
  }
  const getAllBlog = async () => {
    return getDocs(collection(db, "blogs"));
  };
  //Get blogs by ID
  const getBlogById = async (id) => {
    const docRef = doc(db, "blogs", id);
    const result = await getDoc(docRef);
    return result;
  };
  return (
    <FirebaseContext.Provider
      value={{
        signinWithGoogle, signinWithFacebook, signinWithTwitter ,test,
        signout,
        phoneAuth,
        isLoggedIn,
        user,
        getAllHouses,
        getHouseById,
        handleCreateNewListing,
        handleComment,
        getComment,
        db, // use for realtime update
        handleCreateNewBlog,
        getAllBlog,
        getBlogById,
        getNewestHouse,
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};
