
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import Link for navigation
import "../SignUp/SignUp.css";
import app from "../../FirebaseAuth/FirebaseAuth";
import { AuthContext } from "../../PrivateRoute/PrivateRoute";

const SignUp = () => {
  const [showSignUp, setShowSignUp] = useState(true); // Toggles between SignUp and Login form
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const { setIsSignedUp } = useContext(AuthContext)
  const navigate = useNavigate();
  console.log(setIsSignedUp);
  console.log(navigate);
  const handleGoogleLogin = async () => {
    setError("");
    setLoading(true);
    try {
      const google = await signInWithPopup(auth, provider);
      console.log(google);
      setLoading(false);
      alert("Account created successfully with Google!");
      setIsSignedUp(true)
      navigate('/telehealth')
    } catch (error) {
      setLoading(false);
      setError("Failed to sign in with Google. Please try again.");
      console.error("Error with Google sign-in:", error);
    }
  };

  useEffect(() => {
    if (error) {
      alert(error);
    }
  }, [error]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");


    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    // Password strength validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      setError(
        "Password must be at least 8 characters long and include uppercase and lowercase letters, a number, and a special character."
      );
      return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const create = await createUserWithEmailAndPassword(auth, email, password);
      console.log(create);
      setLoading(false);
      alert("Account created successfully!");
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setIsSignedUp(true)
      navigate('/telehealth')
    } catch (error) {
      setLoading(false);
      if (error.code === "auth/email-already-in-use") {
        setError("This email is already associated with an account. Try logging in or resetting your password.");
      } else {
        setError(error.message);
      }
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      console.error("Error signing up:", error);
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };


  // loginSubmit

  const handleSubmitSignIn = async (e) => {
    e.preventDefault();
    setError("");
    console.log(email);
    console.log(password);
    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    // Password strength validation (this is optional for sign-in; typically used only for sign-up)
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      setError(
        "Password must be at least 8 characters long and include uppercase and lowercase letters, a number, and a special character."
      );
      return;
    }

    setLoading(true);

    try {
      // Use signInWithEmailAndPassword for signing in instead of creating an account
      const sign = await signInWithEmailAndPassword(auth, email, password);
      console.log(sign);
      setLoading(false);
      alert("Signed in successfully!");
      setEmail('');
      setPassword('');
      setIsSignedUp(true)
      navigate('/telehealth')
      // Access signed-in user info with userCredential.user if needed
    } catch (error) {
      setLoading(false);
      if (error.code === "auth/user-not-found") {
        setError("No account found with this email. Please check your email or sign up first.");
      } else if (error.code === "auth/wrong-password") {
        setError("Incorrect password. Please try again.");
      } else {
        setError(error.message);
      }
      setEmail("");
      setPassword("");
      console.error("Error signing in:", error);
    }
  };


  return (
    <div className="signup-container">
      {showSignUp ?
        <>
          <h2>Create an account</h2>
          <form onSubmit={handleSubmit}>

            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                required
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <div className="password-input-container">
                <input
                  type={passwordVisible ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
                <span onClick={togglePasswordVisibility} className="toggle-password">
                  {passwordVisible ? "👁️" : "👁️‍🗨️"}
                </span>
              </div>
            </div>

            <div className="form-group">
              <label>Confirm Password</label>
              <div className="password-input-container">
                <input
                  type={passwordVisible ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                  required
                />
                <span onClick={togglePasswordVisibility} className="toggle-password">
                  {passwordVisible ? "👁️" : "👁️‍🗨️"}
                </span>
              </div>
            </div>

            <button type="submit" disabled={loading}>
              {loading ? "Creating..." : "Sign Up"}
            </button>

            <div className="w-1/3 mx-auto mb-3 divider">
              <span className="divider-text">Or</span>
            </div>

            <div className="google-login">
              <button type="button" onClick={handleGoogleLogin} disabled={loading}>
                {loading ? "Signing in with Google..." : "Sign in with Google"}
              </button>
            </div>

            <div className="toggle">
              <p className="toggle-text"> {showSignUp ? "Already have an account?" : "Don't have an account?"}{" "} <span className="toggle-link-text" onClick={() => setShowSignUp(!showSignUp)}>Log in now</span></p>
            </div>
          </form>
        </>
        :

        <>
          <>
            <h2>Login  account</h2>
            <form onSubmit={handleSubmitSignIn}>

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className="form-group">
                <label>Password</label>
                <div className="password-input-container">
                  <input
                    type={passwordVisible ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                  />
                  <span onClick={togglePasswordVisibility} className="toggle-password">
                    {passwordVisible ? "👁️" : "👁️‍🗨️"}
                  </span>
                </div>
              </div>


              <button type="submit" disabled={loading}>
                {loading ? "pending..." : "Login"}
              </button>

              <div className="w-1/3 mx-auto mb-3 divider">
                <span className="divider-text">Or</span>
              </div>

              <div className="google-login">
                <button type="button" onClick={handleGoogleLogin} disabled={loading}>
                  {loading ? "Signing in with Google..." : "Sign in with Google"}
                </button>
              </div>

              <div className="toggle">
                <p className="toggle-text">   {showSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
                  <span className="toggle-link-text" onClick={() => setShowSignUp(!showSignUp)}> Sign Up now</span></p>
              </div>

            </form>
          </>
        </>
      }

    </div>
  );
};

export default SignUp;


