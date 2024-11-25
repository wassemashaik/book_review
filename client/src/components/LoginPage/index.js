import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "./index.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const onLoginSuccess = (jwtToken) => {
    Cookies.set("jwt_token", jwtToken, { expires: 20 });
    navigate("/", { replace: true });
  };

  const onLoginFailure = (errorMsg) => {
    setShowError(true);
    setErrorMsg(errorMsg);
  };

  const userLogin = async (event) => {
    event.preventDefault();
    const userDetails = { email, password };
    const apiUrl = `http://localhost:5000/api/v1/auth/login`;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userDetails),
    };
    const response = await fetch(apiUrl, options);
    const data = await response.json();
    if (response.ok) {
      onLoginSuccess(data.token);
    } else {
      onLoginFailure(data.message);
    }
  };

  const onShowPass = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const gotoSignupPage = () => {
    navigate("/signup", { replace: true });
  };

  const inputType = showPassword ? "text" : "password";

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="main-container col-lg-12">
          <h1 className="text-center">Login page</h1>
          <div className="form-container m-2 p-4 col-sm-12 col-lg-6">
            <h1 className="head">Welcome back!</h1>
            <p className="para">Login to Continue</p>
            <form className="form" onSubmit={userLogin}>
              <label htmlFor="email" className="label">
                EMAIL
              </label>
              <input
                className="input-element"
                placeholder="Email"
                onChange={handleEmail}
                value={email}
                id="email"
                type="text"
              />
              <label htmlFor="password" className="label">
                PASSWORD
              </label>
              <input
                className="input-element"
                placeholder="create password"
                onChange={handlePassword}
                value={password}
                id="password"
                type={inputType}
              />
              <div className="checkbox-container">
                <input type="checkbox" id="checkbox" onChange={onShowPass} />
                <label htmlFor="checkbox" className="m-1 label">
                  show Password
                </label>
              </div>
              <div className="d-flex">
                <button className="button m-1" type="submit">
                  Login
                </button>
                <button
                  className="button m-1"
                  type="button"
                  onClick={gotoSignupPage}
                >
                  Signup
                </button>
              </div>
              {showError && <p className="text-danger">*{errorMsg}</p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
