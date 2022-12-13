import React from "react";
import { useState, useRef, useEffect } from "react";
import forgotPassword from "../assets/forgotPassword.png";
import axios from "../api/axios";
import "../css/forgotPass.css";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { Link, useNavigate, useLocation } from "react-router-dom";


const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

const ResetPassword = () => {
  const token = window.location.pathname.slice(15)
  const resetPassRef = useRef();
  const errRef = useRef();
  const [errMsg, setErrMsg] = useState("");
  const [resetPass, setResetPass] = useState("");
  const[validPwd, setValidPwd] = useState(false)
  const[pwdFocus, setPwdFocus] = useState(false)
  const [re_resetPass, SetRe_ResetPass] = useState("");
  const[validMatch, setValidMatch] = useState(false)
  const[matchFocus, setMatchFocus] = useState(false)
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    resetPassRef.current.focus();
  }, []);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(resetPass))
    setValidMatch(resetPass === re_resetPass)
  }, [resetPass, re_resetPass]);

  useEffect(() => {
    setErrMsg("");
  }, [resetPass, re_resetPass]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resetPassUrl = "resetPassword/"+ token;
    try {
      const response = await axios.post(
        resetPassUrl,
        JSON.stringify({
          new_password: resetPass,
          confirm_password: re_resetPass,
        }),
        {
          headers: { "Content-Type": "application/json"},
          withCredentials: true,
        }
      );
      setSuccess(true)
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

  const handleReturn = () => {
    navigate("/");
  }
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
          {!success ? <>
            <label className="forgotPassLabel" style={{paddingLeft:'0px'}}>Enter New Password</label>
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
            aria-invalid={validPwd ? "false" : "true"}
            aria-describedby="pwdnote"
            onFocus={() => setPwdFocus(true)}
            onBlur={() => setPwdFocus(false)}
          />
          <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>8 to 24 characters.<br />
          Must include uppercase and lowercase letters,  a number and a special character.<br />
          Allowed special characters:<span area-label="exclamation mark">!</span><span area-label="at symbol">@</span>
          <span area-label="hashtag">#</span><span area-label="dollar sign">$</span><span area-label="percent">%</span>
          </p>
          <label className="forgotPassLabel" style={{ marginTop: "20px", paddingLeft:'0px' }}>
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
            aria-invalid={validMatch ? "false" : "true"}
            aria-describedby="confirmnote"
            onFocus={() => setMatchFocus(true)}
            onBlur={() => setMatchFocus(false)}
          />
           <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>Must match first password input field
          </p>
          </>: <>
            <h5 style={{color:'green'}}>Password successfully reset<CheckCircleOutlineIcon className="successIcon" style={{color:'green', marginTop:'0px'}}/></h5>
            {/* <CheckCircleOutlineIcon className="successIcon" style={{color:'green'}}/> */}
            </>}
         
          <button disabled={!validPwd || !validMatch || success ? true : false} className="forgotPassSubmit">Submit</button>
          <span className="login-link" onClick={handleReturn}>Go back to login?</span>
        </form>
      </div>
    </div>
  );
};
export default ResetPassword;
