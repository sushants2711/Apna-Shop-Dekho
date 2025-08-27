import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { handleError } from "../../toastMessage/errorMessage";
import { loginApi } from "../../API/AuthenticationAPI/loginAPi";
import { handleSuccess } from "../../toastMessage/successMessage";
import { allAuthContext } from "../../context/AuthContext/AuthContext";
import { ToastContainer } from "react-toastify";

export const LoginPage = () => {
  const { setUserDetailsInLocalStorage } = allAuthContext();

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setLogin({
      ...login,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = login;

    if (!email || !password) {
      return handleError("All fields are required.");
    }

    if (password.length < 8) {
      return handleError("Password length must be equa or greater than 8.");
    }

    try {
      const result = await loginApi(login);
      const { success, message, error, name, email, role } = result;

      if (success) {
        handleSuccess(message);
        setUserDetailsInLocalStorage(name, email, role);
        setLogin({
          email: "",
          password: "",
        });

        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        handleError(message || error);
      }
    } catch (error) {
      handleError(error.message);
    }
  };

  return (
    <main className="container my-5 min-vh-100">
      <section className="row justify-content-center">
        <div className="col-md-4 py-5">
          <form className="p-4 border rounded shadow py-5" onSubmit={handleSubmit}>
            <h2 className="mb-4 text-center">
              Login & Enjoy Our Latest Products.
            </h2>

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
                value={login.email}
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
                  value={login.password}
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

            <div className="mb-3">
              <button type="submit" className="btn btn-primary w-100">
                Login
              </button>
            </div>

            <div className="text-center">
              <p>
                Already Have an Account? <Link to="/signup">Signup</Link>
              </p>
            </div>
          </form>
        </div>
        <ToastContainer />
      </section>
    </main>
  );
};
