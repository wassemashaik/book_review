import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "./index.css";

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showError, setShowError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const onSignupSuccess = (jwtToken) => {
    Cookies.set("jwt_token", jwtToken, { expires: 20 });
    navigate("/", { replace: true });
  };

  const onSignupFailure = (errorMsg) => {
    setShowError(true);
    setErrorMsg(errorMsg);
  };

  const userSignup = async (event) => {
    event.preventDefault();
    const userDetails = {
      roles: ["member"],
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    };
    const apiUrl = `http://localhost:5000/api/v1/auth/signup`;
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
      onSignupSuccess(data.jwt_token);
    } else {
      onSignupFailure(data.message);
    }
  };

  useEffect(() => {});
  const onShowPass = () => {
    setShowPassword((prevState) => !prevState);
  };
  const handleFirstName = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastName = (event) => {
    setLastName(event.target.value);
  };

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPass = (event) => {
    setConfirmPassword(event.target.value);
  };

  const gotoLoginPage = () => {
    navigate("/login");
  };

  const inputType = showPassword ? "text" : "password";

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="main-container col-12 ">
          <h1>Signup page</h1>
          <div className="form-container m-2 col-sm-6 p-4 text-center">
            <h1 className="head">Welcome to Next Chap</h1>
            <p className="para">Signup to Continue</p>
            <form className="form" onSubmit={userSignup}>
              <label htmlFor="firstName" className="label">
                FIRSTNAME
              </label>
              <input
                className="input-element"
                placeholder="FirstName"
                onChange={handleFirstName}
                value={firstName}
                id="firstName"
                type="text"
              />
              <label htmlFor="lastName" className="label">
                LASTNAME
              </label>
              <input
                className="input-element"
                placeholder="LastName"
                onChange={handleLastName}
                value={lastName}
                id="lastName"
                type="text"
              />
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
              <label htmlFor="confirmPass" className="label">
                CONFIRM PASSWORD
              </label>
              <input
                className="input-element"
                placeholder="confirm password"
                onChange={handleConfirmPass}
                value={confirmPassword}
                id="confirmPass"
                type={inputType}
              />
              <div className="checkbox-container">
                <input type="checkbox" id="checkbox" onChange={onShowPass} />
                <label htmlFor="checkbox" className="m-1 label">
                  show Password
                </label>
              </div>
              <div className="d-flex">
                <button className="button  m-1" type="submit">
                  Signup
                </button>
                <button
                  className="button m-1"
                  onClick={gotoLoginPage}
                  type="button"
                >
                  Already a member
                </button>
              </div>
              {showError && <p>*{errorMsg}</p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
