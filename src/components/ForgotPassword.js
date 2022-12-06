import React, { useEffect } from "react";
import { useState, useRef } from "react";
import forgotPassword from "../assets/forgotPassword.png";
import axios from "../api/axios";

import "../css/forgotPass.css";

const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const ForgotPassword = () => {
  const emailRef = useRef();
  const errRef = useRef();
  const [errMsg, setErrMsg] = useState("");
  const [email, setEmail] = useState("");
  const[validName, setValidName] = useState(false);
  const[userFocus, setUserFocus] = useState(false);
  const forgotPassUrl = "forgot-password";

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    setValidName(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setErrMsg("");
  }, [email]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        forgotPassUrl,
        JSON.stringify({ email: email }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(JSON.stringify(response?.data));
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing email");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("request Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <div className="wrapperForgotPass">
      <div className="forgotPassImg">
        <img
          src={forgotPassword}
          alt="forgotPass"
          className="forgotPassImage"
        />
      </div>
      <div className="forgotPassForm">
        <h1 className="forgotPassHeader">Forgot Password</h1>
        <p
          ref={errRef}
          className={errMsg ? "errmsgForgotPass" : "offscreenForgotPass"}
          aria-live="assertive"
        >
          {errMsg}
        </p>
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", width: "50%" }}
        >
          <label className="forgotPassLabel">Enter Email</label>
          <input
            className="EmailInputForgotPass"
            type="text"
            id="email"
            ref={emailRef}
            autoComplete="off"
            placeholder="ABC@XYZ.com"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
            required
            aria-invalid={validName ? "false" : "true"}
            aria-describedby="uidnote"
            onFocus={() => setUserFocus(true)}
            onBlur={() => setUserFocus(false)}
          />
           <p id="uidnote" className={userFocus && email && !validName ? "instructions" : "offscreen"}>Enter a valid email address</p>
          <button  disabled={!validName ? true : false} className="forgotPassSubmit">Submit</button>
        </form>
      </div>
    </div>
  );
};
export default ForgotPassword;
