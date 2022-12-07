import React from "react";
import { useRef, useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import loginImageFront from "../assets/loginImageFront.png";
// import { useNavigate, Link } from "react-router-dom";
import axios from "../api/axios";
import { Link, useNavigate, useLocation } from "react-router-dom";

// import Url from "../api/Url";
import "../css/login.css";

const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const Login = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  // const from = location.state.from.pathname || "/login";

  const userRef = useRef();
  const errRef = useRef();
  const[validName, setValidName] = useState(false);
  const[userFocus, setUserFocus] = useState(false);

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);
  
  useEffect(() => {
    setValidName(EMAIL_REGEX.test(user));
  }, [user]);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    const Login_Url = "/login";
    e.preventDefault();

    try {
      const response = await axios.post(
        Login_Url,
        JSON.stringify({ email: user, password: pwd }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      const accessToken = response.data.access_token;
      const refreshToken = response.data.refresh_token;
      const roles = [response.data.role];
      const userData = {
        'user': user,
        'pwd': pwd,
        'roles': roles,
        'accessToken': accessToken,
        'refreshToken': refreshToken
      };
      console.log(userData)
      localStorage.setItem("auth", JSON.stringify(userData));
      console.log(user, pwd, roles, accessToken);
      setAuth({ user, pwd, roles, accessToken });
      setUser("");
      setPwd("");
      if (response.data.role == "accounts") {
        navigate("/dashboard");
      } else if (response.data.role == "admin") {
        navigate("/admin/dashboard");
      } else if (response.data.role == "operations") {
        navigate("/operations");
      } else{
        navigate("/unauthorized");
      }

      // navigate(from, { replace: true });
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <div>
      <div className="loginWrapper">
        <div className="loginForm">
          <section>
            <h1 className="loginHeader">
              Welcome To <br /> <span>Expense Management System</span>
            </h1>
            <p
              ref={errRef}
              className={errMsg ? "errmsg" : "offscreen"}
              aria-live="assertive"
            >
              {errMsg}
            </p>
            <form
              style={{ display: "flex", flexDirection: "column" }}
              onSubmit={handleSubmit}
            >
              <label className="loginLabel">Email</label>
              <input
                className="LoginInput"
                type="text"
                id="username"
                ref={userRef}
                autoComplete="off"
                onChange={(e) => setUser(e.target.value)}
                value={user}
                placeholder="abc@email.com"
                required
                aria-invalid={validName ? "false" : "true"}
                aria-describedby="uidnote"
                onFocus={() => setUserFocus(true)}
                onBlur={() => setUserFocus(false)}
                />
              <p id="uidnote" className={userFocus && user && !validName ? "login-instructions" : "offscreen"}>Enter a valid email address</p>
              <label className="loginLabel">Password</label>
              <input
                className="LoginInput"
                type="password"
                id="password"
                onChange={(e) => setPwd(e.target.value)}
                value={pwd}
                required
                placeholder="Enter Password"
              />
              <button disabled={!validName ? true : false} className="submitButton">Submit</button>
              <Link to="/forgotPassword" className="loginForgotPass mt-3">
                Forgot Password ?
              </Link>
            </form>
          </section>
        </div>
        <div className="loginGraph">
          <img
            src={loginImageFront}
            alt="loginGraph"
          />
        </div>
      </div>
    </div>
  );
};
export default Login;
