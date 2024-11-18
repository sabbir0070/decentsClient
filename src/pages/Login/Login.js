
import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import './Login.css'; // Import the custom CSS
import { AuthContext } from '../Providers/AuthProvider';
import SocialLogin from '../SocialLogin/SocialLogin';
import Topbar from '../topbar';
import Footer from '../../footer';
import { Helmet } from 'react-helmet';

const Login = () => {
  const { signInUser } = useContext(AuthContext);
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
      .catch((error) => setError(error.message));
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
                placeholder="Enter email"
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
                {...register('password', { required: 'Password is required' })}
                placeholder="Enter Password"
              />
              <span className="password-toggle" onClick={() => setShow(!show)}>
                {show ? <FaEyeSlash /> : <FaEye />}
              </span>
              {errors.password && (
                <p className="login-error">{errors.password.message}</p>
              )}
              <p className="login-error">{error}</p>
            </div>
            <input
              className="login-button"
              type="submit"
              value="Login"
            />
          </form>
          <p className="login-footer">
            Don’t have an account? <Link to="/signin" className="login-link">Sign Up</Link>
          </p>
        </div>
        <div className="divider">Or</div>
        <SocialLogin />
      </div>
      <footer>
        <Footer />
      </footer>

    </>);

};

export default Login;
