
import React, { useContext, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

import { Helmet } from 'react-helmet';
import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Footer from '../../footer';
import SocialLogin from '../SocialLogin/SocialLogin';
import Topbar from '../topbar';
import './Login.css'; // Import the custom CSS
import { AuthContext } from '../Providers/AuthProvider';

const Login = () => {
  const { signInUser, sendPasswordReset } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location?.state?.from?.pathname || '/';
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  console.log(errors, 299);
  const onSubmit = (data) => {
    signInUser(data.email, data.password)
      .then((result) => {
        setError('');
        Swal.fire({
          title: 'Success!',
          text: 'Do you want to continue',
          icon: 'success',
          confirmButtonText: 'Cool',
        });
        navigate(from, { replace: true });
      })
      .catch((error) => setError(error));
  };

  return (
    <>
      <Helmet>
        <title> login</title>
      </Helmet>
      <header>
        <Topbar />
      </header>
      <div className="login-container">
        <div className="login-form-container">
          <h2 className="login-title">Login</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="login-field">
              <label htmlFor="email">Email</label>
              <input
                className="login-input"
                type="email"
                {...register('email', { required: 'Email is required' })} 
                placeholder="Enter your email"

              />
              {errors.email && (
                <p className="login-error">{errors.email.message}</p>
              )}
            </div>
            <div className="login-field password-field">
              <label htmlFor="password">Password</label>
              <input
                className="login-input"
                type={show ? 'text' : 'password'}
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Password must be at least 6 characters" },
                  pattern: { value: /^(?=.*?[A-Z])(?=.*?[!@#$%^&*])/, message: "Password must contain at least one capital letter and one special character" }
                })}
                placeholder="Enter Password"
              />
              <span className="password-toggle" onClick={() => setShow(!show)}>
                {show ? <FaEyeSlash /> : <FaEye />}
              </span>
              {errors.password && (
                <p className="login-error">{errors.password.message}</p>
              )}
              {error && <p className="login-error">{error?.message}</p>}
            </div>


            <input
              className="login-button"
              type="submit"
              value="Login"
            />
          </form>
          <p className="login-footer">
            Don't have an account? <Link to="/signin" className="login-link">Sign Up</Link>
          </p>
        </div>
        <div className="divider">Or</div>
        <SocialLogin />
      </div>
      <footer>
        <Footer />
      </footer>

    </>
  );

};

export default Login;





// import axios from 'axios';

// const Login = () => {
//   const { register, handleSubmit, formState: { errors } } = useForm();
//   const location = useLocation();
//   const navigate = useNavigate();
//   const from = location?.state?.from?.pathname || '/';
//   const [show, setShow] = useState(false);
//   const [error, setError] = useState('');


//   const onSubmit = async (data) => {
//     try {
//       const res = await axios.post("http://localhost:5001/api/login", data, { withCredentials: true });
//       console.log(res.data, 128);
//       localStorage.setItem('user', JSON.stringify(res.data.user))
//       // setUser(res.data.user)
//       if (res.data.message === 'success') {
//         setError('');

//         Swal.fire({
//           title: 'Success!',
//           text: 'Do you want to continue',
//           icon: 'success',
//           confirmButtonText: 'Cool',
//         }).then(() => {
//           // Refresh the page after showing success
//           window.location.reload();
//         });
//         navigate(from, { replace: true });
//       }



//     } catch (error) {
//       const errorMessage = error.response?.data?.message || "Something went wrong. Please try again.";
//       setError(errorMessage);
//       alert(errorMessage)
//     }
//   };

//   return (
//     <>
//       <Helmet>
//         <title> login</title>
//       </Helmet>
//       <header>
//         <Topbar />
//       </header>
//       <div className="login-container">
//         <div className="login-form-container">
//           <h2 className="login-title">Login</h2>
//           <form onSubmit={handleSubmit(onSubmit)}>
//             <div className="login-field">
//               <label htmlFor="email">Email</label>
//               <input
//                 className="login-input"
//                 type="email"
//                 {...register('email', { required: 'Email is required' })}
//                 placeholder="Enter email"
//               />
//               {errors.email && (
//                 <p className="login-error">{errors.email.message}</p>
//               )}
//             </div>
//             <div className="login-field password-field">
//               <label htmlFor="password">Password</label>
//               <input
//                 className="login-input"
//                 type={show ? 'text' : 'password'}
//                 {...register('password', { required: 'Password is required' })}
//                 placeholder="Enter Password"
//               />
//               <span className="password-toggle" onClick={() => setShow(!show)}>
//                 {show ? <FaEyeSlash /> : <FaEye />}
//               </span>
//               {errors.password && (
//                 <p className="login-error">{errors.password.message}</p>
//               )}
//               <p className="login-error">{error}</p>
//             </div>
//             <input
//               className="login-button"
//               type="submit"
//               value="Login"
//             />
//           </form>
//           <p className="login-footer">
//             Don’t have an account? <Link to="/signin" className="login-link">Sign Up</Link>
//           </p>
//         </div>
//         <div className="divider">Or</div>
//         <SocialLogin />
//       </div>
//       <footer>
//         <Footer />
//       </footer>
//     </>
//   );
// };

// export default Login;
