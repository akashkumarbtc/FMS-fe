import React from "react";
import { useRef, useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import loginImageFront from "../assets/loginImageFront.png";
// import { useNavigate, Link } from "react-router-dom";
import axios from "../api/axios";
import { Link, useNavigate, useLocation } from "react-router-dom";

// import Url from "../api/Url";
import "../css/login.css";

const Login = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  // const from = location.state.from.pathname || "/login";

  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    const Login_Url = "/login";
    e.preventDefault();

    try {
      const response = await axios.post(
        Login_Url,
        JSON.stringify({ username: user, password: pwd }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      const accessToken = response.data.access_token;
      const roles = [response.data.role];
      const userData = {
        user: user,
        pwd: pwd,
        roles: roles,
        accessToken: accessToken,
      };
      localStorage.setItem("auth", userData);
      console.log(user, pwd, roles, accessToken);
      setAuth({ user, pwd, roles, accessToken });
      setUser("");
      setPwd("");
      if (response.data.role == "accounts") {
        navigate("/accounts");
      } else if (response.data.role == "admin") {
        navigate("/admin");
      } else if (response.data.role == "operations") {
        navigate("/operations");
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
              Welcome To <br /> Expense Management System
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
                placeholder="ABC@XYZ.com"
                required
              />
              <label className="loginLabel">Password</label>
              <input
                className="LoginInput"
                type="password"
                id="password"
                onChange={(e) => setPwd(e.target.value)}
                value={pwd}
                required
                placeholder="ABC@123"
              />
              <button className="submitButton">Submit</button>
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
            style={{
              height: "57%",
              width: "62%",
              marginTop: "14%",
              display: "inline-block",
            }}
          />
        </div>
      </div>
    </div>
  );
};
export default Login;
