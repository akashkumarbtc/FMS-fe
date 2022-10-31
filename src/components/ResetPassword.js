import React from "react";
import { useState, useRef, useEffect } from "react";
import forgotPassword from "../assets/forgotPassword.png";
import axios from "../api/axios";
import "../css/forgotPass.css";

const ResetPassword = () => {
  const resetPassRef = useRef();
  const errRef = useRef();
  const [errMsg, setErrMsg] = useState("");
  const [resetPass, setResetPass] = useState("");
  const [re_resetPass, SetRe_ResetPass] = useState("");
  const resetPassUrl = "forgot-password";

  useEffect(() => {
    resetPassRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [resetPass, re_resetPass]);

  const handleSubmit = async (e) => {
    try {
      const response = await axios.post(
        resetPassUrl,
        JSON.stringify({
          new_password: resetPass,
          confirm_password: re_resetPass,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
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
      <div className="resetPassForm">
        <h1 className="forgotPassHeader">Reset Password</h1>
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
          <label className="forgotPassLabel">Enter New Password</label>
          <input
            className="enterNewPasswordInput"
            type="text"
            id="newPassword"
            ref={resetPassRef}
            autoComplete="off"
            placeholder="ABC@XYZ#123"
            onChange={(e) => {
              setResetPass(e.target.value);
            }}
            value={resetPass}
            required
          />
          <label className="forgotPassLabel" style={{ marginTop: "20px" }}>
            Re-Enter New Password
          </label>
          <input
            className="reEnterNewPasswordInput"
            type="text"
            id="ReEnterNewPassword"
            autoComplete="off"
            placeholder="ABC@XYZ#123"
            onChange={(e) => {
              SetRe_ResetPass(e.target.value);
            }}
            value={re_resetPass}
            required
          />
          <button className="forgotPassSubmit">Submit</button>
        </form>
      </div>
    </div>
  );
};
export default ResetPassword;
