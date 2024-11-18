import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

import Swal from 'sweetalert2';
import './SignUp.css'
import { AuthContext } from '../Providers/AuthProvider';
import SocialLogin from '../SocialLogin/SocialLogin';
import { Helmet } from 'react-helmet';
import Footer from '../../footer';
import Topbar from '../topbar';

const Register = () => {
  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();
  const password = watch("password");
  const { createUser, updatePhoto } = useContext(AuthContext);
  const navigate = useNavigate();

  const onSubmit = (data) => {
    createUser(data.email, data.password)
      .then(result => {
        updatePhoto(data.name).then((result) => {
          console.log(result);
          const saveUser = { name: data.name, email: data.email,role:"user"  };
          fetch(`http://localhost:5000/users`, {
            method: "POST",
            headers: {
              "content-type": "application/json"
            },
            body: JSON.stringify(saveUser)
          })
            .then(res => res.json())
            .then(data => {
              console.log(data.insertedId);
            });
          reset();
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Sign Up Successful',
            showConfirmButton: false,
            timer: 1500
          });
          navigate('/');
        })
          .catch(error => {
            console.log(error.message);
          });
      })
      .catch(error => {
        console.log(error.message);
      });
  };

  return (
    <>      <Helmet>
      <title> signup</title>
    </Helmet>

      <header>
        <Topbar />
      </header>
      <div className="register-container">
        <div className="register-form-container">
          <h2 className="register-title">Create an account</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                {...register("name", { required: "Name is required" })}
                placeholder="Enter Name"
              />
              {errors.name && <p className="error-message">{errors.name.message}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                {...register("email", { required: "Email is required" })}
                placeholder="Enter email"
              />
              {errors.email && <p className="error-message">{errors.email.message}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Password must be at least 6 characters" },
                  pattern: { value: /^(?=.*?[A-Z])(?=.*?[!@#$%^&*])/, message: "Password must contain at least one capital letter and one special character" }
                })}
                placeholder="Enter Password"
              />
              {errors.password && <p className="error-message">{errors.password.message}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="confirm">Confirm Password</label>
              <input
                type="password"
                {...register("confirm", {
                  required: "Confirm Password is required",
                  validate: value => value === password || "Passwords do not match"
                })}
                placeholder="Confirm Password"
              />
              {errors.confirm && <p className="error-message">{errors.confirm.message}</p>}
            </div>
            <input type="submit" value="Sign Up" className="submit-button" />
          </form>
          <p className="already-account">
            Already have an account? <Link to="/login">Login</Link>
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

export default Register;
