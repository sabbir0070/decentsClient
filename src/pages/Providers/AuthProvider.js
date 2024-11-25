// import { GoogleAuthProvider, getAuth, signInWithPopup, signOut } from "firebase/auth";
// import React, { createContext, useEffect, useState } from 'react';
// import app from "../../FirebaseConfig/FirebaseConfig";

// export const AuthContext = createContext(null)
// const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null)
//   console.log(user, 1000);
//   const [loading, setLoading] = useState(true);
// const googleProvider = new GoogleAuthProvider();
// const auth = getAuth(app);

//   useEffect(() => {
//   const storedUser = localStorage.getItem('user');
//   if (storedUser) {
//     const parsedUser = JSON.parse(storedUser); // Parse if stored as JSON
//     setUser(parsedUser); // Assuming `parsedUser` is an object that contains an `email` field
//   }
//   }, [])
// const handleLogout = () =>{
// setLoading(true)
//  localStorage.removeItem('user')
// setUser(null)
//  signOut(auth).then(() => {
//       setLoading(false);
//     }).catch((error) => {
//       setLoading(false);
//       console.error(error.message);
//     });
// }

//   // Check login status when the app loads
//   // useEffect(() => {
//   //   const checkAuth = async () => {
//   //     try {
//   //       const res = await axios.get('http://localhost:5001/api/user', { withCredentials: true });
//   //       // setUser(res.data.user);
//   //     } catch (error) {
//   //       setUser(null); // User not authenticated
//   //     } finally {
//   //       setLoading(false);
//   //     }
//   //   };
//   //   checkAuth();
//   // }, []);

// //   const handleLogout = async () => {
// //   try {
// //     await axios.post('http://localhost:5001/api/logout', {}, { withCredentials: true });
// //     setUser(null);
// //     navigate('/login', { replace: true });
// //   } catch (error) {
// //     console.error('Logout failed:', error);
// //   }
// // };
 
// const googleSignIn = () =>{
// setLoading(true)
//  return signInWithPopup(auth, googleProvider)
//  .then((result) => {
//         const user = result.user;
//         localStorage.setItem('user', JSON.stringify(user)); // Store user as a JSON string
//         setUser(user);
//         setLoading(false);
//       })
//       .catch((error) => {
//         setLoading(false);
//         console.error(error.message);
//       });

// } 



//   const authInfo = {
//     user, setUser, loading, googleSignIn,handleLogout
//   }

//   return (
//     <AuthContext.Provider value={authInfo}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthProvider;






// import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
// import React, { createContext, useEffect, useState } from 'react';
// import app from '../../FirebaseConfig/FirebaseConfig';

// export const AuthContext = createContext(null)
// const auth = getAuth(app)
// const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null)
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, currentUser => {
//       setUser(currentUser)
//       setLoading(false)
//     });
//     return () => {
//       return unsubscribe;
//     }
//   }, [])

//   // CreateUser
//   const createUser = (email, password) => {
//     setLoading(true);
//     return createUserWithEmailAndPassword(auth, email, password)
//   }
//   // update photo
//   const updatePhoto = (name, photo) => {
//     setLoading(true)
//     return updateProfile(auth.currentUser, {
//       displayName: name, photoURL: photo
//     })
//   }

//   // SignUser
//   const signInUser = (email, password) => {
//     setLoading(true);
//     return signInWithEmailAndPassword(auth, email, password)
//   }

//   const googleProvider = new GoogleAuthProvider();

//   const GoogleSignIn = () => {
//     setLoading(true);
//     return signInWithPopup(auth, googleProvider)
//   }

//   // Logout
//   const logOut = () => {
//     setLoading(false)
//     return signOut(auth)
//   }

//   const authInfo = {
//     user,
//     loading,
//     createUser,
//     signInUser,
//     GoogleSignIn,
//     logOut,
//     updatePhoto
//   }
//   return (
//     <AuthContext.Provider value={authInfo}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthProvider;






import React, { createContext, useEffect, useState } from 'react';
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile, } from "firebase/auth";


import axios from 'axios';
import app from '../../firebase/FrebaseConfig';

export const AuthContext = createContext(null);
const auth = getAuth(app);
const AuthProvider = ({children}) => {
const [user, setUser] = useState(null);
const [loading, setLoading] = useState(true);
const googleProvider = new GoogleAuthProvider();

const createUser = (email, password) =>{
setLoading(true)
return createUserWithEmailAndPassword(auth,email,password)
}

 const signInUser = (email, password) =>{
setLoading(true)
 return signInWithEmailAndPassword(auth, email, password)
} 

const googleSignIn = () =>{
setLoading(true)
 return signInWithPopup(auth, googleProvider);
}

const updatePhoto = (name) =>{
setLoading(true)
return updateProfile(auth.currentUser,{
displayName:name
})
}

const logOut = () =>{
setLoading(true)
return signOut(auth)
}

const sendPasswordReset = (auth,email) =>{
setLoading(true)
sendPasswordResetEmail(auth,email)

}

useEffect(()=>{
const unsubscribe = onAuthStateChanged(auth,currentUser=>{
setUser(currentUser)
// get and set token
if(currentUser){
axios.post(`http://localhost:5001/jwt`,{email: currentUser.email})
.then(data=>{
console.log(data.data.token)
localStorage.setItem('access-token',data.data.token);
setLoading(false)
})
}
else{
localStorage.removeItem('access-token')
}
// setLoading(false)
})
return ()=>{

return unsubscribe()
}
},[])

const authInfo = {
user,
loading,
createUser,
signInUser,
googleSignIn,
updatePhoto,
logOut,
sendPasswordReset,
}
  return (
    <div>
      <AuthContext.Provider value={authInfo}>
{children}
</AuthContext.Provider>
    </div>
  );
};

export default AuthProvider;