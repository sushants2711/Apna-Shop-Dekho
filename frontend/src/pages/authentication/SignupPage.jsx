import React, { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { signupAPi } from "../../API/AuthenticationAPI/signupAPI";
import { handleSuccess } from "../../toastMessage/successMessage";
import { handleError } from "../../toastMessage/errorMessage";
import { allAuthContext } from "../../context/AuthContext/AuthContext";
import { ToastContainer } from "react-toastify";

export const SignupPage = () => {
  const { setUserDetailsInLocalStorage } = allAuthContext();

    useEffect(() => {
      document.title = "Signup-Page"
    })

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [signup, setSignup] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setSignup({
      ...signup,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, phoneNumber, password, confirmPassword } = signup;

    if (!name || !email || !phoneNumber || !password || !confirmPassword) {
      return handleError("All fields are required");
    }

    if (phoneNumber.length !== 10) {
      return handleError("PhoneNumber must be 10 digits only");
    }

    if (password !== confirmPassword) {
      return handleError("Password not match");
    }

    if (password.length < 8 || confirmPassword.length < 8) {
      return handleError("Password length must be greater than or equal to 8");
    }

    try {
      const result = await signupAPi(signup);
      const { success, message, error, name, email, role } = result;

      if (success) {
        handleSuccess(message);
        setUserDetailsInLocalStorage(name, email, role);
        setSignup({
          name: "",
          email: "",
          phoneNumber: "",
          password: "",
          confirmPassword: "",
        });

        setTimeout(() => {
          navigate("/");
        }, 3000);
      } else if (!success) {
        handleError(message);
      } else {
        handleError(error)
      }
    } catch (error) {
      handleError(error.message);
    }
  };

  return (
    <main className="container">
      <section className="row justify-content-center py-5">
        <div className="col-md-4 py-3">
          <form className="p-4 border rounded shadow" onSubmit={handleSubmit}>
            <h2 className="mb-4 text-center">Signup ? for Shopping</h2>

            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter Your Name"
                className="form-control"
                onChange={handleInputChange}
                value={signup.name}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter Your Email"
                className="form-control"
                onChange={handleInputChange}
                value={signup.email}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="phone" className="form-label">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phoneNumber"
                placeholder="Enter Your Phone Number"
                className="form-control"
                onChange={handleInputChange}
                value={signup.phoneNumber}
              />
            </div>

            <div className="mb-3 position-relative">
              <label htmlFor="password1" className="form-label">
                Password
              </label>
              <div className="input-group">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password1"
                  name="password"
                  placeholder="Enter Your Password"
                  className="form-control"
                  onChange={handleInputChange}
                  value={signup.password}
                />
                <button
                  type="button"
                  className="btn btn-outline-secondary text-danger"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="mb-3 position-relative">
              <label htmlFor="confirmPassword" className="form-label">
                Confirm Password
              </label>
              <div className="input-group">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Enter Your Confirm Password"
                  className="form-control"
                  onChange={handleInputChange}
                  value={signup.confirmPassword}
                />
                <button
                  type="button"
                  className="btn btn-outline-secondary text-danger"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            <div className="mb-3">
              <button type="submit" className="btn btn-primary w-100">
                Signup
              </button>
            </div>

            <div className="text-center">
              <p>
                Already Have an Account? <Link to="/login">Login</Link>
              </p>
            </div>
          </form>
        </div>
        <ToastContainer />
      </section>
    </main>
  );
};
